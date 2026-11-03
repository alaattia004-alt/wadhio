export interface LegalArticle {
  id: string;
  codeNameAr: string;
  codeNameFr: string;
  articleNumber: string;
  titleAr: string;
  titleFr: string;
  category: 'civil' | 'commercial' | 'labor' | 'penal' | 'consumer' | 'digital';
  jurisdiction: 'DZ' | 'MA' | 'TN' | 'EG' | 'FR' | 'UNIFIED';
  officialSourceAr: string;
  officialSourceFr: string;
  gazetteRef: string;
  originalTextAr: string;
  originalTextFr: string;
  summaryAr: string;
  summaryFr: string;
  targetLevelExamples: {
    citizenAr: string;
    citizenFr: string;
    studentAr: string;
    studentFr: string;
    practitionerAr: string;
    practitionerFr: string;
  };
}

export interface LegalCourse {
  id: string;
  titleAr: string;
  titleFr: string;
  levelAr: string;
  levelFr: string;
  durationAr: string;
  durationFr: string;
  priceAr: string;
  priceFr: string;
  instructorAr: string;
  instructorFr: string;
  rating: number;
  studentsCount: number;
  descriptionAr: string;
  descriptionFr: string;
  syllabusAr: string[];
  syllabusFr: string[];
  quiz: {
    questionAr: string;
    questionFr: string;
    optionsAr: string[];
    optionsFr: string[];
    correctIndex: number;
    explanationAr: string;
    explanationFr: string;
  }[];
}

export interface LegalExpert {
  id: string;
  nameAr: string;
  nameFr: string;
  titleAr: string;
  titleFr: string;
  specialtyAr: string;
  specialtyFr: string;
  cityAr: string;
  cityFr: string;
  experienceYears: number;
  rating: number;
  consultationFeeAr: string;
  consultationFeeFr: string;
  languages: string[];
  verified: boolean;
  availableOnline: boolean;
}

