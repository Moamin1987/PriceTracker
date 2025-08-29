// Global Variables
let exchangeRates = {};
let metalsPrices = {};
let cryptoPrices = {};
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
let settings = JSON.parse(localStorage.getItem('settings') || '{"notifications":false,"darkMode":true,"language":"ar"}');
let currentLanguage = settings.language || 'ar';

// Enhanced Translation System
const translations = {
    ar: {
        // App
        appTitle: 'متتبع الأسعار الاحترافي',
        appSubtitle: 'متابعة حية لأسعار الأسواق المالية العالمية',
        appDescription: 'تطبيق احترافي لمتابعة أسعار العملات والمعادن والعملات الرقمية',
        
        // Navigation
        currencies: 'العملات',
        metals: 'المعادن',
        crypto: 'العملات الرقمية',
        goldCalculator: 'حاسبة الذهب',
        zakatCalculator: 'زكاة المال',
        settings: 'الإعدادات',
        
        // Status
        connected: 'متصل',
        offline: 'غير متصل',
        loading: 'جاري التحميل...',
        lastUpdate: 'آخر تحديث',
        
        // Sections
        loadingCurrencies: 'جاري تحميل أسعار العملات...',
        loadingMetals: 'جاري تحميل أسعار المعادن...',
        loadingCrypto: 'جاري تحميل أسعار العملات الرقمية...',
        
        // Calculator
        goldCalculatorDesc: 'حساب قيمة الذهب حسب العيار والوزن',
        zakatCalculatorDesc: 'حساب زكاة الذهب والفضة والعملات',
        calculate: 'احسب القيمة',
        calculateZakat: 'احسب الزكاة',
        result: 'النتيجة',
        
        // Inputs
        country: 'الدولة',
        karat: 'العيار',
        weight: 'الوزن (جرام)',
        enterWeight: 'أدخل الوزن بالجرام',
        globalGoldPrice: 'سعر الذهب العالمي (دولار/أونصة)',
        type: 'نوع المال',
        currency: 'العملة',
        currentPrice: 'السعر الحالي',
        enterValue: 'أدخل القيمة',
        
        // Results
        valueInUSD: 'القيمة بالدولار:',
        valueInLocal: 'القيمة بالعملة المحلية:',
        pricePerGram: 'سعر الجرام:',
        totalValue: 'القيمة الإجمالية:',
        nisab: 'نصاب الزكاة:',
        zakatAmount: 'قيمة الزكاة (2.5%):',
        
        // Settings
        language: 'اللغة',
        languageDesc: 'اختر لغة التطبيق',
        darkMode: 'الوضع المظلم',
        darkModeDesc: 'تفعيل الوضع المظلم',
        subscription: 'الاشتراك',
        free: 'مجاني',
        upgrade: '🚀 ترقية',
        verifyPrices: 'التحقق من دقة الأسعار',
        verifyPricesDesc: 'مقارنة أسعارنا بمصادر موثوقة',
        
        // Ticker
        ticker1: '📈 متتبع الأسعار الاحترافي',
        ticker2: 'متابعة حية لأسعار الأسواق المالية العالمية',
        ticker3: 'بيانات حقيقية 100%',
        ticker4: 'تحديث كل 5 دقائق',
        
        // Karat options
        karat24: 'عيار 24 (ذهب نقي)',
        karat22: 'عيار 22',
        karat21: 'عيار 21',
        karat18: 'عيار 18',
        karat14: 'عيار 14',
        karat10: 'عيار 10',
        
        // Metals
        gold: 'ذهب',
        silver: 'فضة',
        
        // Time
        minutes: 'دقائق',
        
        // Ads
        adTitle: '🎯 دعمنا لتطوير التطبيق',
        adContent: 'اشترك الآن للحصول على تحليلات متقدمة وإشعارات فورية!'
    },
    en: {
        // App
        appTitle: 'Professional Price Tracker',
        appSubtitle: 'Live tracking of global financial market prices',
        appDescription: 'Professional app for tracking currency, metal, and cryptocurrency prices',
        
        // Navigation
        currencies: 'Currencies',
        metals: 'Metals',
        crypto: 'Cryptocurrencies',
        goldCalculator: 'Gold Calculator',
        zakatCalculator: 'Zakat Calculator',
        settings: 'Settings',
        
        // Status
        connected: 'Connected',
        offline: 'Offline',
        loading: 'Loading...',
        lastUpdate: 'Last Update',
        
        // Sections
        loadingCurrencies: 'Loading currency rates...',
        loadingMetals: 'Loading metal prices...',
        loadingCrypto: 'Loading crypto prices...',
        
        // Calculator
        goldCalculatorDesc: 'Calculate gold value by karat and weight',
        zakatCalculatorDesc: 'Calculate zakat for gold, silver, and currencies',
        calculate: 'Calculate Value',
        calculateZakat: 'Calculate Zakat',
        result: 'Result',
        
        // Inputs
        country: 'Country',
        karat: 'Karat',
        weight: 'Weight (grams)',
        enterWeight: 'Enter weight in grams',
        globalGoldPrice: 'Global Gold Price (USD/ounce)',
        type: 'Asset Type',
        currency: 'Currency',
        currentPrice: 'Current Price',
        enterValue: 'Enter value',
        
        // Results
        valueInUSD: 'Value in USD:',
        valueInLocal: 'Value in Local Currency:',
        pricePerGram: 'Price per Gram:',
        totalValue: 'Total Value:',
        nisab: 'Nisab:',
        zakatAmount: 'Zakat Amount (2.5%):',
        
        // Settings
        language: 'Language',
        languageDesc: 'Choose app language',
        darkMode: 'Dark Mode',
        darkModeDesc: 'Enable dark mode',
        subscription: 'Subscription',
        free: 'Free',
        upgrade: '🚀 Upgrade',
        verifyPrices: 'Verify Price Accuracy',
        verifyPricesDesc: 'Compare our prices with reliable sources',
        
        // Ticker
        ticker1: '📈 Professional Price Tracker',
        ticker2: 'Live tracking of global financial market prices',
        ticker3: '100% Real Data',
        ticker4: 'Updates every 5 minutes',
        
        // Karat options
        karat24: '24 Karat (Pure Gold)',
        karat22: '22 Karat',
        karat21: '21 Karat',
        karat18: '18 Karat',
        karat14: '14 Karat',
        karat10: '10 Karat',
        
        // Metals
        gold: 'Gold',
        silver: 'Silver',
        
        // Time
        minutes: 'minutes',
        
        // Ads
        adTitle: '🎯 Support Our Development',
        adContent: 'Subscribe now for advanced analytics and instant notifications!'
    },
    fr: {
        // App
        appTitle: 'Suiveur Professionnel de Prix',
        appSubtitle: 'Suivi en direct des prix des marchés financiers mondiaux',
        appDescription: 'Application professionnelle pour suivre les prix des devises, métaux et cryptomonnaies',
        
        // Navigation
        currencies: 'Devises',
        metals: 'Métaux',
        crypto: 'Cryptomonnaies',
        goldCalculator: 'Calculateur d\'Or',
        zakatCalculator: 'Calculateur de Zakat',
        settings: 'Paramètres',
        
        // Status
        connected: 'Connecté',
        offline: 'Hors ligne',
        loading: 'Chargement...',
        lastUpdate: 'Dernière Mise à Jour',
        
        // Sections
        loadingCurrencies: 'Chargement des taux de change...',
        loadingMetals: 'Chargement des prix des métaux...',
        loadingCrypto: 'Chargement des prix des cryptomonnaies...',
        
        // Calculator
        goldCalculatorDesc: 'Calculer la valeur de l\'or par carat et poids',
        zakatCalculatorDesc: 'Calculer la zakat pour l\'or, l\'argent et les devises',
        calculate: 'Calculer la Valeur',
        calculateZakat: 'Calculer la Zakat',
        result: 'Résultat',
        
        // Inputs
        country: 'Pays',
        karat: 'Carat',
        weight: 'Poids (grammes)',
        enterWeight: 'Entrez le poids en grammes',
        globalGoldPrice: 'Prix Mondial de l\'Or (USD/once)',
        type: 'Type d\'Actif',
        currency: 'Devise',
        currentPrice: 'Prix Actuel',
        enterValue: 'Entrez la valeur',
        
        // Results
        valueInUSD: 'Valeur en USD:',
        valueInLocal: 'Valeur en Devise Locale:',
        pricePerGram: 'Prix par Gramme:',
        totalValue: 'Valeur Totale:',
        nisab: 'Nisab:',
        zakatAmount: 'Montant de la Zakat (2.5%):',
        
        // Settings
        language: 'Langue',
        languageDesc: 'Choisir la langue de l\'application',
        darkMode: 'Mode Sombre',
        darkModeDesc: 'Activer le mode sombre',
        subscription: 'Abonnement',
        free: 'Gratuit',
        upgrade: '🚀 Mettre à Niveau',
        verifyPrices: 'Vérifier l\'Exactitude des Prix',
        verifyPricesDesc: 'Comparer nos prix avec des sources fiables',
        
        // Ticker
        ticker1: '📈 Suiveur Professionnel de Prix',
        ticker2: 'Suivi en direct des prix des marchés financiers mondiaux',
        ticker3: 'Données 100% Réelles',
        ticker4: 'Mises à jour toutes les 5 minutes',
        
        // Karat options
        karat24: '24 Carats (Or Pur)',
        karat22: '22 Carats',
        karat21: '21 Carats',
        karat18: '18 Carats',
        karat14: '14 Carats',
        karat10: '10 Carats',
        
        // Metals
        gold: 'Or',
        silver: 'Argent',
        
        // Time
        minutes: 'minutes',
        
        // Ads
        adTitle: '🎯 Soutenez Notre Développement',
        adContent: 'Abonnez-vous maintenant pour des analyses avancées et des notifications instantanées!'
    },
    es: {
        // App
        appTitle: 'Rastreador Profesional de Precios',
        appSubtitle: 'Seguimiento en vivo de precios de mercados financieros globales',
        appDescription: 'Aplicación profesional para seguir precios de divisas, metales y criptomonedas',
        
        // Navigation
        currencies: 'Divisas',
        metals: 'Metales',
        crypto: 'Criptomonedas',
        goldCalculator: 'Calculadora de Oro',
        zakatCalculator: 'Calculadora de Zakat',
        settings: 'Configuración',
        
        // Status
        connected: 'Conectado',
        offline: 'Desconectado',
        loading: 'Cargando...',
        lastUpdate: 'Última Actualización',
        
        // Sections
        loadingCurrencies: 'Cargando tasas de cambio...',
        loadingMetals: 'Cargando precios de metales...',
        loadingCrypto: 'Cargando precios de criptomonedas...',
        
        // Calculator
        goldCalculatorDesc: 'Calcular valor del oro por quilate y peso',
        zakatCalculatorDesc: 'Calcular zakat para oro, plata y divisas',
        calculate: 'Calcular Valor',
        calculateZakat: 'Calcular Zakat',
        result: 'Resultado',
        
        // Inputs
        country: 'País',
        karat: 'Quilate',
        weight: 'Peso (gramos)',
        enterWeight: 'Ingrese el peso en gramos',
        globalGoldPrice: 'Precio Mundial del Oro (USD/onza)',
        type: 'Tipo de Activo',
        currency: 'Divisa',
        currentPrice: 'Precio Actual',
        enterValue: 'Ingrese el valor',
        
        // Results
        valueInUSD: 'Valor en USD:',
        valueInLocal: 'Valor en Moneda Local:',
        pricePerGram: 'Precio por Gramo:',
        totalValue: 'Valor Total:',
        nisab: 'Nisab:',
        zakatAmount: 'Monto de Zakat (2.5%):',
        
        // Settings
        language: 'Idioma',
        languageDesc: 'Elegir idioma de la aplicación',
        darkMode: 'Modo Oscuro',
        darkModeDesc: 'Activar modo oscuro',
        subscription: 'Suscripción',
        free: 'Gratis',
        upgrade: '🚀 Actualizar',
        verifyPrices: 'Verificar Precisión de Precios',
        verifyPricesDesc: 'Comparar nuestros precios con fuentes confiables',
        
        // Ticker
        ticker1: '📈 Rastreador Profesional de Precios',
        ticker2: 'Seguimiento en vivo de precios de mercados financieros globales',
        ticker3: 'Datos 100% Reales',
        ticker4: 'Actualizaciones cada 5 minutos',
        
        // Karat options
        karat24: '24 Quilates (Oro Puro)',
        karat22: '22 Quilates',
        karat21: '21 Quilates',
        karat18: '18 Quilates',
        karat14: '14 Quilates',
        karat10: '10 Quilates',
        
        // Metals
        gold: 'Oro',
        silver: 'Plata',
        
        // Time
        minutes: 'minutos',
        
        // Ads
        adTitle: '🎯 Apoya Nuestro Desarrollo',
        adContent: '¡Suscríbete ahora para análisis avanzados y notificaciones instantáneas!'
    },
    de: {
        // App
        appTitle: 'Professioneller Preis-Tracker',
        appSubtitle: 'Live-Tracking von globalen Finanzmarktpreisen',
        appDescription: 'Professionelle App zum Verfolgen von Währungs-, Metall- und Kryptopreisen',
        
        // Navigation
        currencies: 'Währungen',
        metals: 'Metalle',
        crypto: 'Kryptowährungen',
        goldCalculator: 'Gold-Rechner',
        zakatCalculator: 'Zakat-Rechner',
        settings: 'Einstellungen',
        
        // Status
        connected: 'Verbunden',
        offline: 'Offline',
        loading: 'Laden...',
        lastUpdate: 'Letzte Aktualisierung',
        
        // Sections
        loadingCurrencies: 'Währungswechselkurse laden...',
        loadingMetals: 'Metallpreise laden...',
        loadingCrypto: 'Kryptopreise laden...',
        
        // Calculator
        goldCalculatorDesc: 'Goldwert nach Karat und Gewicht berechnen',
        zakatCalculatorDesc: 'Zakat für Gold, Silber und Währungen berechnen',
        calculate: 'Wert Berechnen',
        calculateZakat: 'Zakat Berechnen',
        result: 'Ergebnis',
        
        // Inputs
        country: 'Land',
        karat: 'Karat',
        weight: 'Gewicht (Gramm)',
        enterWeight: 'Gewicht in Gramm eingeben',
        globalGoldPrice: 'Weltweiter Goldpreis (USD/Unze)',
        type: 'Vermögensart',
        currency: 'Währung',
        currentPrice: 'Aktueller Preis',
        enterValue: 'Wert eingeben',
        
        // Results
        valueInUSD: 'Wert in USD:',
        valueInLocal: 'Wert in Lokaler Währung:',
        pricePerGram: 'Preis pro Gramm:',
        totalValue: 'Gesamtwert:',
        nisab: 'Nisab:',
        zakatAmount: 'Zakat-Betrag (2.5%):',
        
        // Settings
        language: 'Sprache',
        languageDesc: 'App-Sprache wählen',
        darkMode: 'Dunkler Modus',
        darkModeDesc: 'Dunklen Modus aktivieren',
        subscription: 'Abonnement',
        free: 'Kostenlos',
        upgrade: '🚀 Upgraden',
        verifyPrices: 'Preisgenauigkeit Überprüfen',
        verifyPricesDesc: 'Vergleiche unsere Preise mit zuverlässigen Quellen',
        
        // Ticker
        ticker1: '📈 Professioneller Preis-Tracker',
        ticker2: 'Live-Tracking von globalen Finanzmarktpreisen',
        ticker3: '100% Echte Daten',
        ticker4: 'Aktualisierungen alle 5 Minuten',
        
        // Karat options
        karat24: '24 Karat (Reines Gold)',
        karat22: '22 Karat',
        karat21: '21 Karat',
        karat18: '18 Karat',
        karat14: '14 Karat',
        karat10: '10 Karat',
        
        // Metals
        gold: 'Gold',
        silver: 'Silber',
        
        // Time
        minutes: 'Minuten',
        
        // Ads
        adTitle: '🎯 Unterstützen Sie Unsere Entwicklung',
        adContent: 'Abonnieren Sie jetzt für erweiterte Analysen und sofortige Benachrichtigungen!'
    },
    tr: {
        // App
        appTitle: 'Profesyonel Fiyat Takipçisi',
        appSubtitle: 'Küresel finansal piyasa fiyatlarının canlı takibi',
        appDescription: 'Döviz, metal ve kripto para fiyatlarını takip etmek için profesyonel uygulama',
        
        // Navigation
        currencies: 'Dövizler',
        metals: 'Metaller',
        crypto: 'Kripto Paralar',
        goldCalculator: 'Altın Hesaplayıcı',
        zakatCalculator: 'Zekat Hesaplayıcı',
        settings: 'Ayarlar',
        
        // Status
        connected: 'Bağlı',
        offline: 'Çevrimdışı',
        loading: 'Yükleniyor...',
        lastUpdate: 'Son Güncelleme',
        
        // Sections
        loadingCurrencies: 'Döviz kurları yükleniyor...',
        loadingMetals: 'Metal fiyatları yükleniyor...',
        loadingCrypto: 'Kripto fiyatları yükleniyor...',
        
        // Calculator
        goldCalculatorDesc: 'Ayar ve ağırlığa göre altın değerini hesapla',
        zakatCalculatorDesc: 'Altın, gümüş ve döviz için zekat hesapla',
        calculate: 'Değeri Hesapla',
        calculateZakat: 'Zekatı Hesapla',
        result: 'Sonuç',
        
        // Inputs
        country: 'Ülke',
        karat: 'Ayar',
        weight: 'Ağırlık (gram)',
        enterWeight: 'Gram cinsinden ağırlık girin',
        globalGoldPrice: 'Küresel Altın Fiyatı (USD/ons)',
        type: 'Varlık Türü',
        currency: 'Döviz',
        currentPrice: 'Mevcut Fiyat',
        enterValue: 'Değer girin',
        
        // Results
        valueInUSD: 'USD cinsinden değer:',
        valueInLocal: 'Yerel Para Biriminde Değer:',
        pricePerGram: 'Gram Başına Fiyat:',
        totalValue: 'Toplam Değer:',
        nisab: 'Nisap:',
        zakatAmount: 'Zekat Tutarı (%2.5):',
        
        // Settings
        language: 'Dil',
        languageDesc: 'Uygulama dilini seçin',
        darkMode: 'Karanlık Mod',
        darkModeDesc: 'Karanlık modu etkinleştir',
        subscription: 'Abonelik',
        free: 'Ücretsiz',
        upgrade: '🚀 Yükselt',
        verifyPrices: 'Fiyat Doğruluğunu Doğrula',
        verifyPricesDesc: 'Fiyatlarımızı güvenilir kaynaklarla karşılaştırın',
        
        // Ticker
        ticker1: '📈 Profesyonel Fiyat Takipçisi',
        ticker2: 'Küresel finansal piyasa fiyatlarının canlı takibi',
        ticker3: '%100 Gerçek Veriler',
        ticker4: 'Her 5 dakikada bir güncelleme',
        
        // Karat options
        karat24: '24 Ayar (Saf Altın)',
        karat22: '22 Ayar',
        karat21: '21 Ayar',
        karat18: '18 Ayar',
        karat14: '14 Ayar',
        karat10: '10 Ayar',
        
        // Metals
        gold: 'Altın',
        silver: 'Gümüş',
        
        // Time
        minutes: 'dakika',
        
        // Ads
        adTitle: '🎯 Gelişimimizi Destekleyin',
        adContent: 'Gelişmiş analizler ve anlık bildirimler için şimdi abone olun!'
    },
    zh: {
        // App
        appTitle: '专业价格追踪器',
        appSubtitle: '全球金融市场价格实时追踪',
        appDescription: '追踪货币、金属和加密货币价格的专业应用',
        
        // Navigation
        currencies: '货币',
        metals: '金属',
        crypto: '加密货币',
        goldCalculator: '黄金计算器',
        zakatCalculator: '天课计算器',
        settings: '设置',
        
        // Status
        connected: '已连接',
        offline: '离线',
        loading: '加载中...',
        lastUpdate: '最后更新',
        
        // Sections
        loadingCurrencies: '正在加载汇率...',
        loadingMetals: '正在加载金属价格...',
        loadingCrypto: '正在加载加密货币价格...',
        
        // Calculator
        goldCalculatorDesc: '根据成色和重量计算黄金价值',
        zakatCalculatorDesc: '计算黄金、白银和货币的天课',
        calculate: '计算价值',
        calculateZakat: '计算天课',
        result: '结果',
        
        // Inputs
        country: '国家',
        karat: '成色',
        weight: '重量（克）',
        enterWeight: '输入重量（克）',
        globalGoldPrice: '全球黄金价格（美元/盎司）',
        type: '资产类型',
        currency: '货币',
        currentPrice: '当前价格',
        enterValue: '输入价值',
        
        // Results
        valueInUSD: '美元价值：',
        valueInLocal: '本地货币价值：',
        pricePerGram: '每克价格：',
        totalValue: '总价值：',
        nisab: '天课门槛：',
        zakatAmount: '天课金额（2.5%）：',
        
        // Settings
        language: '语言',
        languageDesc: '选择应用语言',
        darkMode: '深色模式',
        darkModeDesc: '启用深色模式',
        subscription: '订阅',
        free: '免费',
        upgrade: '🚀 升级',
        verifyPrices: '验证价格准确性',
        verifyPricesDesc: '将我们的价格与可靠来源进行比较',
        
        // Ticker
        ticker1: '📈 专业价格追踪器',
        ticker2: '全球金融市场价格实时追踪',
        ticker3: '100% 真实数据',
        ticker4: '每5分钟更新',
        
        // Karat options
        karat24: '24K（纯金）',
        karat22: '22K',
        karat21: '21K',
        karat18: '18K',
        karat14: '14K',
        karat10: '10K',
        
        // Metals
        gold: '黄金',
        silver: '白银',
        
        // Time
        minutes: '分钟',
        
        // Ads
        adTitle: '🎯 支持我们的开发',
        adContent: '立即订阅以获得高级分析和即时通知！'
    },
    hi: {
        // App
        appTitle: 'पेशेशनल प्राइस ट्रैकर',
        appSubtitle: 'वैश्विक वित्तीय बाज़ार की कीमतों का लाइव ट्रैकिंग',
        appDescription: 'मुद्रा, धातु और क्रिप्टोकरेंसी कीमतों को ट्रैक करने के लिए पेशेशनल ऐप',
        
        // Navigation
        currencies: 'मुद्राएं',
        metals: 'धातुएं',
        crypto: 'क्रिप्टोकरेंसी',
        goldCalculator: 'सोना कैलक्यूलेटर',
        zakatCalculator: 'ज़कात कैलक्यूलेटर',
        settings: 'सेटिंग्स',
        
        // Status
        connected: 'जुड़ा हुआ',
        offline: 'ऑफलाइन',
        loading: 'लोड हो रहा है...',
        lastUpdate: 'आखिरी अपडेट',
        
        // Sections
        loadingCurrencies: 'विनिमय दरें लोड हो रही हैं...',
        loadingMetals: 'धातु कीमतें लोड हो रही हैं...',
        loadingCrypto: 'क्रिप्टो कीमतें लोड हो रही हैं...',
        
        // Calculator
        goldCalculatorDesc: 'कैरेट और वजन के अनुसार सोने का मूल्य कैलक्यूलेट करें',
        zakatCalculatorDesc: 'सोने, चांदी और मुद्राओं के लिए ज़कात कैलक्यूलेट करें',
        calculate: 'मूल्य कैलक्यूलेट करें',
        calculateZakat: 'ज़कात कैलक्यूलेट करें',
        result: 'परिणाम',
        
        // Inputs
        country: 'देश',
        karat: 'कैरेट',
        weight: 'वजन (ग्राम)',
        enterWeight: 'ग्राम में वजन दर्ज करें',
        globalGoldPrice: 'वैश्विक सोने की कीमत (डॉलर/औंस)',
        type: 'संपत्ति प्रकार',
        currency: 'मुद्रा',
        currentPrice: 'वर्तमान कीमत',
        enterValue: 'मूल्य दर्ज करें',
        
        // Results
        valueInUSD: 'डॉलर में मूल्य:',
        valueInLocal: 'स्थानीय मुद्रा में मूल्य:',
        pricePerGram: 'प्रति ग्राम कीमत:',
        totalValue: 'कुल मूल्य:',
        nisab: 'निसाब:',
        zakatAmount: 'ज़कात राशि (2.5%):',
        
        // Settings
        language: 'भाषा',
        languageDesc: 'ऐप भाषा चुनें',
        darkMode: 'डार्क मोड',
        darkModeDesc: 'डार्क मोड सक्षम करें',
        subscription: 'सदस्यता',
        free: 'मुफ़्त',
        upgrade: '🚀 अपग्रेड',
        verifyPrices: 'मूल्य सटीकता सत्यापित करें',
        verifyPricesDesc: 'हमारी कीमतों की विश्वसनीय स्रोतों से तुलना करें',
        
        // Ticker
        ticker1: '📈 पेशेशनल प्राइस ट्रैकर',
        ticker2: 'वैश्विक वित्तीय बाज़ार कीमतों का लाइव ट्रैकिंग',
        ticker3: '100% वास्तविक डेटा',
        ticker4: 'हर 5 मिनट में अपडेट',
        
        // Karat options
        karat24: '24 कैरेट (शुद्ध सोना)',
        karat22: '22 कैरेट',
        karat21: '21 कैरेट',
        karat18: '18 कैरेट',
        karat14: '14 कैरेट',
        karat10: '10 कैरेट',
        
        // Metals
        gold: 'सोना',
        silver: 'चांदी',
        
        // Time
        minutes: 'मिनट',
        
        // Ads
        adTitle: '🎯 हमारे विकास का समर्थन करें',
        adContent: 'उन्नत विश्लेषण और तत्काल सूचनाओं के लिए अभी सदस्यता लें!'
    }
};

