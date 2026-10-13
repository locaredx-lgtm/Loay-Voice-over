import { Dialect, VoicePersona, VoiceStyle, ScriptTemplate } from '../types';

export const DIALECTS: Dialect[] = [
  // 1. مصر
  {
    id: 'egyptian',
    nameAr: 'اللهجة المصرية (عامية قاهرية)',
    nameEn: 'Egyptian Arabic (Cairo)',
    flag: '🇪🇬',
    region: 'egypt',
    regionNameAr: 'مصر',
    description: 'الأكثر شهرة وانتشاراً في الإعلام والإعلانات والسينما، سريعة البديهة وحيوية.',
    samplePhrases: [
      'يا هلا بيك! جاهز تكسر الدنيا معانا النهارده؟',
      'بص بقى، مفيش وقت نضيعه، العرض ده مبيتعوضش مرتين!',
      'عايز أقولك إن التجربة دي هتغير وجهة نظرك تماماً.'
    ],
    phoneticTips: 'تنطق القاف كهمزة غالباً (قال -> أل)، والجيم معطشة خفيفة أو قاهرية صلبة (G).'
  },
  {
    id: 'egyptian_alex',
    nameAr: 'اللهجة الإسكندرانية',
    nameEn: 'Alexandrian Egyptian',
    flag: '🇪🇬',
    region: 'egypt',
    regionNameAr: 'مصر',
    description: 'لهجة عروس البحر المتوسط، مميزة بمد الكلمات واستخدام تعابير مثل "أيوه بقى" و"يا جدعان".',
    samplePhrases: [
      'يا سيدي البحر والروقان كله هنا عندنا في إسكندرية!',
      'أيوه كده.. خليك مصحصح معانا عشان اللي جاي تقيل قوي.'
    ],
    phoneticTips: 'نبرة ساحلية ممتدة ومحبوبة مع استخدام كاف الجمع بخصوصية.'
  },
  {
    id: 'egyptian_saidi',
    nameAr: 'اللهجة الصعيدية',
    nameEn: 'Upper Egypt (Sa\'idi)',
    flag: '🇪🇬',
    region: 'egypt',
    regionNameAr: 'مصر',
    description: 'لهجة صعيد مصر؛ أصيلة، قوية النبرة، تفيض بالشهامة والرجولة والمصداقية.',
    samplePhrases: [
      'يا مرحب بيكم يا حبايبنا، كلمتنا واحدة والعهد عهد رجال!',
      'اللي يدور على الأصالة والخير ملوش غير هنا.'
    ],
    phoneticTips: 'تنطق الجيم مثل D-J، والقاف كحرف G صلب أحياناً.'
  },

  // 2. السعودية والخليج العربي
  {
    id: 'saudi_najdi',
    nameAr: 'اللهجة السعودية (النجدية - الرياض)',
    nameEn: 'Saudi Najdi (Riyadh)',
    flag: '🇸🇦',
    region: 'gulf',
    regionNameAr: 'السعودية والخليج',
    description: 'لهجة العاصمة والوسط، فخمة وواثقة، مثالية للإعلانات العقارية والاستثمارية والشركات.',
    samplePhrases: [
      'يا هلا والله ومسهلا! نورتونا وحياكم الله في تجربة مختلفة تماماً.',
      'أبشر بسعدك، كل اللي بخاطرك صار بين يديك وبأعلى مقاييس الجودة.',
      'ودك بشي يبيض الوجه؟ هذا هو الاختيار اللي تبيه بالضبط.'
    ],
    phoneticTips: 'الكاف تتحول إلى تس في بعض المواضع، تفخيم الحروف برقي وثقة.'
  },
  {
    id: 'saudi_hijazi',
    nameAr: 'اللهجة الحجازية (جدة ومكة)',
    nameEn: 'Saudi Hijazi (Jeddah)',
    flag: '🇸🇦',
    region: 'gulf',
    regionNameAr: 'السعودية والخليج',
    description: 'لهجة الغربية، ناعمة ومرحبة وودودة جداً، مشهورة بكلمات "دحين" و"إيش الهرجة".',
    samplePhrases: [
      'يا سيدي أهلاً وسهلاً، منور دنيتنا دحين وكل يوم!',
      'لا تشيل هم أبداً، الموضوع أسهل مما تتخيل وما ياخذ منك ثواني.'
    ],
    phoneticTips: 'نبرة رقيقة ولطيفة مع إمالة خفيفة ومخارج حروف واضحة.'
  },
  {
    id: 'emirati',
    nameAr: 'اللهجة الإماراتية',
    nameEn: 'Emirati Arabic',
    flag: '🇦🇪',
    region: 'gulf',
    regionNameAr: 'السعودية والخليج',
    description: 'لهجة خليجية أصيلة، مفعمة بروح الفخامة والتطور والضيافة الكريمة.',
    samplePhrases: [
      'مرحبا الساع! يسعدنا نرحب فيكم ونقدملكم تجربة ما صارت من قبل.',
      'شو رايك نعيش اللحظة بأسلوب راقي يليق بطموحك؟ خلك ويانا.'
    ],
    phoneticTips: 'الجيم تنطق ياء أحياناً (مسيد للمسجد)، والقاف تنطق كجيم قاهرية (چ).'
  },
  {
    id: 'kuwaiti',
    nameAr: 'اللهجة الكويتية',
    nameEn: 'Kuwaiti Arabic',
    flag: '🇰🇼',
    region: 'gulf',
    regionNameAr: 'السعودية والخليج',
    description: 'لهجة خليجية عصرية وراقية، مميزة بإيقاعها الموسيقي واحترافيتها الإعلانية.',
    samplePhrases: [
      'هلا وغلا بالحبايب، تدري شنو المميز؟ إنك دايم تستاهل الأفضل!',
      'وايد مبسوطين بوجودك ويانا، وخلك جاهز لمفاجآت ما تخطر على البال.'
    ],
    phoneticTips: 'استخدام مصطلحات راقية (وايد، شنو، چذي) وإيقاع مموسق.'
  },

  // 3. بلاد الشام
  {
    id: 'levantine_syrian',
    nameAr: 'اللهجة السورية (الشامية)',
    nameEn: 'Syrian Damascene',
    flag: '🇸🇾',
    region: 'levant',
    regionNameAr: 'بلاد الشام',
    description: 'لهجة دمشق وحلب العذبة، رقيقة ودافئة، مشهورة بنبرة اللباقة والقصص والدراما.',
    samplePhrases: [
      'يا مية أهلاً وسهلاً فيكن! نورتو مطرحكن وكل أوقاتكن بالخير.',
      'شو في أحلى من إنك تلاقي راحة بالك بكل تفصيل صغير؟ خليك معنا لتشوف الفرق.',
      'على عيني وراسي، كل اللي بتتمناه بصير حاضر بين إيديك.'
    ],
    phoneticTips: 'القاف تلفظ همزة، مد ناعم في نهايات الجمل مع تلطيف العبارات.'
  },
  {
    id: 'levantine_lebanese',
    nameAr: 'اللهجة اللبنانية (البيروتية)',
    nameEn: 'Lebanese Arabic',
    flag: '🇱🇧',
    region: 'levant',
    regionNameAr: 'بلاد الشام',
    description: 'لهجة عصرية، جذابة، مليئة بالحياة والأناقة، مثالية للموضة والتسويق والجمال.',
    samplePhrases: [
      'هاي كيفكن! كتير مبسوطين نكون معكن اليوم بهيدا الفيديو المميز.',
      'لك شو ناطر بعدك؟ جرب هلأ واكتشف السحر اللي عم نحكي عنو!',
      'عن جد شي مش معقول، ولا أهضم من هيك تجربة بتفتح النفس.'
    ],
    phoneticTips: 'إمالة الألف نحو الياء الخفيفة (É)، استخدام (هلأ، شو، هيدا) وإيقاع شبابي.'
  },
  {
    id: 'levantine_jordanian',
    nameAr: 'اللهجة الأردنية والفلسطينية',
    nameEn: 'Jordanian & Palestinian',
    flag: '🇯🇴',
    region: 'levant',
    regionNameAr: 'بلاد الشام',
    description: 'لهجة محبوبة تجمع بين العفوية والأصالة، نبرتها واضحة ومقنعة للجمهور.',
    samplePhrases: [
      'يسعد مساكم يا غوالي! جهزوا حالكم لتشوفوا شو محضرينلكم اليوم.',
      'مش رح تصدق قديش الموضوع بسيط ورح يفرق معك من أول يوم!'
    ],
    phoneticTips: 'تنطق الكاف كحرف چ أحياناً في الريف، والهمزة بدلاً من القاف في المدن.'
  },

  // 4. المغرب العربي
  {
    id: 'moroccan',
    nameAr: 'اللهجة المغربية (الدارجة)',
    nameEn: 'Moroccan Darija',
    flag: '🇲🇦',
    region: 'maghreb',
    regionNameAr: 'المغرب العربي',
    description: 'الدارجة المغربية الغنية بالأصالة، إيقاع سريع ومصطلحات معبرة تجمع بين الشرق والغرب.',
    samplePhrases: [
      'السلام عليكم ورحمة الله! مرحبا بكم معنا اليوم فـ هاد الفيديو الممتاز.',
      'واش باغي تبدل حياتك للأحسن؟ دابا كولشي ولا ساهل وفـ متناول يدك!',
      'تبارك الله عليكم، تبعو معنا حتى اللخر باش تشوفو كل التفاصيل الزوينة.'
    ],
    phoneticTips: 'تسكين أوائل الكلمات، استخدام (ديال، بزاف، دابا، واش، زوين).'
  },
  {
    id: 'algerian',
    nameAr: 'اللهجة الجزائرية (الدارجة)',
    nameEn: 'Algerian Darija',
    flag: '🇩🇿',
    region: 'maghreb',
    regionNameAr: 'المغرب العربي',
    description: 'دارجة جزائرية قوية وصادقة، غنية بالحماس والروح الوطنية والشبابية.',
    samplePhrases: [
      'صحا خاوتنا وعسلامتكم! اليوم جبنالكم حاجة طيارة بزاف متراطيوهاش.',
      'كيما راكم تشوفو، الخدمة نقية والنتيجة فور خلاص!'
    ],
    phoneticTips: 'استخدام (خاطر، كاش، برك، واش راك، بزاف) بنبرة دافئة وقوية.'
  },
  {
    id: 'tunisian',
    nameAr: 'اللهجة التونسية',
    nameEn: 'Tunisian Arabic',
    flag: '🇹🇳',
    region: 'maghreb',
    regionNameAr: 'المغرب العربي',
    description: 'لهجة تونس الخضراء العذبة، رشيقة وموسيقية تلامس القلب بسهولة.',
    samplePhrases: [
      'عسلامة ومرحبا بيكم الناس الكل! فرحانين برشا بلقاكم اليوم.',
      'شنوة رايكم نكتشفوا مع بعضنا حاجة مزيانة برشا تبدللكم جوكم؟'
    ],
    phoneticTips: 'استخدام (برشا، شنوة، باهي، عسلامة، مزيان).'
  },

  // 5. العراق والسودان واليمن
  {
    id: 'iraqi',
    nameAr: 'اللهجة العراقية (البغدادية)',
    nameEn: 'Iraqi Arabic (Baghdad)',
    flag: '🇮🇶',
    region: 'iraq_sudan_yemen',
    regionNameAr: 'العراق والسودان واليمن',
    description: 'لهجة وادي الرافدين، دافئة وعميقة النبرة، تلامس المشاعر وتناسب القصص والدراما والإعلانات المؤثرة.',
    samplePhrases: [
      'هلو عيوني! شلونكم وأحوالكم؟ اليوم جايبين لكم شغلة تخبل ومن العمر.',
      'فد شي راقي ومضبوط، لا تفوتون الفرصة لأنكم صدك تستاهلون الدلال.',
      'من كل قلبي أكللكم: هذا هو الاختيار الصح اللي ما تندمون عليه أبد.'
    ],
    phoneticTips: 'حرف الكاف يلفظ چ (چلب، چنت)، والقاف ج صلبة (أكللكم).'
  },
  {
    id: 'sudanese',
    nameAr: 'اللهجة السودانية',
    nameEn: 'Sudanese Arabic',
    flag: '🇸🇩',
    region: 'iraq_sudan_yemen',
    regionNameAr: 'العراق والسودان واليمن',
    description: 'لهجة النيل، قريبة جداً من الفصحى في أصولها، هادئة، صادقة وتفيض بالحب والطيبة.',
    samplePhrases: [
      'حبابكم عشرة يا أخوانا! مرحب بيكم في لقاء حباب وسعيد بيكم جداً.',
      'ما تشيلوا هم بالمرة، كل الأمور ماشية بالهداوة والروقان والتيسير.',
      'يا زول خلي بالك معاي عشان تشوف الحلاوة دي كلها حاصلة كيف.'
    ],
    phoneticTips: 'نطق فصيح وواضح للألفاظ، نبرة دافئة مطمئنة (يا زول، حبابكم).'
  },
  {
    id: 'yemeni',
    nameAr: 'اللهجة اليمنية',
    nameEn: 'Yemeni Arabic',
    flag: '🇾🇪',
    region: 'iraq_sudan_yemen',
    regionNameAr: 'العراق والسودان واليمن',
    description: 'مهد العروبة، لهجة أصيلة ونقية تعكس التراث العريق وحكمة الأجداد.',
    samplePhrases: [
      'حياكم الله وأهلاً وسهلاً بالجميع، نورتم ديارنا ومكانكم في العين والرأس.',
      'يا رعاكم الله، شوفوا هذا الإبداع كيف يبهر الأنظار.'
    ],
    phoneticTips: 'مخارج حروف عربية قوية وفصيحة مع نبرة تراثية مميزة.'
  },

  // 6. الفصحى المعاصرة
  {
    id: 'msa_standard',
    nameAr: 'اللغة العربية الفصحى (الإعلامية)',
    nameEn: 'Modern Standard Arabic (MSA)',
    flag: '🌐',
    region: 'msa',
    regionNameAr: 'الفصحى المعاصرة',
    description: 'لغة الضاد الفصحى، سليمة النطق ومشكولة، مناسبة للأفلام الوثائقية والنشرات والكتب الصوتية العالمية.',
    samplePhrases: [
      'مرحباً بكم في عصر الذكاء الصوتي، حيث تلتقي التكنولوجيا بالإبداع الإنساني.',
      'في هذا العالم المتسارع، تبقى الكلمة الصادقة هي الجسر الأقوى إلى القلوب.',
      'اكتشفوا معنا آفاقاً جديدة تصنع الفارق وتلهم المستقبل.'
    ],
    phoneticTips: 'تشكيل الحركات وضبط الإعراب ومخارج الحروف الصافية (ق، ض، ظ، ع).'
  },

  // 7. عالمي
  {
    id: 'english_us',
    nameAr: 'English (US American Accent)',
    nameEn: 'English (American)',
    flag: '🇺🇸',
    region: 'global',
    regionNameAr: 'لهجات ولغات عالمية',
    description: 'Clear, modern American English voiceover for international products and global audiences.',
    samplePhrases: [
      'Welcome everyone! Are you ready to take your voiceover game to the next level?',
      'Check this out! With just one click, turn your scripts into pure magic.',
      'Don\'t wait any longer. Experience the future of studio sound today!'
    ],
    phoneticTips: 'Modern punchy rhotic delivery, upbeat commercial modulation.'
  },
  {
    id: 'english_uk',
    nameAr: 'English (British UK Accent)',
    nameEn: 'English (British)',
    flag: '🇬🇧',
    region: 'global',
    regionNameAr: 'لهجات ولغات عالمية',
    description: 'Sophisticated, classic British pronunciation ideal for luxury brands and educational narratives.',
    samplePhrases: [
      'Good day, ladies and gentlemen. Welcome to an exceptional auditory journey.',
      'Excellence is not an accident; it is the deliberate outcome of refined craftsmanship.'
    ],
    phoneticTips: 'Non-rhotic crisp received pronunciation, authoritative elegance.'
  }
];

