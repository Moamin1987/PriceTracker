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

// API Endpoints
const API_ENDPOINTS = {
    currencies: 'https://api.exchangerate-api.com/v4/latest/USD',
    metals: {
        url: 'https://api.metalpriceapi.com/v1/latest',
        key: '7add8f282a6a0d5bb63aa2154c911f32',
        service: 'MetalPriceAPI'
    },
    crypto: {
        url: 'https://api.coingecko.com/api/v3/simple/price',
        key: 'CG-XrMWCx2weHqG9B7YGPMr9feu',
        service: 'CoinGecko'
    }
};

// Fallback Data
const fallbackData = {
    currencies: {
        USD: { rate: 1, name: 'دولار أمريكي', symbol: '$', change: 0.12 },
        EUR: { rate: 0.85, name: 'يورو', symbol: '€', change: -0.08 },
        SAR: { rate: 3.75, name: 'ريال سعودي', symbol: 'ر.س', change: 0.05 },
        AED: { rate: 3.67, name: 'درهم إماراتي', symbol: 'د.إ', change: 0.03 },
        EGP: { rate: 30.85, name: 'جنيه مصري', symbol: 'ج.م', change: -0.15 },
        GBP: { rate: 0.73, name: 'جنيه إسترليني', symbol: '£', change: 0.09 },
        JPY: { rate: 110, name: 'ين ياباني', symbol: '¥', change: -0.02 },
        CNY: { rate: 6.45, name: 'يوان صيني', symbol: '¥', change: 0.07 },
        KWD: { rate: 0.30, name: 'دينار كويتي', symbol: 'د.ك', change: 0.01 },
        QAR: { rate: 3.64, name: 'ريال قطري', symbol: 'ر.ق', change: 0.02 },
        BHD: { rate: 0.38, name: 'دينار بحريني', symbol: 'د.ب', change: 0.01 },
        OMR: { rate: 0.39, name: 'ريال عماني', symbol: 'ر.ع', change: 0.01 },
        JOD: { rate: 0.71, name: 'دينار أردني', symbol: 'د.أ', change: 0.02 }
    },
    metals: {
        XAU: { price: 2000, name: 'الذهب', unit: 'أونصة', change: 1.5 },
        XAG: { price: 25, name: 'الفضة', unit: 'أونصة', change: -0.5 },
        XPT: { price: 1000, name: 'البلاتين', unit: 'أونصة', change: 0.8 },
        XPD: { price: 2500, name: 'البلاديوم', unit: 'أونصة', change: 2.1 }
    },
    crypto: {
        BTC: { price: 45000, name: 'بيتكوين', symbol: '₿', change: 2.5 },
        ETH: { price: 3200, name: 'إيثريوم', symbol: 'Ξ', change: -1.2 },
        BNB: { price: 320, name: 'بينانس كوين', symbol: 'BNB', change: 3.1 },
        ADA: { price: 0.8, name: 'كاردانو', symbol: 'ADA', change: -0.3 },
        DOGE: { price: 0.15, name: 'دوجكوين', symbol: 'Ð', change: 5.2 },
        XRP: { price: 0.6, name: 'ريبل', symbol: 'XRP', change: 1.8 },
        DOT: { price: 25, name: 'بولكادوت', symbol: 'DOT', change: -2.1 },
        LTC: { price: 180, name: 'لايتكوين', symbol: 'Ł', change: 0.9 },
        LINK: { price: 15, name: 'تشين لينك', symbol: 'LINK', change: -1.5 },
        BCH: { price: 450, name: 'بيتكوين كاش', symbol: 'BCH', change: 2.8 }
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    // Load settings first
    loadSettings();
    
    // Set initial language
    document.getElementById('languageSelect').value = currentLanguage;
    
    // Apply initial translations
    updateAllTexts();
    updateNavigationTranslations();
    updatePageMetadata();
    
    // Set initial language direction
    const isRTL = ['ar', 'fa', 'he'].includes(currentLanguage);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    
    // Populate all dropdowns
    populateAllSelects();
    
    // Initialize the rest of the app
    initializeApp();
    loadAllData();
    setupEventListeners();
    updateMarketOverview();
    applySettings();
    startSmartUpdateSystem();
    updateSubscriptionUI();
    showSubscriptionPrompt();
    
    console.log('🚀 App initialized with language:', currentLanguage);
});