// Translation function
function t(key) {
    return translations[currentLanguage]?.[key] || translations.ar[key] || key;
}

// Enhanced language change function
function changeLanguage() {
    const select = document.getElementById('languageSelect');
    const newLanguage = select.value;
    
    if (!translations[newLanguage]) {
        console.error('Language not supported:', newLanguage);
        return;
    }
    
    // Update global language variable
    currentLanguage = newLanguage;
    settings.language = newLanguage;
    
    // Update document direction
    const isRTL = ['ar', 'fa', 'he'].includes(newLanguage);
    document.documentElement.lang = newLanguage;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    
    // Save settings
    localStorage.setItem('settings', JSON.stringify(settings));
    
    // Update all translatable elements
    updateAllTranslations();
    
    // Update navigation buttons
    updateNavigationTranslations();
    
    // Update calculator placeholders
    updateCalculatorPlaceholders();
    
    // Update page title and meta
    updatePageMetadata();
    
    console.log('✅ Language changed to:', newLanguage);
}

// Update all translatable elements
function updateAllTranslations() {
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = t(key);
        
        if (element.tagName === 'INPUT' && element.type === 'placeholder') {
            element.placeholder = translation;
        } else {
            element.textContent = translation;
        }
    });
    
    // Update option elements
    document.querySelectorAll('option[data-translate]').forEach(option => {
        const key = option.getAttribute('data-translate');
        option.textContent = t(key);
    });
    
    // Update calculator labels
    updateCalculatorLabels();
}