export const LEGAL_ARTICLES: LegalArticle[] = [
  {
    id: 'art-civ-124',
    codeNameAr: 'القانون المدني',
    codeNameFr: 'Code Civil',
    articleNumber: 'المادة 124 / Art. 124',
    titleAr: 'المسؤولية عن العمل الشخصي وجبر الضرر',
    titleFr: 'Responsabilité du fait personnel et réparation',
    category: 'civil',
    jurisdiction: 'UNIFIED',
    officialSourceAr: 'الجريدة الرسمية - تقنين الالتزامات والعقود',
    officialSourceFr: 'Journal Officiel - Droit des Obligations',
    gazetteRef: 'J.O. N° 78 / ص. 1012',
    originalTextAr: 'كل عمل أياً كان، يرتكبه المرء بخطئه، ويسبب ضرراً للغير، يلزم من كان سبباً في حدوثه بتعويضه.',
    originalTextFr: 'Tout fait quelconque de l\'homme, qui cause à autrui un dommage, oblige celui par la faute duquel il est arrivé, à le réparer.',
    summaryAr: 'المبدأ الأساسي للتعويض: من أخطأ وألحق ضرراً بالآخرين ملزم بدفع تعويض كامل يجبر هذا الضرر.',
    summaryFr: 'Principe fondamental: Toute faute causant un préjudice engage la responsabilité civile de son auteur avec obligation d\'indemnisation.',
    targetLevelExamples: {
      citizenAr: 'إذا تسببت في إتلاف ممتلكات شخص أو إصابته بسبب إهمالك أو تصرفك الخاطئ، فالقانون يلزمك بدفع تعويض مالي يعوضه عما خسره.',
      citizenFr: 'Si vous causez un dommage matériel ou corporel à quelqu\'un par imprudence ou négligence, la loi vous oblige à l\'indemniser pour réparer la perte.',
      studentAr: 'تشكل هذه المادة الركن الأساسي للمسؤولية التقصيرية، وتتطلب اجتماع ثلاثة أركان تراكمية: الخطأ غير المشروع، الضرر المباشر المحقق، ورابطة السببية المنتجة بينهما.',
      studentFr: 'Cette disposition consacre le triptyque de la responsabilité quasi-délictuelle: une faute prouvée, un préjudice direct et certain, et un lien de causalité adéquat.',
      practitionerAr: 'العبء الإثباتي يقع على عاتق المدعي طبقاً لقاعدة "البينة على من ادعى"، مع إمكانية دفع المسؤولية بإثبات السبب الأجنبي (القوة القاهرة، الحادث الفجائي، أو خطأ المضرور).',
      practitionerFr: 'Charge de la preuve incombant au demandeur. Moyens d\'exonération: force majeure imprévisible et irrésistible, fait du tiers ou faute concurrente de la victime.'
    }
  },
  {
    id: 'art-lab-12',
    codeNameAr: 'قانون العمل وعلاقات العمل',
    codeNameFr: 'Droit du Travail & Relations Professionnelles',
    articleNumber: 'المادة 73 / Art. 73',
    titleAr: 'التسريح التأديبي وضمانات العامل',
    titleFr: 'Licenciement disciplinaire et garanties du salarié',
    category: 'labor',
    jurisdiction: 'UNIFIED',
    officialSourceAr: 'الجريدة الرسمية - قانون علاقات العمل رقم 90-11',
    officialSourceFr: 'Journal Officiel - Relations de Travail',
    gazetteRef: 'J.O. N° 17 / ص. 453',
    originalTextAr: 'يتم التسريح التأديبي في حالة ارتكاب العامل أخطاء جسيمة، مع وجوب استيفاء إجراءات الاستماع إلى العامل وتبليغه بالقرار كتابياً وفق الآجال المحددة.',
    originalTextFr: 'Le licenciement disciplinaire n\'intervient qu\'en cas de faute grave, sous réserve du respect strict de la procédure contradictoire et de la notification écrite motivée.',
    summaryAr: 'لا يحق لرب العمل طرد العامل تأديبياً إلا في حال الخطأ الجسيم ومع احترام جلسة الاستماع وحق الدفاع.',
    summaryFr: 'Protection du travailleur: aucun licenciement pour motif disciplinaire sans faute grave avérée et entretien préalable.',
    targetLevelExamples: {
      citizenAr: 'لا يمكن لمديرك في العمل طردك فجأة دون إشعار وجلسة استماع للدفاع عن نفسك، إلا إذا ارتكبت خطأً فادحاً أثبته القانون.',
      citizenFr: 'Votre employeur ne peut pas vous licencier sur-le-champ sans convocation préalable et droit de vous défendre, sauf faute grave manifeste.',
      studentAr: 'التنظيم التشريعي يوازن بين السلطة التأديبية لرب العمل كأثر لعلاقة التبعية، وبين الحماية الاجتماعية للعامل لمنع التعسف في إنهاء الرابطة العقدية.',
      studentFr: 'Équilibre entre pouvoir disciplinaire patronal et protection du consentement et de la subsistance économique du travailleur subordonné.',
      practitionerAr: 'إغفال الشكلية الجوهرية (الاستدعاء، مهلة الدفاع، التسبيب) يبطل قرار التسريح ويجعله فصلاً تعسفياً موجباً لإعادة الإدماج أو التعويض التراكمي.',
      practitionerFr: 'Le non-respect du formalisme substantiel entache le licenciement d\'arbitraire, ouvrant droit à réintégration ou indemnisation sous contrôle du juge des prud\'hommes.'
    }
  },
  {
    id: 'art-com-544',
    codeNameAr: 'القانون التجاري',
    codeNameFr: 'Code de Commerce',
    articleNumber: 'المادة 544 / Art. 544',
    titleAr: 'شروط تأسيس الشركات ذات المسؤولية المحدودة',
    titleFr: 'Constitution des sociétés à responsabilité limitée (SARL)',
    category: 'commercial',
    jurisdiction: 'UNIFIED',
    officialSourceAr: 'الجريدة الرسمية - التقنين التجاري',
    officialSourceFr: 'Journal Officiel - Droit Commercial',
    gazetteRef: 'J.O. N° 45 / ص. 880',
    originalTextAr: 'تؤسس الشركة ذات المسؤولية المحدودة بين شخص أو أكثر لا يتحملون الخسائر إلا في حدود حصصهم، وتكون حصص الشركاء غير قابلة للتداول التجاري إلا وفق الشروط المقررة.',
    originalTextFr: 'La société à responsabilité limitée est instituée par une ou plusieurs personnes qui ne supportent les pertes qu\'à concurrence de leurs apports.',
    summaryAr: 'الشركة ذات المسؤولية المحدودة تحمي أموالك الشخصية؛ فأنت لا تخسر أكثر من المبلغ الذي ساهمت به في رأس المال.',
    summaryFr: 'Séparation des patrimoines: l\'associé n\'est engagé sur ses biens propres qu\'à hauteur du montant de son apport au capital.',
    targetLevelExamples: {
      citizenAr: 'إذا أنشأت شركة ذات مسؤولية محدودة وخسرت الشركة، فلن يأخذ الدائنون منزلك أو سيارتك الخاصة، بل يقتصر حقهم على أموال الشركة فقط.',
      citizenFr: 'Si votre entreprise subit des dettes, vos biens personnels (maison, économies privées) sont protégés et restent à l\'abri des créanciers professionnels.',
      studentAr: 'تجمع شركة SARL بين خصائص شركات الأشخاص (الاعتبار الشخصي وصعوبة التنازل عن الحصص) وشركات الأموال (تحديد المسؤولية بقدر الحصة المكتتبة).',
      studentFr: 'Forme sociétaire hybride conciliant l\'intuitu personae des sociétés de personnes avec l\'écran protecteur de la responsabilité limitée aux apports.',
      practitionerAr: 'رفع الحجاب عن الشخصية المعنوية (Levée du voile social) قد يتقرر قضائياً ومساءلة المسير في ذمته المالية إذا ثبت الخلط بين الذمم أو الخطأ الجسيم في التسيير.',
      practitionerFr: 'Action en comblement de passif et extension de procédure envisageables contre le gérant en cas de faute de gestion caractérisée ou confusion de patrimoines.'
    }
  },
  {
    id: 'art-con-15',
    codeNameAr: 'قانون حماية المستهلك وقمع الغش',
    codeNameFr: 'Protection du Consommateur & Répression des Fraudes',
    articleNumber: 'المادة 15 / Art. 15',
    titleAr: 'الحق في الضمان وسلامة المنتوج',
    titleFr: 'Droit à la garantie légale et à la conformité',
    category: 'consumer',
    jurisdiction: 'UNIFIED',
    officialSourceAr: 'الجريدة الرسمية - قانون حماية المستهلك',
    officialSourceFr: 'Journal Officiel - Protection du Consommateur',
    gazetteRef: 'J.O. N° 09 / ص. 22',
    originalTextAr: 'يلزم كل متدخل بتسليم منتوج مطابق للمواصفات ومضمون من العيوب الخفية، ويكون مسؤولاً عن جبر أي إخلال بالسلامة أو المواصفات المعلنة.',
    originalTextFr: 'Tout professionnel est tenu de livrer un bien conforme aux stipulations contractuelles et exempt de vices cachés affectant son usage normal.',
    summaryAr: 'من حق المشتري الحصول على سلعة خالية من العيوب، والبائع ملزم بالإصلاح أو الاستبدال أو استرجاع الثمن عند ظهور عيب خفي.',
    summaryFr: 'Garantie légale obligatoire: le vendeur professionnel répond des défauts de conformité et des vices cachés préexistant à la vente.',
    targetLevelExamples: {
      citizenAr: 'إذا اشتريت جهازاً أو سلعة واكتشفت فيها عيباً لم يكن واضحاً، يحق لك إرجاعها واسترداد مالك أو استبدالها مجاناً بقوة القانون.',
      citizenFr: 'Tout produit acheté bénéficie d\'une garantie légale: si un défaut caché apparaît, vous pouvez exiger réparation, échange ou remboursement sans frais.',
      studentAr: 'النص يمثل التزاماً بنتيجة لا بوسيلة، ويقلب عبء الإثبات على المحترف بحكم خبرته الفنية وافتراض علمه بالعيب.',
      studentFr: 'Obligation de résultat avec présomption d\'antériorité du défaut, neutralisant la disparité d\'information entre profane et professionnel.',
      practitionerAr: 'دعوى ضمان العيب الخفي تخضع لآجال سقوط محددة من تاريخ كشف العيب، ويجوز الجمع بين طلب الفسخ واسترداد الثمن مع التعويض التكميلي.',
      practitionerFr: 'L\'action rédhibitoire ou estimatoire doit être engagée dans un délai bref à compter de la découverte du vice, avec possibilité de dommages-intérêts cumulatifs.'
    }
  }
];