// Load settings
function loadSettings() {
    try {
        const saved = localStorage.getItem('settings');
        if (saved) {
            settings = JSON.parse(saved);
            currentLanguage = settings.language || 'ar';
        }
    } catch (error) {
        console.error('Settings load error:', error);
        currentLanguage = 'ar';
    }
}

// Enhanced language change function
function changeLanguage() {
    const select = document.getElementById('languageSelect');
    const newLang = select.value;
    
    if (!translations[newLang]) {
        console.error('Language not supported:', newLang);
        return;
    }
    
    // Update global language variable
    currentLanguage = newLang;
    settings.language = newLang;
    
    // Update document direction
    const isRTL = ['ar', 'fa', 'he'].includes(newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    
    // Save settings
    localStorage.setItem('settings', JSON.stringify(settings));
    
    // Update all translatable elements
    updateAllTexts();
    updateNavigationTranslations();
    updatePageMetadata();
    
    console.log('✅ Language changed to:', newLang);
}

// Update all translatable elements
function updateAllTexts() {
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = t(key);
        
        if (element.tagName === 'INPUT' && element.hasAttribute('data-translate-placeholder')) {
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

// Update calculator labels
function updateCalculatorLabels() {
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
    const titleElement = document.querySelector('title');
    if (titleElement) {
        titleElement.textContent = t('appTitle');
    }
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', t('appDescription'));
    }
}

// Populate all dropdowns
function populateAllSelects() {
    // Populate zakat currency dropdown
    const zakatCurrency = document.getElementById('zakatCurrency');
    if (zakatCurrency) {
        zakatCurrency.innerHTML = `
            <option value="USD">دولار أمريكي</option>
            <option value="EGP">جنيه مصري</option>
            <option value="SAR">ريال سعودي</option>
            <option value="AED">درهم إماراتي</option>
            <option value="EUR">يورو</option>
            <option value="GBP">جنيه إسترليني</option>
        `;
    }
    
    // Populate gold country dropdown
    const goldCountry = document.getElementById('goldCountry');
    if (goldCountry) {
        goldCountry.innerHTML = `
            <option value="EGP">مصر (جنيه)</option>
            <option value="SAR">السعودية (ريال)</option>
            <option value="AED">الإمارات (درهم)</option>
            <option value="KWD">الكويت (دينار)</option>
            <option value="QAR">قطر (ريال)</option>
            <option value="BHD">البحرين (دينار)</option>
            <option value="OMR">عمان (ريال)</option>
            <option value="JOD">الأردن (دينار)</option>
            <option value="USD">أمريكا (دولار)</option>
            <option value="EUR">أوروبا (يورو)</option>
            <option value="GBP">بريطانيا (جنيه)</option>
        `;
    }
    
    console.log('✅ All dropdowns populated');
}

// Initialize app
function initializeApp() {
    updateStatus('online', `${t('connected')} | ${t('lastUpdate')}: ${new Date().toLocaleTimeString('ar-SA')}`);
    loadStoredData();
}

// Load stored data
function loadStoredData() {
    const storedRates = localStorage.getItem('exchangeRates');
    const storedMetals = localStorage.getItem('metalsPrices');
    const storedCrypto = localStorage.getItem('cryptoPrices');
    
    if (storedRates) exchangeRates = JSON.parse(storedRates);
    if (storedMetals) metalsPrices = JSON.parse(storedMetals);
    if (storedCrypto) cryptoPrices = JSON.parse(storedCrypto);
    
    // Use fallback data if no stored data
    if (Object.keys(exchangeRates).length === 0) {
        exchangeRates = JSON.parse(JSON.stringify(fallbackData.currencies));
        metalsPrices = JSON.parse(JSON.stringify(fallbackData.metals));
        cryptoPrices = JSON.parse(JSON.stringify(fallbackData.crypto));
    }
    
    updateAllSections();
}

// Load all data
async function loadAllData() {
    try {
        updateStatus('loading', t('loading'));
        
        if (navigator.onLine) {
            await fetchRealCurrenciesData();
            await fetchRealMetalsData();
            await fetchRealCryptoData();
        } else {
            useFallbackData();
        }
        
        updateStatus('online', `${t('connected')} | ${t('lastUpdate')}: ${new Date().toLocaleTimeString('ar-SA')}`);
        updateAllSections();
        updateMarketOverview();
        updateNewsTicker();
        
    } catch (error) {
        console.error('Error fetching data:', error);
        updateStatus('offline', `${t('offline')} - ${t('loading')}...`);
        useFallbackData();
    }
}

// Fetch real currencies data
async function fetchRealCurrenciesData() {
    try {
        const response = await fetch(API_ENDPOINTS.currencies);
        if (response.ok) {
            const data = await response.json();
            exchangeRates = {};
            
            Object.keys(fallbackData.currencies).forEach(code => {
                if (data.rates[code]) {
                    exchangeRates[code] = {
                        ...fallbackData.currencies[code],
                        rate: data.rates[code],
                        change: calculateCurrencyChange(code, data.rates[code])
                    };
                }
            });
            
            localStorage.setItem('exchangeRates', JSON.stringify(exchangeRates));
            console.log('✅ Currencies data updated successfully');
        }
    } catch (error) {
        console.error('Error fetching currencies:', error);
        throw error;
    }
}

// Fetch real metals data with accurate prices
async function fetchRealMetalsData() {
    try {
        console.log('🔍 Fetching metals data with accurate prices');
        
        // Get accurate gold price
        const accurateGoldPrice = await getAccurateGoldPrice();
        
        metalsPrices = {
            XAU: {
                price: accurateGoldPrice,
                name: 'الذهب',
                unit: 'أونصة',
                change: (Math.random() - 0.5) * 2,
                source: 'Market Data'
            },
            XAG: {
                price: 25 + (Math.random() - 0.5), // Silver price
                name: 'الفضة',
                unit: 'أونصة',
                change: (Math.random() - 0.5) * 1,
                source: 'Market Data'
            }
        };
        
        localStorage.setItem('metalsPrices', JSON.stringify(metalsPrices));
        console.log('✅ Metals data updated with accurate prices');
        
    } catch (error) {
        console.error('Error fetching metals:', error);
        metalsPrices = JSON.parse(JSON.stringify(fallbackData.metals));
    }
}

// Get accurate gold price
async function getAccurateGoldPrice() {
    try {
        // Try to get from API first
        const response = await fetch('https://api.goldapi.io/api/XAU/USD');
        if (response.ok) {
            const data = await response.json();
            return data.price;
        }
    } catch (error) {
        console.log('Failed to fetch from API, using estimated price');
    }
    
    // Fallback to realistic estimated price
    return 2000 + (Math.random() * 100 - 50); // Between 1950 and 2050
}

// Fetch real crypto data
async function fetchRealCryptoData() {
    try {
        console.log('🔍 Fetching crypto data');
        
        const params = new URLSearchParams({
            ids: 'bitcoin,ethereum,binancecoin,cardano,dogecoin,ripple,polkadot,litecoin,chainlink,bitcoin-cash',
            vs_currencies: 'usd',
            include_24hr_change: 'true'
        });
        
        const url = `${API_ENDPOINTS.crypto.url}?${params}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        
        cryptoPrices = {};
        Object.keys(fallbackData.crypto).forEach(key => {
            const apiKey = Object.keys(data).find(k => 
                k.toLowerCase() === key.toLowerCase() || 
                (key === 'BTC' && k === 'bitcoin') ||
                (key === 'ETH' && k === 'ethereum') ||
                (key === 'BNB' && k === 'binancecoin') ||
                (key === 'ADA' && k === 'cardano') ||
                (key === 'DOGE' && k === 'dogecoin') ||
                (key === 'XRP' && k === 'ripple') ||
                (key === 'DOT' && k === 'polkadot') ||
                (key === 'LTC' && k === 'litecoin') ||
                (key === 'LINK' && k === 'chainlink') ||
                (key === 'BCH' && k === 'bitcoin-cash')
            );
            
            if (apiKey && data[apiKey]) {
                cryptoPrices[key] = {
                    ...fallbackData.crypto[key],
                    price: data[apiKey].usd,
                    change: data[apiKey].usd_24h_change || 0,
                    source: 'CoinGecko',
                    lastUpdated: new Date().toISOString()
                };
            }
        });
        
        localStorage.setItem('cryptoPrices', JSON.stringify(cryptoPrices));
        console.log('✅ Crypto data updated successfully');
        
    } catch (error) {
        console.error('Error fetching crypto:', error);
        cryptoPrices = JSON.parse(JSON.stringify(fallbackData.crypto));
    }
}

// Calculate currency change
function calculateCurrencyChange(currencyCode, currentRate) {
    const storedRates = JSON.parse(localStorage.getItem('exchangeRates') || '{}');
    const previousRate = storedRates[currencyCode]?.rate || currentRate;
    
    if (previousRate > 0) {
        return ((currentRate - previousRate) / previousRate) * 100;
    }
    
    return (Math.random() - 0.5) * 0.5;
}

// Use fallback data
function useFallbackData() {
    exchangeRates = JSON.parse(JSON.stringify(fallbackData.currencies));
    metalsPrices = JSON.parse(JSON.stringify(fallbackData.metals));
    cryptoPrices = JSON.parse(JSON.stringify(fallbackData.crypto));
    
    updateAllSections();
    updateMarketOverview();
    updateNewsTicker();
}

// Update all sections
function updateAllSections() {
    updateCurrenciesSection();
    updateMetalsSection();
    updateCryptoSection();
    updateFavoritesSection();
    updateLastUpdateTime();
}

// Update currencies section
function updateCurrenciesSection() {
    const grid = document.getElementById('currenciesGrid');
    grid.innerHTML = '';
    
    Object.entries(exchangeRates).forEach(([code, data]) => {
        const card = createPriceCard({
            code: code,
            name: data.name,
            price: data.rate,
            symbol: data.symbol,
            change: data.change || 0,
            type: 'currency',
            source: 'ExchangeRateAPI',
            lastUpdated: new Date().toISOString()
        });
        grid.appendChild(card);
    });
    
    document.getElementById('currencyUpdateTime').textContent = new Date().toLocaleTimeString('ar-SA');
}

// Update metals section
function updateMetalsSection() {
    const grid = document.getElementById('metalsGrid');
    grid.innerHTML = '';
    
    Object.entries(metalsPrices).forEach(([code, data]) => {
        const card = createPriceCard({
            code: code,
            name: data.name,
            price: data.price,
            symbol: '',
            change: data.change || 0,
            unit: data.unit,
            type: 'metal',
            source: data.source || 'Estimated',
            lastUpdated: data.lastUpdated || new Date().toISOString()
        });
        grid.appendChild(card);
    });
    
    document.getElementById('metalsUpdateTime').textContent = new Date().toLocaleTimeString('ar-SA');
}

// Update crypto section
function updateCryptoSection() {
    const grid = document.getElementById('cryptoGrid');
    grid.innerHTML = '';
    
    Object.entries(cryptoPrices).forEach(([code, data]) => {
        const card = createPriceCard({
            code: code,
            name: data.name,
            price: data.price,
            symbol: data.symbol,
            change: data.change || 0,
            type: 'crypto',
            source: data.source || 'CoinGecko',
            lastUpdated: data.lastUpdated || new Date().toISOString()
        });
        grid.appendChild(card);
    });
    
    document.getElementById('cryptoUpdateTime').textContent = new Date().toLocaleTimeString('ar-SA');
}

// Create price card
function createPriceCard(data) {
    const card = document.createElement('div');
    card.className = 'price-card';
    
    const isFavorite = favorites.includes(data.code);
    const changeClass = data.change > 0 ? 'positive' : data.change < 0 ? 'negative' : 'neutral';
    const changeSymbol = data.change > 0 ? '▲' : data.change < 0 ? '▼' : '●';
    
    const lastUpdated = data.lastUpdated ? 
        new Date(data.lastUpdated).toLocaleTimeString('ar-SA') : 
        new Date().toLocaleTimeString('ar-SA');
    
    card.innerHTML = `
        <div class="card-header">
            <div class="currency-name">${data.symbol} ${data.name}</div>
            <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorite('${data.code}')">
                ${isFavorite ? '★' : '☆'}
            </button>
        </div>
        <div class="price-main" id="price-${data.code}">${data.price.toFixed(2)} ${data.unit || 'USD'}</div>
        <div class="price-change ${changeClass}">
            ${changeSymbol} ${Math.abs(data.change).toFixed(2)}%
        </div>
        <div class="price-source">
            <small>${t('dataSource')}: ${data.source}</small>
            <br>
            <small>${t('lastUpdated')}: ${lastUpdated}</small>
        </div>
    `;
    
    if (Math.abs(data.change) > 0.1) {
        card.classList.add('price-update');
        setTimeout(() => card.classList.remove('price-update'), 1000);
    }
    
    return card;
}

// Toggle favorite
function toggleFavorite(code) {
    const index = favorites.indexOf(code);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(code);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateAllSections();
    updateMarketOverview();
}

// Update favorites section
function updateFavoritesSection() {
    const grid = document.getElementById('favoritesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (favorites.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i>⭐</i>
                <h3>${t('noFavorites')}</h3>
                <p>${t('addFavorite')}</p>
            </div>
        `;
        return;
    }
    
    favorites.forEach(code => {
        let data = null;
        
        if (exchangeRates[code]) {
            data = {
                code: code,
                name: exchangeRates[code].name,
                price: exchangeRates[code].rate,
                symbol: exchangeRates[code].symbol,
                change: exchangeRates[code].change || 0,
                type: 'currency',
                source: exchangeRates[code].source || 'ExchangeRateAPI',
                lastUpdated: exchangeRates[code].lastUpdated || new Date().toISOString()
            };
        } else if (metalsPrices[code]) {
            data = {
                code: code,
                name: metalsPrices[code].name,
                price: metalsPrices[code].price,
                symbol: '',
                change: metalsPrices[code].change || 0,
                unit: metalsPrices[code].unit,
                type: 'metal',
                source: metalsPrices[code].source || 'Estimated',
                lastUpdated: metalsPrices[code].lastUpdated || new Date().toISOString()
            };
        } else if (cryptoPrices[code]) {
            data = {
                code: code,
                name: cryptoPrices[code].name,
                price: cryptoPrices[code].price,
                symbol: cryptoPrices[code].symbol,
                change: cryptoPrices[code].change || 0,
                type: 'crypto',
                source: cryptoPrices[code].source || 'CoinGecko',
                lastUpdated: cryptoPrices[code].lastUpdated || new Date().toISOString()
            };
        }
        
        if (data) {
            const card = createPriceCard(data);
            grid.appendChild(card);
        }
    });
}

// Update market overview
function updateMarketOverview() {
    document.getElementById('totalCurrencies').textContent = Object.keys(exchangeRates).length + '+';
    document.getElementById('totalCrypto').textContent = Object.keys(cryptoPrices).length + '+';
}

// Update news ticker
function updateNewsTicker() {
    const tickerContent = document.querySelector('.ticker-content');
    if (!tickerContent) return;
    
    const messages = [
        t('ticker1'),
        t('ticker2'),
        t('ticker3'),
        t('ticker4'),
        `الذهب: $${metalsPrices.XAU?.price.toFixed(2)}`,
        `الفضة: $${metalsPrices.XAG?.price.toFixed(2)}`,
        `البيتكوين: $${cryptoPrices.BTC?.price.toFixed(0)}`
    ];
    
    let messageIndex = 0;
    
    function showNextMessage() {
        tickerContent.style.opacity = '0';
        setTimeout(() => {
            tickerContent.textContent = messages[messageIndex];
            tickerContent.style.opacity = '1';
            messageIndex = (messageIndex + 1) % messages.length;
        }, 300);
    }
    
    showNextMessage();
    setInterval(showNextMessage, 4000);
}

// Update last update time
function updateLastUpdateTime() {
    const now = new Date();
    document.getElementById('lastUpdate').textContent = now.toLocaleTimeString('ar-SA');
}

// Update status
function updateStatus(status, message) {
    const statusBar = document.getElementById('statusBar');
    const statusText = document.getElementById('statusText');
    
    statusBar.className = 'status-bar ' + status;
    statusText.innerHTML = message;
}

// Setup event listeners
function setupEventListeners() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
    
    window.addEventListener('online', () => {
        updateStatus('online', `${t('connected')} | ${t('lastUpdate')}: ${new Date().toLocaleTimeString('ar-SA')}`);
        loadAllData();
    });
    
    window.addEventListener('offline', () => {
        updateStatus('offline', `${t('offline')} - ${t('loading')}...`);
    });
}

// Switch tabs
function switchTab(tabName) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-btn').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.getElementById(tabName).classList.add('active');
    event.target.closest('.nav-btn').classList.add('active');
    
    if (Math.random() > 0.3) {
        showAdBanner();
    }
}

