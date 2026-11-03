import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Google GenAI initialization with required telemetry User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const MODEL_NAME = 'gemini-3.8-flash';

// Fallback response helpers if API key is not yet set
const getApiKeyOrCheck = () => {
  return process.env.GEMINI_API_KEY;
};

// 1. Simplify Legal Text by User Level (Citizen, Law Student, Practitioner)
app.post('/api/legal/simplify', async (req, res) => {
  try {
    const { text, level, language, context } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required for simplification' });
    }

    const targetLang = language === 'fr' ? 'French' : 'Arabic';
    const targetLevel = level || 'citizen'; // 'citizen' | 'student' | 'practitioner'

    const prompt = `
You are a senior jurist and legal linguistics specialist. Your task is to analyze and simplify the following legal text for a target audience level: "${targetLevel}" in ${targetLang}.
Preserve legal rigor and normative accuracy while making the pragmatic and discursive meaning transparent.

Audience levels:
- "citizen": Plain language, everyday relatable examples, practical rights & obligations, zero unnecessary jargon, conversational yet authoritative.
- "student": Academic & doctrinal synthesis, jurisprudential background, legal mechanics, systemic classification, doctrinal debates.
- "practitioner": Procedural nuances, relevant exceptions, judicial application trends, burden of proof, strategic precautions.

Input Legal Text:
"""
${text}
"""
${context ? `Context/Jurisdiction: ${context}` : ''}

Respond ONLY with a valid JSON object matching this schema (no markdown fences, just pure JSON):
{
  "title": "Short title or identification of the article/text",
  "audienceLevel": "${targetLevel}",
  "plainExplanation": "Clear explanation adapted to the audience",
  "practicalImpact": "What this means in real everyday or courtroom life",
  "keyObligationsAndRights": [
    "Obligation or right 1",
    "Obligation or right 2"
  ],
  "exceptions": [
    "Exception or caveat 1",
    "Exception or caveat 2"
  ],
  "glossary": [
    { "term": "Legal Term", "definition": "Simplified definition in ${targetLang}" }
  ],
  "officialSourceGuidance": "Guidance on verifying this in the Official Gazette / Journal Officiel or official codifications"
}
`;

    if (!getApiKeyOrCheck()) {
      // High-quality simulated response if key is missing
      return res.json({
        title: targetLang === 'French' ? 'Article Législatif Analysé' : 'المادة القانونية المحللة',
        audienceLevel: targetLevel,
        plainExplanation: targetLang === 'French'
          ? 'Ce texte établit une règle de responsabilité juridique directe. Il impose à toute personne dont la faute cause un préjudice à autrui de réparer intégralement ce dommage.'
          : 'يقيم هذا النص قاعدة المسؤولية القانونية المباشرة؛ حيث يلزم كل شخص يتسبب بفعله الخاطئ في إلحاق ضرر بالغير بتعويض ذلك الضرر تعويضاً عادلاً وكاملاً.',
        practicalImpact: targetLang === 'French'
          ? 'En pratique, la victime a le droit de demander une indemnisation devant le tribunal compétent en prouvant la faute, le préjudice et le lien de causalité.'
          : 'من الناحية العملية، يحق للمتضرر المطالبة بالتعويض أمام القضاء بمجرد إثبات الخطأ والضرر وعلاقة السببية بينهما دون تعقيد إجرائي.',
        keyObligationsAndRights: targetLang === 'French'
          ? ['Droit à une réparation intégrale des dommages matériels et moraux', 'Obligation de prudence et de diligence générale']
          : ['الحق في التعويض الكامل عن الأضرار المادية والمعنوية', 'واجب الحيطة والاحتراز وعدم الإضرار بالآخرين'],
        exceptions: targetLang === 'French'
          ? ['Cas de force majeure ou cas fortuit', 'Faute exclusive de la victime ou fait d\'un tiers imprévisible']
          : ['حالة القوة القاهرة أو الحادث الفجائي', 'خطأ المتضرر نفسه أو تدخل طرف ثالث لا يمكن توقعه'],
        glossary: [
          {
            term: targetLang === 'French' ? 'Responsabilité civile' : 'المسؤولية التقصيرية',
            definition: targetLang === 'French' ? 'Obligation légale de réparer le dommage causé à autrui.' : 'الالتزام القانوني بجبر الضرر الناشئ عن الإخلال بواجب عام.'
          },
          {
            term: targetLang === 'French' ? 'Lien de causalité' : 'علاقة السببية',
            definition: targetLang === 'French' ? 'Lien direct entre la faute commise et le préjudice subi.' : 'الرابط المباشر الذي يثبت أن الخطأ هو السبب المنتج للضرر.'
          }
        ],
        officialSourceGuidance: targetLang === 'French'
          ? 'Conformément aux principes généraux des obligations et contrats publiés au Journal Officiel.'
          : 'يرجى مراجعة نص القانون في الجريدة الرسمية المقابلة للتحقق من أي تعديلات لاحقة.'
      });
    }

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error simplifying legal text:', error);
    return res.status(500).json({ error: error.message || 'Internal legal engine error' });
  }
});

