export type Language = "en" | "hi";

export const translations: Record<Language, Record<string, string>> = {
    en: {
        // Header & Navigation
        "app.title": "Kisan Uddhar",
        "app.subtitle": "Credit Management App",
        "app.hero.title": "Digital Farmer Account System",
        "app.hero.subtitle": "Digital management of credit and trade",
        "header.backToHome": "Back to home",

        // Dashboard
        "dashboard.summary": "Summary",
        "dashboard.totalPending": "Total Pending",
        "dashboard.totalCollected": "Total Collected",
        "dashboard.netBalance": "Net Balance",
        "dashboard.farmers": "Farmers",
        "dashboard.vendors": "Vendors",
        "dashboard.farmersDesc": "Manage credit and accounts",
        "dashboard.vendorsDesc": "Track purchases and suppliers",

        // Farmers Page
        "farmers.title": "Farmers",
        "farmers.titlePending": "Farmers with Pending",
        "farmers.titleCollection": "Farmers with Collections",
        "farmers.subtitle": "Add and manage farmers",
        "farmers.subtitlePending": "Farmers with outstanding balance",
        "farmers.subtitleCollection": "Farmers from whom collection was made",
        "farmers.list": "Farmer List",
        "farmers.empty": "No farmers yet. Add your first farmer above.",
        "farmers.emptyPending": "No farmers with pending balance.",
        "farmers.emptyCollection": "No farmers with collections.",
        "farmers.clearFilter": "Clear Filter",
        "farmers.pending": "pending",

        // Add Farmer Form
        "form.addFarmer": "Add New Farmer",
        "form.name": "Full Name",
        "form.phone": "Phone Number",
        "form.village": "Village / Area",
        "form.aadhar": "Aadhar Number",
        "form.photo": "Photo",
        "form.addButton": "Add Farmer",
        "form.cancel": "Cancel",

        // Transactions
        "transaction.type": "Type",
        "transaction.amount": "Amount",
        "transaction.date": "Date",
        "transaction.note": "Note",
        "transaction.udhaar": "Udhaar (Credit)",
        "transaction.vasuli": "Vasuli (Debit)",
        "transaction.collection": "Collection",
        "transaction.history": "Transaction History",
        "transaction.addNew": "Add Transaction",

        // Button Texts
        "button.add": "Add",
        "button.edit": "Edit",
        "button.delete": "Delete",
        "button.save": "Save",
        "button.download": "Download",
        "button.export": "Export",
        "button.filter": "Filter",
        "button.close": "Close",
        "button.confirm": "Confirm",
        "button.cancel": "Cancel",

        // Language
        "language.select": "Select Language",
        "language.english": "English",
        "language.hindi": "हिन्दी",

        // Search
        "search.placeholder": "Search farmers by name or village...",
        "search.noResults": "No farmers found",

        // Vendors
        "vendors.title": "Vendors",
        "vendors.subtitle": "Manage vendors and suppliers",
        "vendors.addNew": "Add New Vendor",
        "vendors.list": "Vendor List",
        "vendors.empty": "No vendors yet. Add your first vendor above.",
        "vendor.name": "Vendor Name",
        "vendor.company": "Company Name",
        "vendor.balance": "Outstanding Balance",
    },
    hi: {
        // Header & Navigation
        "app.title": "किसान उद्धार",
        "app.subtitle": "क्रेडिट प्रबंधन ऐप",
        "app.hero.title": "किसान सेवा केंद्र - डिजिटल खाता",
        "app.hero.subtitle": "उधार और व्यापार का डिजिटल प्रबंधन",
        "header.backToHome": "होम पेज पर जाएं",

        // Dashboard
        "dashboard.summary": "सारांश",
        "dashboard.totalPending": "कुल बकाया",
        "dashboard.totalCollected": "कुल संग्रह",
        "dashboard.netBalance": "शुद्ध शेष",
        "dashboard.farmers": "किसान खाता",
        "dashboard.vendors": "वेंडर खाता",
        "dashboard.farmersDesc": "उधार और हिसाब का प्रबंधन करें",
        "dashboard.vendorsDesc": "खरीद और सप्लायर का हिसाब रखें",

        // Farmers Page
        "farmers.title": "किसान",
        "farmers.titlePending": "उधार वाले किसान",
        "farmers.titleCollection": "संग्रह किए गए किसान",
        "farmers.subtitle": "किसान जोड़ें और प्रबंधित करें",
        "farmers.subtitlePending": "जिन किसानों के पास बकाया है",
        "farmers.subtitleCollection": "जिन से संग्रह किया गया",
        "farmers.list": "किसान सूची",
        "farmers.empty": "अभी कोई किसान नहीं। ऊपर अपना पहला किसान जोड़ें।",
        "farmers.emptyPending": "कोई किसान बकाया के साथ नहीं।",
        "farmers.emptyCollection": "कोई किसान संग्रह के साथ नहीं।",
        "farmers.clearFilter": "फिल्टर हटाएं",
        "farmers.pending": "बकाया",

        // Add Farmer Form
        "form.addFarmer": "नया किसान जोड़ें",
        "form.name": "पूरा नाम",
        "form.phone": "फोन नंबर",
        "form.village": "गांव / क्षेत्र",
        "form.aadhar": "आधार नंबर",
        "form.photo": "फोटो",
        "form.addButton": "किसान जोड़ें",
        "form.cancel": "रद्द करें",

        // Transactions
        "transaction.type": "प्रकार",
        "transaction.amount": "रकम",
        "transaction.date": "तारीख",
        "transaction.note": "नोट",
        "transaction.udhaar": "उधार (क्रेडिट)",
        "transaction.vasuli": "वसूली (डेबिट)",
        "transaction.collection": "संग्रह",
        "transaction.history": "लेनदेन का इतिहास",
        "transaction.addNew": "लेनदेन जोड़ें",

        // Button Texts
        "button.add": "जोड़ें",
        "button.edit": "संपादित करें",
        "button.delete": "हटाएं",
        "button.save": "सहेजें",
        "button.download": "डाउनलोड करें",
        "button.export": "निर्यात करें",
        "button.filter": "फिल्टर",
        "button.close": "बंद करें",
        "button.confirm": "पुष्टि करें",
        "button.cancel": "रद्द करें",

        // Language
        "language.select": "भाषा चुनें",
        "language.english": "English",
        "language.hindi": "हिन्दी",

        // Search
        "search.placeholder": "नाम या गांव से किसान खोजें...",
        "search.noResults": "कोई किसान नहीं मिला",

        // Vendors
        "vendors.title": "वेंडर",
        "vendors.subtitle": "वेंडर और आपूर्तिकर्ता प्रबंधित करें",
        "vendors.addNew": "नया वेंडर जोड़ें",
        "vendors.list": "वेंडर सूची",
        "vendors.empty": "अभी कोई वेंडर नहीं। ऊपर अपना पहला वेंडर जोड़ें।",
        "vendor.name": "वेंडर का नाम",
        "vendor.company": "कंपनी का नाम",
        "vendor.balance": "बकाया राशि",
    },
};

export function t(key: string, language: Language = "en"): string {
    return translations[language]?.[key] || key;
}