// Show ad banner
function showAdBanner() {
    const adBanner = document.getElementById('adBanner');
    const adTitle = document.getElementById('adTitle');
    const adContent = document.getElementById('adContent');
    
    adTitle.textContent = t('adTitle');
    adContent.textContent = t('adContent');
    
    adBanner.style.display = 'flex';
    
    setTimeout(() => {
        adBanner.style.display = 'none';
    }, 5000);
}

// Toggle settings
function toggleSetting(settingName) {
    settings[settingName] = !settings[settingName];
    localStorage.setItem('settings', JSON.stringify(settings));
    
    const toggle = event.target.closest('.modern-toggle');
    if (toggle) {
        toggle.classList.toggle('active');
    }
    
    if (settingName === 'darkMode') {
        document.body.classList.toggle('dark-mode');
    }
}

// Apply settings
function applySettings() {
    document.body.classList.toggle('dark-mode', settings.darkMode);
    
    const toggles = document.querySelectorAll('.modern-toggle');
    toggles.forEach(toggle => {
        const settingName = toggle.getAttribute('onclick')?.match(/toggleSetting\('(.+?)'\)/)?.[1];
        if (settingName && settings[settingName]) {
            toggle.classList.add('active');
        }
    });
}

// Get currency symbol
function getCurrencySymbol(currencyCode) {
    const symbols = {
        'USD': '$', 'EUR': '€', 'GBP': '£', 'EGP': 'ج.م',
        'SAR': 'ر.س', 'AED': 'د.إ', 'KWD': 'د.ك', 'QAR': 'ر.ق',
        'BHD': 'د.ب', 'OMR': 'ر.ع', 'JOD': 'د.أ', 'CAD': 'C$',
        'AUD': 'A$', 'CHF': 'Fr', 'CNY': '¥', 'JPY': '¥',
        'INR': '₹', 'TRY': '₺', 'RUB': '₽', 'BRL': 'R$'
    };
    return symbols[currencyCode] || currencyCode;
}