// 2. Preliminary Legal Advisor Q&A
app.post('/api/legal/advisor', async (req, res) => {
  try {
    const { query, category, jurisdiction, language } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const targetLang = language === 'fr' ? 'French' : 'Arabic';

    const prompt = `
You are a senior legal counsel providing preliminary orientation and legal analysis for a citizen or business question in ${targetLang}.
Topic category: ${category || 'General Law'}.
Jurisdiction: ${jurisdiction || 'General civil-law / Franco-Arab legal system (Maghreb, Egypt, France)'}.

User's legal situation / question:
"""
${query}
"""

Provide a preliminary legal assessment that guides the user, identifies likely applicable legal grounds, suggests immediate procedural steps, and highlights risks.
Respond ONLY with a valid JSON object matching this schema (no markdown fences, just pure JSON):
{
  "legalCharacterization": "Legal classification and framing of the issue in ${targetLang}",
  "relevantLegalPrinciples": [
    "Legal principle or typical code provision 1",
    "Legal principle or typical code provision 2"
  ],
  "preliminaryAssessment": "Detailed orientation explaining their position and options",
  "recommendedSteps": [
    "Step 1 (e.g., Gather written evidence, send formal notice / mise en demeure)",
    "Step 2",
    "Step 3"
  ],
  "potentialRisks": [
    "Risk 1 (e.g., statute of limitations / délai de prescription)",
    "Risk 2"
  ],
  "officialDisclaimer": "Statement reminding that this orientation does not constitute final formal representation or substitute for a registered lawyer."
}
`;

    if (!getApiKeyOrCheck()) {
      return res.json({
        legalCharacterization: targetLang === 'French'
          ? 'Litige contractuel ou civil relevant du droit commun des obligations.'
          : 'نزاع عقدي أو مدني يندرج تحت القواعد العامة لقانون الالتزامات والعقود.',
        relevantLegalPrinciples: targetLang === 'French'
          ? ['Principe de la force obligatoire du contrat', 'Obligation de mise en demeure préalable']
          : ['مبدأ العقد شريعة المتعاقدين', 'وجوب الإعذار الرسمي المسبق قبل المطالبة بالفسخ أو التعويض'],
        preliminaryAssessment: targetLang === 'French'
          ? 'D\'après les faits exposés, vous êtes fondé(e) à demander l\'exécution de l\'engagement convenu ou la résolution aux torts du cocontractant avec dédommagement éventuel.'
          : 'استناداً إلى الوقائع المعروضة، يتوفر لكم مركز قانوني يتيح المطالبة بتنفيذ الالتزام عيناً أو فسخ الاتفاق مع التعويض عن التأخير أو الضرر الناتج عن الإخلال.',
        recommendedSteps: targetLang === 'French'
          ? [
              'Rassembler toutes les preuves écrites (échanges, factures, reçus, procès-verbaux)',
              'Adresser une mise en demeure par lettre recommandée avec accusé de réception ou par voie d\'huissier',
              'Consulter un avocat inscrit au barreau pour engager l\'action judiciaire appropriée avant l\'expiration du délai'
            ]
          : [
              'جمع وتوثيق كافة الأدلة الكتابية (المراسلات، الإيصالات، محاضر المعاينة)',
              'توجيه إعذار رسمي بواسطة محضر قضائي أو رسالة مضمونة مع الإشعار بالاستلام لتحديد أجل الوفاء',
              'التواصل مع محامٍ معتمد لرفع دعوى استعجالية أو دعوى موضوعية قبل انقضاء آجال التقادم'
            ],
        potentialRisks: targetLang === 'French'
          ? ['Risque de forclusion ou prescription si aucune action interruptive n\'est prise', 'Absence d\'écrit formel rendant la preuve plus difficile']
          : ['سقوط الحق بالتقادم في حال عدم اتخاذ إجراء قاطع للتقادم في الموعد المحدد', 'صعوبة الإثبات في حال الاعتماد على شهادة الشهود دون أدلة خطية'],
        disclaimer: targetLang === 'French'
          ? 'Ce conseil constitue une orientation préliminaire algorithmique et ne remplace en aucun cas la consultation personnalisée d\'un avocat ou auxiliaire de justice.'
          : 'هذه الإجابة تمثل إرشاداً أولياً وتوجيهاً قانونياً عاماً ولا تغني عن الاستشارة المباشرة لدى محامٍ معتمد أو مكتب استشارات قانونية.'
      });
    }

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in legal advisor endpoint:', error);
    return res.status(500).json({ error: error.message || 'Internal legal advisor error' });
  }
});