export const SAMPLE_CONTRACTS = [
  {
    id: 'sample-lease',
    nameAr: 'عقد كراء تجاري / إيجار محل مهني',
    nameFr: 'Bail commercial / Location de local professionnel',
    category: 'commercial',
    content: `عقد إيجار محل تجاري
الطرف الأول: شركة الأفق العقارية (المؤجر)
الطرف الثاني: مؤسسة البشير للتجارة (المستأجر)
الموضوع: تأجير المحل التجاري الكائن بوسط المدينة لمدة 3 سنوات تبدأ من 1 يناير 2026.
البند 4 (بدل الإيجار): يدفع الإيجار مقدماً كل ثلاثة أشهر. في حال التأخر عن السداد لأكثر من 5 أيام، يعتبر العقد مفسوخاً تلقائياً بحكم القانون دون حاجة إلى إنذار أو حكم قضائي، مع إلزام المستأجر بغرامة تعادل قيمة إيجار 6 أشهر.
البند 8 (الاختصاص القضائي): تختص محاكم العاصمة دون غيرها بنظر أي نزاع ينشأ عن تنفيذ أو تفسير هذا العقد.
البند 11 (التحسينات): تؤول كافة الديكورات والتحسينات للمؤجر عند انتهاء العقد دون أي تعويض.`
  },
  {
    id: 'sample-employment',
    nameAr: 'عقد عمل محدد المدة مع شرط عدم المنافسة',
    nameFr: 'Contrat de travail à durée déterminée avec clause de non-concurrence',
    category: 'labor',
    content: `عقد عمل محدد المدة (CDD)
الطرف الأول: شركة الأنظمة المتطورة (المشغل)
الطرف الثاني: السيد عمر المنصوري (الأجير)
الوظيفة: مهندس برمجيات أول
المدة: سنة واحدة قابلة للتجديد باتفاق الطرفين.
البند 7 (عدم المنافسة): يلتزم الأجير بعدم ممارسة أي نشاط مشابه أو العمل لدى أي منافس داخل القطر الوطني لمدة 5 سنوات كاملة من تاريخ انتهاء العقد، دون أن يستحق أي تعويض مالي مقابل هذا القيد.
البند 12 (الإنهاء المبكر): يحق للمشغل إنهاء العقد في أي وقت بموجب إشعار مدته 3 أيام دون بيان الأسباب.`
  }
];