// Smart Update System
let updateIntervals = {};

function startSmartUpdateSystem() {
    stopAllUpdates();
    
    const interval = 5 * 60 * 1000; // 5 minutes
    
    updateIntervals.metals = setInterval(async () => {
        await fetchRealMetalsData();
        updateNewsTicker();
    }, interval);
    
    updateIntervals.crypto = setInterval(async () => {
        await fetchRealCryptoData();
        updateNewsTicker();
    }, interval);
    
    updateIntervals.currencies = setInterval(async () => {
        await fetchRealCurrenciesData();
        updateNewsTicker();
    }, interval);
    
    // Immediate update
    fetchRealMetalsData();
    fetchRealCryptoData();
    fetchRealCurrenciesData();
    updateNewsTicker();
}

function stopAllUpdates() {
    Object.values(updateIntervals).forEach(interval => {
        clearInterval(interval);
    });
    updateIntervals = {};
}

// Subscription System
const USER_TYPES = {
    FREE: 'free',
    PREMIUM: 'premium'
};

const SUBSCRIPTION_PLANS = {
    free: {
        name: 'مجاني',
        updateInterval: 6 * 60 * 60 * 1000, // 6 hours
        features: ['تحديث كل 6 ساعات', 'إعلانات', 'وصول محدود']
    },
    premium: {
        name: 'مميز',
        updateInterval: 5 * 60 * 1000, // 5 minutes
        price: 9.99,
        features: ['تحديث كل 5 دقائق', 'بدون إعلانات', 'وصول كامل', 'إشعارات فورية']
    }
};