// Update navigation translations
function updateNavigationTranslations() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        const tabName = btn.getAttribute('data-tab');
        const textSpan = btn.querySelector('.nav-text');
        if (textSpan && tabName) {
            textSpan.textContent = t(tabName);
        }
    });
}

// Update calculator placeholders
function updateCalculatorPlaceholders() {
    const placeholders = {
        'goldWeight': 'enterWeight',
        'zakatAmount': 'enterValue'
    };
    
    Object.entries(placeholders).forEach(([inputId, translationKey]) => {
        const input = document.getElementById(inputId);
        if (input) {
            input.placeholder = t(translationKey);
        }
    });
}

// Update calculator labels
function updateCalculatorLabels() {
    // Update gold calculator labels
    const zakatAmountLabel = document.getElementById('zakatAmountLabel');
    if (zakatAmountLabel) {
        const zakatType = document.getElementById('zakatType')?.value;
        if (zakatType === 'gold' || zakatType === 'silver') {
            zakatAmountLabel.textContent = t('weight');
        } else {
            zakatAmountLabel.textContent = t('amount');
        }
    }
}

// Update page metadata
function updatePageMetadata() {
    // Update title
    const titleElement = document.querySelector('title');
    if (titleElement) {
        titleElement.textContent = t('appTitle');
    }
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', t('appDescription'));
    }
}

// Initialize app with language
document.addEventListener('DOMContentLoaded', function() {
    // Set initial language
    document.getElementById('languageSelect').value = currentLanguage;
    
    // Apply initial translations
    updateAllTranslations();
    updateNavigationTranslations();
    updatePageMetadata();
    
    // Initialize the rest of the app
    initializeApp();
    loadAllData();
    setupEventListeners();
    populateCurrencySelects();
    updateMarketOverview();
    applySettings();
    startSmartUpdateSystem();
    updateSubscriptionUI();
    showSubscriptionPrompt();
    
    // Set initial language direction
    const isRTL = ['ar', 'fa', 'he'].includes(currentLanguage);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    
    console.log('🚀 App initialized with language:', currentLanguage);
});

// Keep the rest of the app.js functions as they are...
// (API functions, calculator functions, etc.)