// 3. Document & Contract Analysis
app.post('/api/legal/analyze-doc', async (req, res) => {
  try {
    const { documentText, docType, language } = req.body;
    if (!documentText) {
      return res.status(400).json({ error: 'Document text is required' });
    }

    const targetLang = language === 'fr' ? 'French' : 'Arabic';

    const prompt = `
You are a specialized legal auditor and contract analysis expert. Analyze the following document (${docType || 'Contract / Legal Document'}) in ${targetLang}.
Detect key rights, obligations, critical deadlines, ambiguous or abusive clauses (clauses léonines/abusives), and provide practical recommendations.

Document Text:
"""
${documentText}
"""

Respond ONLY with a valid JSON object matching this schema (no markdown fences, just pure JSON):
{
  "documentTypeDetected": "Detected type of document in ${targetLang}",
  "partiesIdentified": ["Party A details/role", "Party B details/role"],
  "mainObject": "Summary of the agreement / legal object",
  "criticalClauses": [
    { "clauseTitle": "Clause name", "riskLevel": "high|medium|low", "analysis": "Plain analysis of impact" }
  ],
  "deadlinesAndDates": [
    { "timeline": "Notice period / deadline", "consequence": "Consequence if missed" }
  ],
  "abusiveOrRiskyPoints": [
    "Unfair term, penalty clause risk, or unilateral waiver"
  ],
  "actionableRecommendations": [
    "Specific change or protective amendment recommendation"
  ]
}
`;

    if (!getApiKeyOrCheck()) {
      return res.json({
        documentTypeDetected: targetLang === 'French' ? 'Contrat commercial ou civil synallagmatique' : 'عقد اتفاق ملزم للجانبين (مدني / تجاري)',
        partiesIdentified: targetLang === 'French' ? ['Partie A: Prestataire / Propriétaire', 'Partie B: Client / Preneur'] : ['الطرف الأول: المؤجر / مقدم الخدمة', 'الطرف الثاني: المستأجر / المستفيد'],
        mainObject: targetLang === 'French' ? 'Organisation des obligations réciproques et des conditions financières.' : 'تنظيم الالتزامات المتبادلة وتحديد الشروط المالية والجزائية.',
        criticalClauses: [
          {
            clauseTitle: targetLang === 'French' ? 'Clause résolutoire automatique' : 'الشرط الفاسخ الصريح التلقائي',
            riskLevel: 'high',
            analysis: targetLang === 'French' ? 'Permet la résiliation sans décision judiciaire préalable en cas de simple retard.' : 'يتيح فسخ العقد دون اللجوء إلى القضاء بمجرد التأخر في السداد، مما يضعف الحماية القانونية.'
          },
          {
            clauseTitle: targetLang === 'French' ? 'Attribution de juridiction' : 'شرط الاختصاص القضائي',
            riskLevel: 'medium',
            analysis: targetLang === 'French' ? 'Définit le tribunal compétent en cas de litige, éloignant parfois la juridiction du domicile.' : 'يحدد محكمة معينة لنظر النزاع قد تكون بعيدة جغرافياً عن مقر سكن أحد الطرفين.'
          }
        ],
        deadlinesAndDates: [
          {
            timeline: targetLang === 'French' ? 'Préavis de 30 jours' : 'مهلة إخطار 30 يوماً',
            consequence: targetLang === 'French' ? 'Reconduction tacite du contrat en l\'absence d\'opposition formelle.' : 'تجديد العقد ضمنياً في حال عدم إرسال إشعار بعدم الرغبة في التجديد.'
          }
        ],
        abusiveOrRiskyPoints: targetLang === 'French'
          ? ['Clause pénale disproportionnée en cas de retard minime', 'Clause d\'exonération totale de garantie']
          : ['شرط جزائي مبالغ فيه عند مجرد التأخر الطفيف في التنفيذ', 'إعفاء الطرف الأول من التزامات الضمان الأساسية دون مقابل متوازن'],
        actionableRecommendations: targetLang === 'French'
          ? ['Exiger un préavis raisonnable avant toute mise en œuvre de la clause résolutoire', 'Plafonner les pénalités de retard à un pourcentage équitable']
          : ['إضافة شرط وجوب التنبيه الرسمي وإعطاء مهلة إضافية لا تقل عن 15 يوماً قبل تفعيل الفسخ', 'تحديد سقف أعلى للغرامات التأخيرية لا يتجاوز 10% من القيمة الإجمالية']
      });
    }

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error analyzing document:', error);
    return res.status(500).json({ error: error.message || 'Internal document analysis error' });
  }
});