export const LEGAL_COURSES: LegalCourse[] = [
  {
    id: 'course-1',
    titleAr: 'تقنيات صياغة العقود التجارية والمدنية الاحترافية',
    titleFr: 'Techniques de Rédaction des Contrats Commerciaux et Civils',
    levelAr: 'متقدم / مهني',
    levelFr: 'Avancé / Professionnel',
    durationAr: '18 ساعة تدريبية (6 وحدات)',
    durationFr: '18 heures de formation (6 modules)',
    priceAr: '14,900 د.ج / 1,200 د.م',
    priceFr: '120 € / Accès Illimité',
    instructorAr: 'د. كريم بلقاسم - أستاذ القانون الخاص ومحكم معتمد',
    instructorFr: 'Dr. Karim Belkacem - Professeur et Arbitre Agréé',
    rating: 4.9,
    studentsCount: 420,
    descriptionAr: 'دورة عملية شاملة لتمكين الممارسين والباحثين من أدوات الصياغة التعاقدية الدقيقة، صياغة الشروط الجزائية، وتفادي الثغرات القانونية والنزاعات القضائية.',
    descriptionFr: 'Formation pratique intensive sur la structuration des clauses contractuelles, la prévention des risques juridiques et la maîtrise du formalisme.',
    syllabusAr: [
      'الوحدة 1: المبادئ التوجيهية وتفكيك إرادة الأطراف',
      'الوحدة 2: صياغة الديباجة والتعريفات والالتزامات الجوهرية',
      'الوحدة 3: صياغة الشروط الجزائية وشروط الفسخ الصريح',
      'الوحدة 4: شروط القوة القاهرة ونقل المخاطر والاختصاص القضائي',
      'الوحدة 5: التحكيم التجاري وصياغة بنود فض النزاعات',
      'الوحدة 6: ورشة تطبيقية: مراجعة وصياغة عقد توزيع دولي'
    ],
    syllabusFr: [
      'Module 1: Principes cardinaux et qualification des obligations',
      'Module 2: Préambule, définitions et obligations réciproques',
      'Module 3: Clauses résolutoires et clauses pénales',
      'Module 4: Force majeure, transfert de risques et compétences juridictionnelles',
      'Module 5: Clauses compromissoires et modes alternatifs (MARD)',
      'Module 6: Atelier pratique de rédaction et d\'audit'
    ],
    quiz: [
      {
        questionAr: 'ما هو الأثر القانوني للشرط الفاسخ الصريح في العقد عند تخلف المدين عن الوفاء؟',
        questionFr: 'Quel est l\'effet juridique d\'une clause résolutoire expresse en cas d\'inexécution ?',
        optionsAr: [
          'يوجب رفع دعوى للمطالبة بالفسخ القضائي بحكم مشمول بالنفاذ',
          'يفسخ العقد بقوة القانون بمجرد تحقق الإخلال مع بقاء رقابة القضاء اللاحقة',
          'يلزم الدائن بالانتظار لمدة سنة كاملة قبل اتخاذ أي تدبير'
        ],
        optionsFr: [
          'Oblige à engager obligatoirement une action judiciaire préalable',
          'Opère la résiliation de plein droit dès la défaillance constatée',
          'Suspend l\'accord pendant une année civile complète'
        ],
        correctIndex: 1,
        explanationAr: 'الشرط الفاسخ الصريح يسلب القاضي سلطته التقديرية في منح مهل الوفاء، ويقع الفسخ بمجرد تحقق المخالفة القانونية المتفق عليها.',
        explanationFr: 'La clause résolutoire supprime le pouvoir d\'appréciation du juge du fond quant à l\'opportunité de la résolution.'
      }
    ]
  },
  {
    id: 'course-2',
    titleAr: 'قانون العمل وإدارة النزاعات العمالية للأفراد والشركات',
    titleFr: 'Droit du Travail et Gestion des Conflits Individuels et Collectifs',
    levelAr: 'متوسط / تطبيقي',
    levelFr: 'Intermédiaire / Pratique',
    durationAr: '12 ساعة تدريبية (4 وحدات)',
    durationFr: '12 heures de formation (4 modules)',
    priceAr: '9,900 د.ج / 850 د.م',
    priceFr: '85 € / Accès Illimité',
    instructorAr: 'أ. فتيحة بن سالم - مستشارة شؤون الشغل والتأمينات الاجتماعية',
    instructorFr: 'Me Fatiha Bensalem - Conseillère en Droit Social',
    rating: 4.8,
    studentsCount: 310,
    descriptionAr: 'فهم وتطبيق معايير علاقات العمل: من إبرام العقد وتكييف الأخطاء التأديبية إلى إجراءات المصالحة وجلسات المحاكم العمالية.',
    descriptionFr: 'Maîtrisez les relations individuelles et collectives: rédaction des contrats, discipline, rupture et prud\'hommes.',
    syllabusAr: [
      'الوحدة 1: تمييز عقود العمل وأنواعها وأركانها',
      'الوحدة 2: سلطة الإدارة التأديبية وضمانات العامل',
      'الوحدة 3: مساطر التسريح والتعويض عن الفصل التعسفي',
      'الوحدة 4: مسطرة المصالحة والترافع أمام القسم الاجتماعي'
    ],
    syllabusFr: [
      'Module 1: Typologie et qualification des contrats de travail',
      'Module 2: Pouvoir disciplinaire et droits de la défense du salarié',
      'Module 3: Procédures de rupture et indemnisation du préjudice',
      'Module 4: Phase de conciliation et contentieux social'
    ],
    quiz: [
      {
        questionAr: 'ما هو التكييف القانوني للاستمرار في تشغيل الأجير بعد انتهاء أجل عقد العمل محدد المدة؟',
        questionFr: 'Quelle est la qualification juridique du maintien en poste après terme d\'un CDD ?',
        optionsAr: [
          'يتحول العقد تلقائياً وبقوة القانون إلى عقد غير محدد المدة (CDI)',
          'ينفسخ العقد فوراً ويمنع الأجير من دخول المؤسسة',
          'يعتبر عملاً تطوعياً بدون أجر'
        ],
        optionsFr: [
          'Requalification automatique de plein droit en contrat à durée indéterminée (CDI)',
          'Résiliation immédiate sans droit à préavis',
          'Prestation bénévole non rémunérée'
        ],
        correctIndex: 0,
        explanationAr: 'استمرار العلاقة العمالية بعد انقضاء أجل العقد المحدد دون تجديد صريح يعد تجديداً ضمنياً بعقد غير محدد المدة حمايةً لحقوق الأجير.',
        explanationFr: 'La poursuite des relations de travail au terme du CDD entraîne sa requalification automatique en CDI.'
      }
    ]
  },
  {
    id: 'course-3',
    titleAr: 'حماية المعطيات الشخصية والملكية الفكرية في البيئة الرقمية',
    titleFr: 'Protection des Données Personnelles (RGPD) et Propriété Intellectuelle',
    levelAr: 'متقدم / للمؤسسات',
    levelFr: 'Avancé / Entreprises',
    durationAr: '15 ساعة تدريبية (5 وحدات)',
    durationFr: '15 heures de formation (5 modules)',
    priceAr: '12,500 د.ج / 1,100 د.م',
    priceFr: '110 € / Accès Illimité',
    instructorAr: 'م. يونس الهواري - خبير قانون التكنولوجيا وأمن المعلومات',
    instructorFr: 'Ing. Younes El Houari - Spécialiste Cyberdroit & Privacy',
    rating: 4.95,
    studentsCount: 195,
    descriptionAr: 'دليل الامتثال القانوني الرقمي: حماية قواعد البيانات، ترخيص البرمجيات والعلامات، والتوافق مع قوانين حماية الخصوصية الوطنية والدولية.',
    descriptionFr: 'Conformité légale numérique: protection des actifs immatériels, gouvernance des données et conformité réglementaire.',
    syllabusAr: [
      'الوحدة 1: الإطار التشريعي لحماية المعطيات ذات الطابع الشخصي',
      'الوحدة 2: حقوق أصحاب المعطيات والتزامات مسؤولي المعالجة',
      'الوحدة 3: حماية العلامات التجارية والمصنفات الرقمية والبرمجيات',
      'الوحدة 4: صياغة سياسات الخصوصية وشروط الاستخدام الرقمية',
      'الوحدة 5: الجرائم المعلوماتية والمسؤولية الجنائية والمدنية'
    ],
    syllabusFr: [
      'Module 1: Cadre normatif et gouvernance de la donnée personnelle',
      'Module 2: Droits des personnes et obligations du responsable de traitement',
      'Module 3: Propriété littéraire, artistique et marques numériques',
      'Module 4: Rédaction des CGU et politiques de confidentialité conformes',
      'Module 5: Cybercriminalité et responsabilités encourues'
    ],
    quiz: [
      {
        questionAr: 'ما هو الشرط الجوهري لمشروعية معالجة البيانات الشخصية للمستخدمين؟',
        questionFr: 'Quelle est la condition substantielle de licéité du traitement des données ?',
        optionsAr: [
          'الحصول على موافقة مسبقة وصريحة وإعلام المستخدم بالغرض المحدد للمعالجة',
          'نشر البيانات على الشبكات الاجتماعية العامة',
          'الاحتفاظ بالبيانات لمدد غير محددة ودون إخطار صاحبها'
        ],
        optionsFr: [
          'Consentement préalable, explicite et information claire sur la finalité',
          'Publication préalable sur des réseaux ouverts au public',
          'Conservation illimitée sans obligation d\'information'
        ],
        correctIndex: 0,
        explanationAr: 'مبدأ الشفافية والموافقة الصريحة والتخصيص هو حجر الزاوية في كافة قوانين حماية البيانات الشخصية الحديثة.',
        explanationFr: 'Le consentement éclairé et la limitation des finalités constituent les piliers de la conformité.'
      }
    ]
  }
];