export const VOICES: VoicePersona[] = [
  {
    id: 'Kore',
    nameAr: 'كوري (Kore) - نسائي دافئ',
    nameEn: 'Kore (Female - Warm & Clear)',
    gender: 'female',
    toneAr: 'دافئ، واضح، ملهم وناعم',
    descriptionAr: 'الصوت الأكثر توازناً، مثالي للإعلانات التجارية، البودكاست، والشروحات التعليمية.',
    avatarColor: 'from-rose-500 to-amber-500'
  },
  {
    id: 'Puck',
    nameAr: 'باك (Puck) - شبابي حماسي',
    nameEn: 'Puck (Male - Energetic & Youthful)',
    gender: 'male',
    toneAr: 'حماسي، سريع البديهة، عصري وقوي',
    descriptionAr: 'مثالي لريلز تيك توك وإنستغرام، إعلانات التطبيقات، والترويج الشبابي الجذاب.',
    avatarColor: 'from-amber-500 to-emerald-500'
  },
  {
    id: 'Fenrir',
    nameAr: 'فينرير (Fenrir) - رجالي عميق وفخم',
    nameEn: 'Fenrir (Male - Deep & Authoritative)',
    gender: 'male',
    toneAr: 'رخيم، عميق، وقور وذو هيبة',
    descriptionAr: 'الصوت المثالي للأفلام الوثائقية، إعلانات السيارات والعقارات، والبروموهات السينمائية.',
    avatarColor: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'Zephyr',
    nameAr: 'زفير (Zephyr) - هادئ واحترافي',
    nameEn: 'Zephyr (Neutral/Soft - Smooth & Calming)',
    gender: 'female',
    toneAr: 'هادئ، ناعم، احترافي ومطمئن',
    descriptionAr: 'رائع للتأمل، كتب الصوت الهادئة، خدمة العملاء IVR، والقصص الشاعرية.',
    avatarColor: 'from-teal-400 to-cyan-600'
  },
  {
    id: 'Charon',
    nameAr: 'شارون (Charon) - سردي جاد',
    nameEn: 'Charon (Male - Narrative & Resonant)',
    gender: 'male',
    toneAr: 'هادئ، جاد، سردي وموزون',
    descriptionAr: 'ممتاز للبودكاست الحواري، الأخبار، السير الذاتية، ومراجعات الكتب.',
    avatarColor: 'from-purple-600 to-pink-600'
  }
];