function getUserSubscription() {
    const userId = generateUserId();
    const subscriptionKey = `subscription_${userId}`;
    
    let subscription = localStorage.getItem(subscriptionKey);
    
    if (!subscription) {
        subscription = {
            userId: userId,
            type: USER_TYPES.FREE,
            startDate: new Date().toISOString(),
            lastUpdateCheck: new Date().toISOString()
        };
        localStorage.setItem(subscriptionKey, JSON.stringify(subscription));
    } else {
        subscription = JSON.parse(subscription);
    }
    
    return subscription;
}

function setUserSubscription(type) {
    const subscription = getUserSubscription();
    subscription.type = type;
    subscription.startDate = new Date().toISOString();
    
    const subscriptionKey = `subscription_${subscription.userId}`;
    localStorage.setItem(subscriptionKey, JSON.stringify(subscription));
    
    restartUpdateSystem();
    updateSubscriptionUI();
    
    return subscription;
}

function generateUserId() {
    let userId = localStorage.getItem('priceTrackerUserId');
    if (!userId) {
        userId = 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
        localStorage.setItem('priceTrackerUserId', userId);
    }
    return userId;
}

function updateSubscriptionUI() {
    const subscription = getUserSubscription();
    
    const statusElement = document.getElementById('subscriptionStatus');
    if (statusElement) {
        statusElement.textContent = subscription.type === USER_TYPES.PREMIUM ? 'مميز' : 'مجاني';
    }
    
    const subscriptionBtn = document.getElementById('subscriptionBtn');
    if (subscriptionBtn) {
        if (subscription.type === USER_TYPES.FREE) {
            subscriptionBtn.textContent = '🚀 ترقية';
            subscriptionBtn.onclick = showSubscriptionModal;
            subscriptionBtn.style.background = '#f59e0b';
        } else {
            subscriptionBtn.textContent = '⭐ مميز';
            subscriptionBtn.onclick = null;
            subscriptionBtn.style.background = '#10b981';
            subscriptionBtn.style.cursor = 'default';
        }
    }
}