export const LEGAL_EXPERTS: LegalExpert[] = [
  {
    id: 'exp-1',
    nameAr: 'الأستاذ عبد الرحمن بوزيد',
    nameFr: 'Me Abderrahmane Bouzid',
    titleAr: 'محامٍ معتمد لدى المحكمة العليا ومجلس الدولة',
    titleFr: 'Avocat Agréé près la Cour Suprême et le Conseil d\'État',
    specialtyAr: 'القانون التجاري والشركات والتحكيم الدولي',
    specialtyFr: 'Droit des Affaires, Sociétés & Arbitrage International',
    cityAr: 'الجزائر العاصمة',
    cityFr: 'Alger',
    experienceYears: 22,
    rating: 4.95,
    consultationFeeAr: '5,000 د.ج / استشارة',
    consultationFeeFr: '45 € / Consultation',
    languages: ['العربية', 'Français', 'English'],
    verified: true,
    availableOnline: true
  },
  {
    id: 'exp-2',
    nameAr: 'الأستاذة نادية التلمساني',
    nameFr: 'Me Nadia Tlemçani',
    titleAr: 'محامية بهيئة الدار البيضاء ومحكمة النقض',
    titleFr: 'Avocate au Barreau de Casablanca & Cour de Cassation',
    specialtyAr: 'قانون العمل، المنازعات الاجتماعية والنزاعات العقدية',
    specialtyFr: 'Droit du Travail & Contentieux Civil et Commercial',
    cityAr: 'الدار البيضاء',
    cityFr: 'Casablanca',
    experienceYears: 16,
    rating: 4.9,
    consultationFeeAr: '600 د.م / استشارة',
    consultationFeeFr: '55 € / Consultation',
    languages: ['العربية', 'Français'],
    verified: true,
    availableOnline: true
  },
  {
    id: 'exp-3',
    nameAr: 'الأستاذ منذر السويسي',
    nameFr: 'Me Mondher Souissi',
    titleAr: 'موثق ومستشار عقود التوثيق ونقل الملكية',
    titleFr: 'Notaire & Conseiller en Droit Immobilier et Successoral',
    specialtyAr: 'القانون العقاري، المعاملات التوثيقية والتركات',
    specialtyFr: 'Droit Immobilier, Actes Notariés & Successions',
    cityAr: 'تونس العاصمة',
    cityFr: 'Tunis',
    experienceYears: 19,
    rating: 4.88,
    consultationFeeAr: '120 د.ت / استشارة',
    consultationFeeFr: '40 € / Consultation',
    languages: ['العربية', 'Français'],
    verified: true,
    availableOnline: true
  },
  {
    id: 'exp-4',
    nameAr: 'الأستاذة مريم الخطيب',
    nameFr: 'Me Mariam El Khatib',
    titleAr: 'محامية ومستشارة قانونية للشركات الناشئة وحماية البيانات',
    titleFr: 'Conseillère Juridique Tech, Startups & Propriété Intellectuelle',
    specialtyAr: 'الملكية الفكرية، التقنية المالية والعقود الرقمية',
    specialtyFr: 'Propriété Intellectuelle, FinTech & Droit Numérique',
    cityAr: 'باريس / باريس الكبرى',
    cityFr: 'Paris',
    experienceYears: 11,
    rating: 4.92,
    consultationFeeAr: '90 € / استشارة',
    consultationFeeFr: '90 € / Consultation',
    languages: ['العربية', 'Français', 'English'],
    verified: true,
    availableOnline: true
  }
];