export const STYLES: VoiceStyle[] = [
  {
    id: 'energetic_commercial',
    nameAr: 'إعلاني حماسي ومحفز',
    nameEn: 'Commercial & High Energy',
    icon: 'Megaphone',
    descriptionAr: 'إيقاع سريع يجذب الانتباه فوراً، مناسب للعروض والحملات التسويقية.'
  },
  {
    id: 'documentary_deep',
    nameAr: 'وثائقي سينمائي عميق',
    nameEn: 'Documentary & Narrative',
    icon: 'Film',
    descriptionAr: 'نبرة عميقة مع وقفات درامية محسوبة تأسر وجدان المستمع.'
  },
  {
    id: 'conversational_podcast',
    nameAr: 'بودكاست وحوار عفوي',
    nameEn: 'Conversational Podcast',
    icon: 'Mic',
    descriptionAr: 'كأنك تتحدث مع صديق مقرب في مقهى، نبرة طبيعية بدون تكلف.'
  },
  {
    id: 'tiktok_fast',
    nameAr: 'ريلز وتيك توك سريع وجذاب',
    nameEn: 'TikTok & Reels Fast Hook',
    icon: 'Zap',
    descriptionAr: 'خطافات قوية في أول 3 ثوانٍ وتدفق سريع لمنع التخطي.'
  },
  {
    id: 'dramatic_cinematic',
    nameAr: 'درامي وتأثيري مشوق',
    nameEn: 'Dramatic Trailer',
    icon: 'Sparkles',
    descriptionAr: 'إحساس عالٍ بالتشويق والإثارة يرفع الأدرينالين.'
  },
  {
    id: 'news_anchor',
    nameAr: 'إخباري ومؤسسي رسمي',
    nameEn: 'News & Corporate Anchor',
    icon: 'Award',
    descriptionAr: 'ثقة، مصداقية، ووضوح تام في النبرة ومخارج الكلمات.'
  },
  {
    id: 'storyteller_warm',
    nameAr: 'راوي قصص للأطفال والكبار',
    nameEn: 'Storyteller & Tale',
    icon: 'BookOpen',
    descriptionAr: 'نبرة محبوبة دافئة تمزج بين الخيال والمشاعر.'
  }
];