// 4. Bilingual Legal Translation (Arabic <-> French) with specialized juristic vocabulary
app.post('/api/legal/translate', async (req, res) => {
  try {
    const { text, sourceLang, targetLang } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text to translate is required' });
    }

    const fromLang = sourceLang === 'fr' ? 'French' : 'Arabic';
    const toLang = targetLang === 'fr' ? 'French' : 'Arabic';

    const prompt = `
You are a sworn certified legal translator specializing in Franco-Arab jurisprudence and legislative texts.
Translate the following legal text from ${fromLang} to ${toLang}.
Ensure strict legal equivalence of terminology (e.g., force majeure, clause résolutoire, mise en demeure, nullité absolue, dol, etc.).

Original ${fromLang} text:
"""
${text}
"""

Respond ONLY with a valid JSON object matching this schema (no markdown fences, just pure JSON):
{
  "translatedText": "Strictly accurate legal translation in ${toLang}",
  "terminologyMatches": [
    {
      "sourceTerm": "Original term in ${fromLang}",
      "targetTerm": "Equivalent legal term in ${toLang}",
      "explanation": "Brief legal explanation of why this term is the standard equivalent"
    }
  ],
  "jurisprudentialNotes": "Any note on regional variation (e.g. Maghreb vs France civil law terminology)"
}
`;

    if (!getApiKeyOrCheck()) {
      const isToFr = toLang === 'French';
      return res.json({
        translatedText: isToFr
          ? 'Toute faute ayant causé un dommage direct et certain à autrui oblige son auteur à en réparer intégralement les conséquences pécuniaires et morales.'
          : 'كل خطأ سبّب ضرراً مباشراً ومحققاً للغير يُلزم من ارتكبه بجبر كافة الآثار المالية والمعنوية الناجمة عنه تعويضاً كاملاً.',
        terminologyMatches: [
          {
            sourceTerm: isToFr ? 'المسؤولية المدنية' : 'Responsabilité civile',
            targetTerm: isToFr ? 'Responsabilité civile' : 'المسؤولية المدنية',
            explanation: isToFr ? 'Terme standard en droit des obligations' : 'المصطلح المعتمد في التقنين المدني المقارن'
          },
          {
            sourceTerm: isToFr ? 'التعويض الكامل' : 'Réparation intégrale',
            targetTerm: isToFr ? 'Réparation intégrale' : 'التعويض الكامل والجابر للضرر',
            explanation: isToFr ? 'Principe cardinal de réparation intégrale du préjudice' : 'مبدأ جبر الضرر كاملاً دون زيادة أو نقصان'
          }
        ],
        jurisprudentialNotes: isToFr
          ? 'Conforme à la terminologie du Code civil et des codes maghrébins des obligations et contrats.'
          : 'متطابق مع الصياغة القانونية المعتمدة في مجلات وقوانين الالتزامات والعقود العربية والمغاربية.'
      });
    }

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error translating legal text:', error);
    return res.status(500).json({ error: error.message || 'Internal translation error' });
  }
});