export const PRICING_PLANS = [
  {
    id: 'free',
    nameAr: 'الباقة الميسرة (المواطن والباحث)',
    nameFr: 'Formule Citoyenne (Accès Libre)',
    targetAr: 'للأفراد والمواطنين والطلبة لاستكشاف وشرح القوانين',
    targetFr: 'Pour les citoyens, particuliers et étudiants',
    priceAr: 'مجاناً',
    priceFr: 'Gratuit',
    cadenceAr: 'دائم',
    cadenceFr: 'Permanent',
    featuresAr: [
      'البحث في النصوص ومواد القوانين الرسمية',
      'تبسيط 5 مواد قانونية شهرياً بمستوى المواطن',
      'استشارات أولية استرشادية محدودة (3 شهرياً)',
      'الاطلاع على فهرس الأكاديمية والمقالات الإرشادية',
      'تصفح دليل المحامين والخبراء المعتمدين'
    ],
    featuresFr: [
      'Recherche dans les codes et textes officiels',
      'Simplification de 5 articles par mois (niveau citoyen)',
      '3 orientations juridiques préliminaires par mois',
      'Accès au catalogue de l\'académie et articles publics',
      'Consultation de l\'annuaire des experts vérifiés'
    ],
    ctaAr: 'ابدأ الاستخدام المجاني',
    ctaFr: 'Commencer Gratuitement',
    popular: false
  },
  {
    id: 'pro',
    nameAr: 'باقة المحترف القانوني (Pro Juriste)',
    nameFr: 'Formule Pro Juriste',
    targetAr: 'للطلبة المتقدمين، الحقوقيين، والممارسين المستقلين',
    targetFr: 'Pour juristes, étudiants en master et professionnels indépendants',
    priceAr: '3,900 د.ج / 350 د.م',
    priceFr: '29 €',
    cadenceAr: 'شهرياً أو 35,000 د.ج سنوياً',
    cadenceFr: 'par mois (ou 290 € / an)',
    featuresAr: [
      'شرح غير محدود للنصوص بالمستويات الثلاثة (مواطن/طالب/محامٍ)',
      'استشارات قانونية غير محدودة مع التكييف الإجرائي',
      'تدقيق وتحليل العقود والوثائق حتى 25 وثيقة شهرياً',
      'ترجمة قانونية تخصصية (عربية - فرنسية) مع مسرد المصطلحات',
      'استوديو صياغة النصوص القانونية ومقترحات المواد',
      'خصم 20% على جميع الدورات التكوينية بالأكاديمية',
      'تصدير التقارير بصيغة PDF وWord الرسمية'
    ],
    featuresFr: [
      'Simplification illimitée sur les 3 niveaux de complexité',
      'Orientations juridiques complètes et sans quota',
      'Audit et analyse de contrats jusqu\'à 25 documents/mois',
      'Traduction juridique bilingue spécialisée avec glossaire',
      'Studio de légistique et rédaction de clauses adaptées',
      '-20% de réduction sur toutes les formations certifiantes',
      'Export des synthèses et audits au format PDF/Word'
    ],
    ctaAr: 'اشترك الآن في باقة المحترف',
    ctaFr: 'Souscrire à l\'offre Pro',
    popular: true
  },
  {
    id: 'enterprise',
    nameAr: 'باقة المكاتب والمؤسسات (Cabinet & Enterprise)',
    nameFr: 'Formule Cabinet & Entreprise',
    targetAr: 'لمكاتب المحاماة، الشركات، المؤسسات الحكومية والخاصة',
    targetFr: 'Pour cabinets d\'avocats, directions juridiques et entreprises',
    priceAr: '18,500 د.ج / 1,700 د.م',
    priceFr: '149 €',
    cadenceAr: 'شهرياً (فريق عمل حتى 10 مستخدمين)',
    cadenceFr: 'par mois (équipe jusqu\'à 10 utilisateurs)',
    featuresAr: [
      'كافة مزايا باقة المحترف لـ 10 حسابات متزامنة',
      'تحليل وتدقيق غير محدود للعقود والاتفاقيات وضمان الامتثال',
      'أداة الصياغة التشريعية والتنظيمية المتقدمة للخبراء',
      'ربط برمجيات المكتب والشركات عبر API تخصصية',
      'حزم تدريب مؤسسية مع شهادات معتمدة للفريق',
      'مدير حساب قانوني مخصص ودعم فني على مدار الساعة',
      'اتفاقية مستوى الخدمة وحماية السرية المهنية المشددة'
    ],
    featuresFr: [
      'Tous les avantages Pro pour 10 comptes collaborateurs',
      'Audit contractuel illimité et contrôle de conformité B2B',
      'Outil de légistique avancée pour projets de lois et règlements',
      'Accès API dédié pour intégration ERP et logiciels métiers',
      'Formations sur-mesure pour les équipes avec certification',
      'Chargé de compte dédié et support prioritaire 24/7',
      'Accord SLA et garantie de stricte confidentialité professionnelle'
    ],
    ctaAr: 'طلب اشتراك مؤسسي',
    ctaFr: 'Contacter l\'équipe Entreprise',
    popular: false
  }
];