export const SAMPLE_SCRIPTS: ScriptTemplate[] = [
  {
    id: 's1',
    title: 'إعلان تطبيق جوال سريع (مصري)',
    category: 'commercial',
    categoryAr: 'إعلان تجاري',
    dialectId: 'egyptian',
    text: 'زهقت من الزحمة وتضييع الوقت في الطوابير؟ من النهارده مفيش وجع دماغ! حمّل الأبليكيشن واطلب كل طلباتك بكليك واحدة، وهتوصلك لحد باب بيتك في دقايق. مستني إيه؟ يالا جرّب دلوقتي واستفيد بخصم أول أوردر!',
    description: 'إعلان سريع وحيوي بلهجة مصرية عامية مع خطاف قوي ودعوة للشراء.'
  },
  {
    id: 's2',
    title: 'إعلان عقارات فاخرة (سعودي نجدي)',
    category: 'commercial',
    categoryAr: 'إعلان فخم',
    dialectId: 'saudi_najdi',
    text: 'التميز مو بس كلمة.. التميز أسلوب حياة تلمسه بكل زاوية. في قلب الرياض، نقدملكم مجمعنا السكني الفاخر بتصاميم عصرية ومساحات واسعة تشرح الصدر وتبيض الوجه. استثمارك اليوم هو أمان عائلتك بكرة. احجز زيارتك الآن وحياكم الله.',
    description: 'لهجة نجدية راقية وواثقة تبرز الفخامة والقيمة الاستثمارية.'
  },
  {
    id: 's3',
    title: 'ريلز كافيه وتجربة قهوة (شامي لبناني)',
    category: 'reel',
    categoryAr: 'ريلز وسوشيال ميديا',
    dialectId: 'levantine_lebanese',
    text: 'ريحة فنجان القهوة على الصبح؟ بتسوى الدني كلها! تعوا تنقضي سوا أحلى رواق، كاسة قهوة معمولة ع أصولها ولقمة حلو بتدوب بالتم. ناطرينكن لتجربوا وتشوفوا الفرق بعينكن!',
    description: 'لهجة لبنانية عفوية وجذابة تناسب انستغرام وتيك توك.'
  },
  {
    id: 's4',
    title: 'وثائقي عن أسرار الفضاء والكون (فصحى)',
    category: 'documentary',
    categoryAr: 'وثائقي وتاريخي',
    dialectId: 'msa_standard',
    text: 'هنا، في أعماق هذا الكون الفسيح، تولد النجوم وتندثر المجرات في صمتٍ مهيب. ملايين السنين الضوئية تفصلنا عن أسرارٍ لم نكتشف سوى قطرةٍ منها. رحلةٌ لا تنتهي في البحث عن حقيقة الوجود.',
    description: 'لغة عربية فصحى وقورة ومشكولة بأسلوب وثائقي مهيب.'
  },
  {
    id: 's5',
    title: 'عرض متجر إلكتروني وعروض نهاية الأسبوع (إماراتي)',
    category: 'commercial',
    categoryAr: 'تسوق وعروض',
    dialectId: 'emirati',
    text: 'مرحبا الساع! عروض الويكند هذي المرة غير عن كل مرة. خصومات توصل لين سبعين بالمية على أرقى الماركات الأصلية، والتوصيل مجاني لين عند باب بيتك في كل إمارات الدولة. لا تفوت الفرصة وخلك الأول اللي يستفيد!',
    description: 'لهجة إماراتية خليجية مضيافة تشجع على الشراء الفوري.'
  },
  {
    id: 's6',
    title: 'مقدمة بودكاست عن النجاح والعمل الحر (عراقي)',
    category: 'podcast',
    categoryAr: 'بودكاست حواري',
    dialectId: 'iraqi',
    text: 'هلو حبايبنا الغالين.. تدري ليش هواية ناس تتردد قبل ما تبدي مشروعها الخاص؟ الخوف من الفشل هو أكبر عائق! بحلقة اليوم من بودكاستنا، راح نسولف سوا عن أسرار البدايات وشلون تحول فكرتك البسيطة إلى نجاح يرفع الراس. يلا جيب كهوتك واسمع ويانا.',
    description: 'لهجة عراقية بغدادية مفعمة بالحميمية والتشجيع.'
  },
  {
    id: 's7',
    title: 'ريلز تسويقي رقمي سريع (مغربي)',
    category: 'reel',
    categoryAr: 'ريلز ومغربي',
    dialectId: 'moroccan',
    text: 'واش مزال كتسنى باش تبدا التجارة الإلكترونية ديالك؟ دابا كلشي تبدل والفرصة بين يديك! جبنالك أسهل منصة تقدر تبيع فيها وتوصل سلعتك فـ وقت قياسي لكاع المدن المغربية. كليكي على الرابط ودخل دابا شوف التفاصيل الزوينة!',
    description: 'دارجة مغربية سريعة وتفاعلية تلائم رواد الأعمال بالمغرب.'
  }
];

export const BACKGROUND_MUSIC_TRACKS = [
  { id: 'none', nameAr: 'بدون موسيقى (صوت خام فقط)', nameEn: 'No Music', mood: 'silent' },
  { id: 'corporate', nameAr: 'موسيقى أعمال حماسية (Upbeat Corporate)', nameEn: 'Corporate Upbeat', mood: 'inspiring' },
  { id: 'cinematic', nameAr: 'خلفية سينمائية عميقة (Cinematic Ambient)', nameEn: 'Cinematic Ambient', mood: 'dramatic' },
  { id: 'lofi', nameAr: 'إيقاع لوفاي هادئ (Lo-Fi Chill Beats)', nameEn: 'Lo-Fi Chill', mood: 'relaxed' },
  { id: 'acoustic', nameAr: 'أكوستيك دافئ ومبهج (Warm Acoustic)', nameEn: 'Warm Acoustic', mood: 'joyful' },
];