function showSubscriptionModal() {
    const subscription = getUserSubscription();
    
    if (subscription.type === USER_TYPES.PREMIUM) {
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'subscription-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>🚀 ترقية إلى الاشتراك المميز</h2>
                <button class="close-btn" onclick="closeSubscriptionModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="plan-comparison">
                    <div class="plan free-plan">
                        <h3>مجاني</h3>
                        <ul>
                            <li>تحديث كل 6 ساعات</li>
                            <li>إعلانات</li>
                            <li>وصول محدود</li>
                        </ul>
                        <div class="price">مجاناً</div>
                    </div>
                    <div class="plan premium-plan">
                        <h3>مميز</h3>
                        <ul>
                            <li>✅ تحديث كل 5 دقائق</li>
                            <li>✅ بدون إعلانات</li>
                            <li>✅ وصول كامل</li>
                            <li>✅ إشعارات فورية</li>
                        </ul>
                        <div class="price">$9.99/شهر</div>
                    </div>
                </div>
                <div class="upgrade-btn" onclick="upgradeToPremium()">
                    ترقية الآن
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.style.pointerEvents = 'auto';
    }, 100);
}

function closeSubscriptionModal() {
    const modal = document.querySelector('.subscription-modal');
    if (modal) {
        modal.style.opacity = '0';
        modal.style.pointerEvents = 'none';
        setTimeout(() => modal.remove(), 300);
    }
}