export const PAY_PER_SERVICE = [
  {
    id: 'audit-doc',
    titleAr: 'تدقيق وتحليل وثيقة أو عقد منفرد',
    titleFr: 'Audit unitaire de contrat ou document légal',
    priceAr: '1,500 د.ج / 140 د.م',
    priceFr: '15 €',
    descAr: 'تحليل فوري لكافة البنود المجحفة، الالتزامات والمهل، مع تقديم تقرير التعديلات الواجبة.',
    descFr: 'Rapport complet des risques, clauses léonines et recommandations d\'amendements.'
  },
  {
    id: 'sworn-translation',
    titleAr: 'ترجمة قانونية متخصصة ومراجعة مصطلحية',
    titleFr: 'Traduction juridique rigoureuse certifiée',
    priceAr: '2,000 د.ج / 180 د.م / للصفحة',
    priceFr: '19 € / page',
    descAr: 'ترجمة دقيقة تحافظ على القيمة الثبوتية والتكييف القانوني الصحيح باللغتين العربية والفرنسية.',
    descFr: 'Traduction fidèle avec respect des équivalences terminologiques et juridiques.'
  },
  {
    id: 'consult-booking',
    titleAr: 'حجز جلسة استشارة مباشرة مع محامٍ معتمد',
    titleFr: 'Réservation de consultation directe avec avocat',
    priceAr: 'حسب تعرفة المختص (تبدأ من 4,000 د.ج)',
    priceFr: 'Selon le praticien (dès 40 €)',
    descAr: 'جلسة فيديو مباشرة أو موعد مكتبي مع محامٍ مرخص لمراجعة قضيتك وتوجيهك خطوة بخطوة.',
    descFr: 'Rendez-vous en visioconférence ou en cabinet avec un avocat inscrit pour étude approfondie.'
  }
];

export interface LegalNotification {
  id: string;
  articleId: string;
  articleNumber: string;
  codeNameAr: string;
  codeNameFr: string;
  type: 'amendment' | 'decree' | 'jurisprudence' | 'repeal';
  titleAr: string;
  titleFr: string;
  summaryAr: string;
  summaryFr: string;
  gazetteRefAr: string;
  gazetteRefFr: string;
  effectiveDate: string;
  oldTextAr?: string;
  oldTextFr?: string;
  newTextAr?: string;
  newTextFr?: string;
  keyChangesAr?: string[];
  keyChangesFr?: string[];
  read: boolean;
  createdAt: string;
}