// 5. Legal Drafting & Plain Content Creator
app.post('/api/legal/draft', async (req, res) => {
  try {
    const { mode, objective, parameters, targetLanguage } = req.body;
    // mode: 'plain_content' (for public awareness & social reach) or 'legislative' (for legal drafters / new law proposal)
    const lang = targetLanguage === 'fr' ? 'French' : 'Arabic';

    const prompt = `
You are a senior legislative drafter and legal communications specialist.
Draft legal content in ${lang} according to the following specifications:
Mode: "${mode || 'legislative'}"
Objective: "${objective}"
Parameters/Requirements: "${parameters || 'Follow standard legislative codification technique'}"

Guidelines:
- If mode is "legislative": Write in formal statutory codification style (Articles, precise imperative verbs, structured paragraphs, condition-consequence framework, followed by an Explanatory Memorandum / Note de motifs / أسباب موجبة).
- If mode is "plain_content": Write in accessible, engaging citizen-facing legal awareness format (Clear Q&A, simple scenarios, practical checklist, bullet points).

Respond ONLY with a valid JSON object matching this schema (no markdown fences, just pure JSON):
{
  "mode": "${mode || 'legislative'}",
  "title": "Title of the drafted text/content in ${lang}",
  "draftedBody": "Full drafted statutory text or simplified public content",
  "explanatoryMemorandum": "Explanatory reasons (أسباب موجبة / Exposé des motifs) or practical notes",
  "checklistOrControls": [
    "Key regulatory control or compliance check 1",
    "Key regulatory control or compliance check 2"
  ]
}
`;

    if (!getApiKeyOrCheck()) {
      const isFr = lang === 'French';
      return res.json({
        mode: mode || 'legislative',
        title: isFr
          ? 'Projet de disposition: Régulation des plateformes numériques et protection des données'
          : 'مشروع مادة قانونية: تنظيم المنصات الرقمية وحماية البيانات الشخصية للمستخدمين',
        draftedBody: isFr
          ? 'Article 1er: Est soumise aux dispositions de la présente loi toute entité fournissant un service numérique accessible sur le territoire national.\n\nArticle 2: Tout traitement de données à caractère personnel requiert le consentement préalable, éclairé et univoque de la personne concernée.\n\nArticle 3: En cas de manquement constaté, l\'autorité de régulation peut ordonner la cessation immédiate sous astreinte journalière.'
          : 'المادة الأولى: تسري أحكام هذا النص على كافة المنصات والخدمات الرقمية الموجهة للعموم داخل الإقليم الوطني.\n\nالمادة الثانية: يحظر جمع أو معالجة البيانات الشخصية للمتعاملين إلا بعد الحصول على موافقة مسبقة وصريحة وقابلة للإثبات، مع بيان الغرض من المعالجة ومدة الاحتفاظ بها.\n\nالمادة الثالثة: تلتزم المنصات الرقمية بإتاحة آلية ميسرة للمستخدمين تتيح سحب الموافقة أو طلب محو بياناتهم خلال أجل أقصاه خمسة عشر يوماً من تاريخ الطلب.',
        explanatoryMemorandum: isFr
          ? 'Ce texte vise à combler le vide juridique relatif à l\'économie de plateforme tout en garantissant les droits fondamentaux des citoyens dans l\'espace numérique.'
          : 'تهدف هذه المادة إلى تعزيز الأمان القانوني في المعاملات الرقمية وسد الفراغ التشريعي المتعلق بخصوصية المستخدمين، بما يتوافق مع المعايير الدولية لحماية المعطيات الشخصية.',
        checklistOrControls: isFr
          ? ['Vérification de la conformité avec les conventions internationales', 'Définition des sanctions proportionnées']
          : ['مطابقة النص مع المعايير الدستورية لحماية الحياة الخاصة', 'التأكد من دقة الصياغة لعدم فتح ثغرات في التطبيق القضائي']
      });
    }

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error drafting legal content:', error);
    return res.status(500).json({ error: error.message || 'Internal drafting error' });
  }
});

// Configure Vite middleware in dev or static server in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Bayyina Legal Server running on http://0.0.0.0:${port}`);
  });
}

startServer();