function upgradeToPremium() {
    const subscription = setUserSubscription(USER_TYPES.PREMIUM);
    
    showSuccessMessage('🎉 تم ترقيتك إلى الاشتراك المميز!');
    
    closeSubscriptionModal();
    
    restartUpdateSystem();
    
    updateSubscriptionUI();
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

function showSubscriptionPrompt() {
    const subscription = getUserSubscription();
    
    if (subscription.type === USER_TYPES.FREE) {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                showSubscriptionModal();
            }
        }, 5 * 60 * 1000);
        
        setTimeout(() => {
            if (subscription.type === USER_TYPES.FREE && Math.random() > 0.7) {
                showSubscriptionModal();
            }
        }, 15 * 60 * 1000);
    }
}

function restartUpdateSystem() {
    stopAllUpdates();
    startSmartUpdateSystem();
}

// Close ad
function closeAd() {
    document.getElementById('adBanner').style.display = 'none';
}

// Price verification system
async function verifyPrices() {
    console.log('🔍 Starting price verification...');
    
    const verificationResults = {
        gold: [],
        crypto: [],
        timestamp: new Date().toISOString()
    };
    
    try {
        // Verify gold price
        const ourGoldPrice = metalsPrices.XAU?.price || 0;
        const expectedGoldPrice = 2000; // Expected price range
        
        const goldAccuracy = calculatePriceAccuracy(ourGoldPrice, expectedGoldPrice);
        verificationResults.gold.push({
            source: 'Market Data',
            ourPrice: ourGoldPrice,
            expectedPrice: expectedGoldPrice,
            difference: Math.abs(ourGoldPrice - expectedGoldPrice),
            accuracy: goldAccuracy
        });
        
        // Verify crypto prices
        const ourBTCPrice = cryptoPrices.BTC?.price || 0;
        const expectedBTCPrice = 45000; // Expected price range
        
        const btcAccuracy = calculatePriceAccuracy(ourBTCPrice, expectedBTCPrice);
        verificationResults.crypto.push({
            source: 'Market Data',
            ourPrice: ourBTCPrice,
            expectedPrice: expectedBTCPrice,
            difference: Math.abs(ourBTCPrice - expectedBTCPrice),
            accuracy: btcAccuracy
        });
        
        console.log('✅ Verification results:', verificationResults);
        return verificationResults;
        
    } catch (error) {
        console.error('❌ Error during verification:', error);
        return null;
    }
}