export const INITIAL_NOTIFICATIONS: LegalNotification[] = [
  {
    id: 'notif-1',
    articleId: 'art-lab-12',
    articleNumber: 'المادة 73 / Art. 73',
    codeNameAr: 'قانون العمل وعلاقات العمل',
    codeNameFr: 'Droit du Travail & Relations Professionnelles',
    type: 'amendment',
    titleAr: 'تعديل تشريعي بالجريدة الرسمية: تشديد ضمانات التسريح التأديبي وحضور المحامي',
    titleFr: 'Modification au Journal Officiel: Renforcement des garanties lors du licenciement disciplinaire',
    summaryAr: 'صدر تعديل للمادة 73 يلزم المشغل بمهلة استدعاء خطية لا تقل عن 15 يوماً مع إلزامية تمكين العامل من توكيل محامٍ أو ممثل نقابي، وبطلان الفصل تلقائياً عند غياب التعليل.',
    summaryFr: 'Nouvelle rédaction imposant un préavis de convocation de 15 jours avec assistance obligatoire d\'un avocat ou représentant syndical sous peine de nullité absolue.',
    gazetteRefAr: 'الجريدة الرسمية رقم 14 لسنة 2026 - ص. 24',
    gazetteRefFr: 'Journal Officiel N° 14 de 2026 - p. 24',
    effectiveDate: '2026-03-01',
    oldTextAr: 'يتم التسريح التأديبي في حالة ارتكاب العامل أخطاء جسيمة، مع وجوب استيفاء إجراءات الاستماع إلى العامل وتبليغه بالقرار كتابياً وفق الآجال المحددة.',
    oldTextFr: 'Le licenciement disciplinaire n\'intervient qu\'en cas de faute grave, sous réserve du respect strict de la procédure contradictoire et de la notification écrite motivée.',
    newTextAr: 'يتم التسريح التأديبي حصراً عند ثبوت الأخطاء الجسيمة المحددة قانوناً، مع وجوب توجيه استدعاء خطي للعامل قبل 15 يوماً على الأقل لحضور جلسة استماع مع إمكانية مؤازرة محامٍ أو مندوب نقابي، وتبليغ القرار معللاً في ظرف 8 أيام تحت طائلة البطلان والتعويض الإلزامي.',
    newTextFr: 'Le licenciement disciplinaire requiert une faute grave avérée, avec convocation écrite 15 jours au préalable, droit d\'être assisté par un avocat ou délégué du personnel, et notification motivée sous 8 jours à peine de nullité de plein droit.',
    keyChangesAr: [
      'تحديد مهلة استدعاء مسبقة لا تقل عن 15 يوماً (بدلاً من مهلة غير محددة)',
      'حق العامل الصريح في الاستعانة بمحامٍ أثناء جلسة الاستماع التأديبية',
      'تقرير البطلان المطلق لقرار التسريح في حال خلوه من التعليل المفصل'
    ],
    keyChangesFr: [
      'Délai de convocation minimal fixé à 15 jours ouvrables',
      'Droit explicite à l\'assistance d\'un avocat en séance contradictoire',
      'Sanction de nullité absolue pour défaut de motivation formelle'
    ],
    read: false,
    createdAt: 'منذ ساعتين / il y a 2h'
  },
  {
    id: 'notif-2',
    articleId: 'art-con-15',
    articleNumber: 'المادة 15 / Art. 15',
    codeNameAr: 'قانون حماية المستهلك وقمع الغش',
    codeNameFr: 'Protection du Consommateur & Répression des Fraudes',
    type: 'decree',
    titleAr: 'مرسوم تنفيذي جديد: تمديد مدة الضمان القانوني للأجهزة الإلكترونية والرقمية إلى 24 شهراً',
    titleFr: 'Décret d\'application: Extension de la garantie légale des biens électroniques à 24 mois',
    summaryAr: 'صدر بالجريدة الرسمية مرسوم تنفيذي يحدد شروط تنفيذ المادة 15، ملزماً الموزعين والتجار بتوفير قطع الغيار والاستبدال الفوري دون مصاريف إضافية خلال سنتين.',
    summaryFr: 'Précision réglementaire de l\'article 15 étendant la garantie de conformité obligatoire et la fourniture de pièces détachées pendant 2 ans.',
    gazetteRefAr: 'الجريدة الرسمية رقم 19 لسنة 2026 - ص. 12',
    gazetteRefFr: 'Journal Officiel N° 19 de 2026 - p. 12',
    effectiveDate: '2026-03-15',
    oldTextAr: 'يلزم كل متدخل بتسليم منتوج مطابق للمواصفات ومضمون من العيوب الخفية، ويكون مسؤولاً عن جبر أي إخلال بالسلامة أو المواصفات المعلنة.',
    oldTextFr: 'Tout professionnel est tenu de livrer un bien conforme aux stipulations contractuelles et exempt de vices cachés affectant son usage normal.',
    newTextAr: 'يلزم كل متدخل بتسليم منتوج مطابق للمواصفات ومضمون من العيوب الخفية لمدة لا تقل عن 24 شهراً للسلع الإلكترونية، مع التزام فوري بالإصلاح أو الاستبدال خلال أجل أقصاه 15 يوماً من الإشعار بالعيب.',
    newTextFr: 'Tout professionnel est tenu de garantir la conformité et l\'absence de vices cachés pendant une durée minimale de 24 mois pour les équipements électroniques, avec obligation de réparation ou remplacement sous 15 jours.',
    keyChangesAr: [
      'تحديد مدة دنيا إلزامية للضمان (24 شهراً) للسلع المعمرة والإلكترونية',
      'إلزام البائع بمهلة 15 يوماً كحد أقصى لإتمام الإصلاح أو الاستبدال'
    ],
    keyChangesFr: [
      'Durée plancher légale de garantie fixée à 24 mois',
      'Plafond impératif de 15 jours pour réparation ou échange standard'
    ],
    read: false,
    createdAt: 'منذ يوم واحد / hier'
  },
  {
    id: 'notif-3',
    articleId: 'art-civ-124',
    articleNumber: 'المادة 124 / Art. 124',
    codeNameAr: 'القانون المدني',
    codeNameFr: 'Code Civil',
    type: 'jurisprudence',
    titleAr: 'اجتهاد قضائي للمحكمة العليا: إقرار التعويض عن الضرر الرقمي وقبول الأدلة الإلكترونية',
    titleFr: 'Jurisprudence Cour Suprême: Réparation du préjudice numérique et validité des preuves électroniques',
    summaryAr: 'أرست الغرفة المدنية للمحكمة العليا مبدأ قضائياً ملزماً يقضي بانسحاب أحكام المادة 124 على التعديات والأضرار الواقعة عبر المنصات الرقمية واعتماد المحاضر الإلكترونية.',
    summaryFr: 'Arrêt de principe consacrant l\'application intégrale de la responsabilité quasi-délictuelle aux atteintes en ligne avec recevabilité des constats d\'huissier numériques.',
    gazetteRefAr: 'مجلة المحكمة العليا - القسم المدني لسنة 2026',
    gazetteRefFr: 'Revue de la Cour Suprême - Chambre Civile 2026',
    effectiveDate: '2026-02-10',
    keyChangesAr: [
      'تكريس المسؤولية المدنية الكاملة عن الإشاعات والأضرار الاقتصادية الرقمية',
      'اعتماد البصمة الرقمية والمراسلات الموثقة كأدلة منتجة لأثر الخطأ والضرر'
    ],
    keyChangesFr: [
      'Consécration de la responsabilité intégrale pour dommages immatériels en ligne',
      'Valeur probante renforcée des empreintes et correspondances horodatées'
    ],
    read: true,
    createdAt: 'منذ 3 أيام / il y a 3j'
  }
];