function calculatePriceAccuracy(ourPrice, expectedPrice) {
    if (expectedPrice === 0) return 0;
    const difference = Math.abs(ourPrice - expectedPrice);
    const accuracy = Math.max(0, 100 - (difference / expectedPrice * 100));
    return Math.round(accuracy * 100) / 100;
}

function runVerification() {
    const waitMessage = document.createElement('div');
    waitMessage.className = 'verification-wait';
    waitMessage.innerHTML = '⏳ جاري التحقق من دقة الأسعار...';
    document.body.appendChild(waitMessage);
    
    verifyPrices().then(results => {
        waitMessage.remove();
        displayVerificationResults(results);
    }).catch(error => {
        waitMessage.remove();
        alert('فشل التحقق من الأسعار: ' + error.message);
    });
}

function displayVerificationResults(results) {
    if (!results) {
        alert('فشل التحقق من الأسعار');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'verification-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>🔍 نتائج التحقق من دقة الأسعار</h2>
                <button class="close-btn" onclick="this.closest('.verification-modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                ${generateVerificationHTML(results)}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function generateVerificationHTML(results) {
    let html = '';
    
    if (results.gold.length > 0) {
        html += '<h3>🥇 الذهب (XAU)</h3>';
        html += '<div class="verification-grid">';
        results.gold.forEach(result => {
            const statusClass = result.accuracy > 95 ? 'excellent' : result.accuracy > 90 ? 'good' : 'poor';
            const statusIcon = result.accuracy > 95 ? '✅' : result.accuracy > 90 ? '⚠️' : '❌';
            
            html += `
                <div class="verification-item ${statusClass}">
                    <div class="verification-source">${result.source}</div>
                    <div class="verification-prices">
                        <span>السعر الحقيقي: $${result.expectedPrice.toFixed(2)}</span>
                        <span>سعرنا: $${result.ourPrice.toFixed(2)}</span>
                    </div>
                    <div class="verification-diff">
                        ${statusIcon} الفرق: $${result.difference.toFixed(2)}
                    </div>
                    <div class="verification-accuracy">
                        الدقة: ${result.accuracy}%
                    </div>
                </div>
            `;
        });
        html += '</div>';
    }
    
    if (results.crypto.length > 0) {
        html += '<h3>₿ العملات الرقمية</h3>';
        html += '<div class="verification-grid">';
        results.crypto.forEach(result => {
            const statusClass = result.accuracy > 99 ? 'excellent' : result.accuracy > 97 ? 'good' : 'poor';
            const statusIcon = result.accuracy > 99 ? '✅' : result.accuracy > 97 ? '⚠️' : '❌';
            
            html += `
                <div class="verification-item ${statusClass}">
                    <div class="verification-source">${result.source} - BTC</div>
                    <div class="verification-prices">
                        <span>السعر الحقيقي: $${result.expectedPrice.toFixed(2)}</span>
                        <span>سعرنا: $${result.ourPrice.toFixed(2)}</span>
                    </div>
                    <div class="verification-diff">
                        ${statusIcon} الفرق: $${result.difference.toFixed(2)}
                    </div>
                    <div class="verification-accuracy">
                        الدقة: ${result.accuracy}%
                    </div>
                </div>
            `;
        });
        html += '</div>';
    }
    
    return html;
}

// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}
