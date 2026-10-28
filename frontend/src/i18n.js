import i18n from "i18next";
import { initReactI18next } from "react-i18next";

/* ───────────────────────── ENGLISH ───────────────────────── */
const en = {
  brand: "Swami Om",
  fix: "Please enter your first name, last name, email, rating, and review.",

  nav: {
    home: "Home",
    about: "About Us",
    location: "Location",
    review: "Reviews",
    menu: "Frequent Menu",
    whatsapp: "WhatsApp Us",
    whatsappEnquiry: "📱 WhatsApp Enquiry",
    tagline: "Tiffin Service · Pune",
    toggleMenu: "Toggle menu",
    logoAlt: "Swami Om Tiffin Service Logo",
    language: "Language",
  },

  footer: {
    tagline: "Authentic Maharashtrian home cooking, delivered fresh.",
    rights: "All rights reserved.",
    quickLinks: "Quick Links",
    contact: "Contact Us",
  },

  // Pre-filled WhatsApp messages
  wa: {
    enquiry: "Hi Swami Om, I want to enquire about your tiffin service.",
    formEnquiry:
      "Hi Swami Om, I want to enquire about tiffin service.\nName: {{name}}\nContact: {{phone}}\nAddress: {{address}}\nPeople: {{people}}\nMeals: {{meals}}\nPlan: {{plan}}",
    menu: "Hi Swami Om, what is today's menu?",
    cateringEnquiry:
      "Hi Swami Om, I want to enquire about catering.\nName: {{name}}\nContact: {{phone}}\nAddress: {{address}}\nNumber of people: {{people}}\nFood type: {{foodType}}\nEvent date: {{date}}\nDescription: {{description}}",
    diet: "Hi Swami Om, I have a dietary requirement for my tiffin.",
    general: "Hi Swami Om, I would like to talk to you.",
  },

  /* ───────── HOME ───────── */
  home: {
    cateringForm: {
      title: "Catering Enquiry",
      subtitle: "Share your event details and we will confirm your catering requirements.",
      name: "Your name",
      phone: "Contact number",
      address: "Full event address",
      people: "Number of people",
      foodType: "Food preference",
      foodTypes: {
        veg: "Vegetarian",
        nonVeg: "Non-vegetarian",
        both: "Vegetarian and non-vegetarian",
      },
      date: "Event date",
      description: "Event details and requirements",
      descriptionPlaceholder: "Tell us about the event, menu, timing, or special requests.",
      submit: "Submit Catering Enquiry",
      close: "Close catering enquiry form",
    },
    enquiry: {
      title: "Tiffin Service Enquiry",
      subtitle: "Share your details and we will confirm availability on WhatsApp.",
      name: "Your name",
      phone: "Contact number",
      address: "Full delivery address",
      submit: "Submit to WhatsApp",
      close: "Close enquiry form",
    },
    hero: {
      badge: "🍲 Traditional Kitchen Warmth",
      title1: "Homemade Meals,",
      title2: "Made with Care.",
      desc: "Authentic Maharashtrian home cooking delivered to your doorstep. Fresh vegetarian and non-vegetarian meals made daily — आईच्या हातचं जेवण.",
      btnWhatsapp: "💬 WhatsApp Enquiry",
      btnAbout: "🙏 About Us",
      trust: {
        everyday: "Everyday Tiffin",
        fresh: "Fresh & Homestyle",
        catering: "Special Catering",
        rates: "Transparent Rates",
      },
      imgAlt: "Traditional Indian thali",
      freshDaily: "Freshly Prepared Daily",
      homestyle: "100% Homestyle",
    },

    services: {
      badge: "Tailored Kitchen Services",
      title: "Wholesome Meals For Every Daily Routine",
      primaryTag: "⭐ Primary Offering",
      primaryImgAlt: "Daily tiffin",
      primaryTitle: "Daily Tiffin Service",
      primaryMeals: "Lunch & Dinner",
      primaryDesc:
        "Regular wholesome meals for students, IT professionals, bachelors, and elderly families. Warm handmade chapati, home-churned dal, light seasonal sabzi, and fragrant rice. Transparent monthly & daily plans without long lock-ins.",
      f1: "Low-oil preparation",
      f2: "Custom spice levels",
      f3: "Pause / Resume flexibly",
      primaryCta: "Enquire for Tiffin →",
      cateringTag: "Advance Booking",
      cateringImgAlt: "Catering",
      cateringTitle: "Catering Services",
      cateringPax: "15 to 50 Pax",
      cateringDesc:
        "Food for housewarmings, birthday celebrations, poojas, and weekend gatherings. Warm, authentic party spreads with genuine mother's hand touch.",
      c1: "Bespoke Indian menus (North & South)",
      c2: "Fresh cold-pressed oils & hand-ground masalas",
      c3: "Minimum 48 hours advance notice required",
      cateringCta: "Plan Your Catering →",
    },

    dishes: {
      badge: "Authentic Indian Flavors",
      title: "Frequently Served Homestyle Dishes",
      menuOptions: "Veg & Non-Veg",
      askMenu: "💬 Ask Today's Menu via WhatsApp",
      noticeTitle: "Seasonal Daily Rotation",
      noticeBody:
        "Our kitchen runs strictly on seasonal bazaar sourcing without frozen preservatives. Contact us every morning by 10:00 AM to see today's curated lunch sabzis!",
      request: "Request in Plan",
      regular: {
        tag: "Frequently Served",
        title: "Regular Veg Thali",
        desc: "Fresh vegetarian thali options with chapati, dal, seasonal sabzi, rice, and rotating specials.",
        badge: "Balanced Everyday Nutrition",
      },
      thursday: {
        tag: "Thursday Special",
        title: "Special Thursday Veg Thali",
        desc: "3 Regular Chapati,Seasonal Sabzi,Pulao, and one sweet.",
        badge: "Thursday Veg Treat",
      },
      sabzi: {
        tag: "Availability Varies",
        title: "Homestyle Seasonal Sabzi",
        desc: "Daily rotations: Bhindi Masala, Aloo Sabzi, Masoor dal, or Lauki Chana Dal.",
        badge: "100% Market-Fresh Daily",
      },
      sunday: {
        tag: "Sunday Special",
        title: "Special Sunday Non-Veg Thali",
        desc: "A special non-vegetarian thali is available every Sunday exclusively for non-vegetarian customers.",
        badge: "For Non-Veg Customers Only",
      },
    },

    how: {
      badge: "Zero Hassle Experience",
      title: "Simple Steps to Fresh Home Food",
      desc: "No complicated app subscriptions or lock-ins. Direct, personal kitchen coordination.",
      s1: {
        title: "Tell Us Your Details",
        body: "Share your address, which meals you need (Lunch, Dinner, or both), dietary restrictions, and preferred starting date.",
        note: "📍 Check Delivery Coverage",
      },
      s2: {
        title: "We Discuss Menu & Pricing",
        body: "We confirm delivery logistics, share weekly menus, and provide a fair rate quote tailored to your distance.",
        note: "🧾 Honest, Transparent Estimates",
      },
      s3: {
        title: "Confirm & Enjoy Warm Meals",
        body: "Start right away! Pause deliveries anytime before 9 AM if traveling without losing meal credits.",
        note: "✅ Pause / Skip Meals Anytime",
      },
      ctaTitle: "Ready to start today or tomorrow?",
      ctaDesc: "Next-day meal activations cut off at 8:00 PM every evening.",
      ctaBtn: "Submit Quick Enquiry →",
    },

    why: {
      badge: "Our Food Philosophy",
      title: "Why Neighborhoods Trust Swami Om",
      p1: {
        title: "Low-Oil Healthy Cooking",
        desc: "No heavy food colors, no artificial tasting powders, strictly measured healthy oils.",
      },
      p2: {
        title: "Flexible Meal Plans",
        desc: "Daily trials, 15-day passes, or full monthly subscriptions. Pause anytime via WhatsApp.",
      },
      p3: {
        title: "Reliable Local Delivery",
        desc: "Prompt delivery slots for lunchtime and dinner. Thermal insulation keeps meals warm.",
      },
      p4: {
        title: "Fair Transparent Pricing",
        desc: "Clear monthly estimates based on your route distance. Zero hidden platform charges.",
      },
      p5: {
        title: "Catering for Special Days",
        desc: "House gatherings, poojas, and birthday parties with heartfelt traditional meals.",
      },
      p6: {
        title: "Direct Cook Communication",
        desc: "No chatbots — WhatsApp our kitchen directly for spice requests or timing updates.",
      },
    },

    reviews: {
      rating: "4.9 / 5.0",
      regulars: "(180+ Local Regulars)",
      title: "Loved By Daily Diners",
      learn: "Learn About Us",
      whatsapp: "💬 WhatsApp Us",
      stars: "5 out of 5 stars",
      r1: {
        initial: "R",
        text: "“Being away from home for my tech job, I missed simple dal-roti. Swami Om's tiffin has been a lifesaver for 6 months. Truly light on the stomach, never greasy!”",
        name: "Rahul Sharma",
        sub: "Daily Dinner Subscriber · 2 weeks ago",
      },
      r2: {
        initial: "P",
        text: "“Ordered catering for 35 relatives for our Griha Pravesh pooja. Everyone praised the satvik paneer, pooris, and gulab jamun. Honest homestyle taste!”",
        name: "Pooja Kulkarni",
        sub: "Event Catering · 1 month ago",
      },
      r3: {
        initial: "A",
        text: "“The ability to pause and skip days via WhatsApp is so convenient. Highly recommended for students and office folks who want home-cooked meals.”",
        name: "Amit Saxena",
        sub: "Monthly Tiffin Member · 3 weeks ago",
      },
    },

    cta: {
      badge: "Personal Kitchen Care",
      title: "Craving Genuine Ghar Ka Khana Today?",
      desc: "Tell us your preferred address and whether you need lunch, dinner, or custom party boxes. We'll verify delivery availability and send fresh menu options right away.",
      story: "🙏 Know Our Story",
      whatsapp: "💬 WhatsApp Kitchen Directly",
    },
  },

  rev: {
    badge: "Share Your Experience",
    h: "Real Stories From Our Customers",
    intro: "Tell us what you loved about your Swami Om meal. Your feedback helps us keep every tiffin warm, fresh, and homestyle.",
    avg: "Average rating",
    total: "Reviews shared",
    promise: "Every review is read by our kitchen team and helps us serve you better.",
    load: "Loading reviews…",
    empty: "No reviews yet",
    emptyHint: "Be the first to share your experience with Swami Om.",
    experience: "Your experience",
    write: "Write a review",
    proto: "Reviews are saved in this browser for now.",
    firstName: "First name",
    lastName: "Last name",
    email: "Email address",
    rating: "Rating",
    text: "Your review",
    submit: "Submit review",
    saving: "Saving…",
    ok: "Thank you for sharing your review!",
    fail: "We could not save your review. Please try again.",
  },

  /* ───────── ABOUT ───────── */
  about: {
    stats: {
      years: "Years of Service",
      meals: "Daily Meals Served",
      localities: "Pune Localities",
      options: "Meal Options",
    },
    hero: {
      badge: "🍲 Our Story & Values",
      title: "About Swami Om Tiffin Services",
      desc: "Born in a Pirangut kitchen, built on decades of Maharashtrian culinary tradition, and driven by a single belief — every person deserves to eat like they're home, no matter how far they've come.",
    },
    origin: {
      badge: "Our Origin Story",
      title: "Started from VEDANG VIJAY SHINDE's MOTHER's Kitchen in Priangut",
      p1: "In 2022, the mother and wife of Vedang Vijay Shinde, both homemakers, began preparing home-cooked meals for other households. People quickly recognized the taste and quality of their food, from delicious homemade dal and soft chapatis to the authentic aroma of Goda Masala bhaji.",
      p2:"That same year, Vedang's sister moved to another city for her studies and began missing her mother's home-cooked meals. This inspired Vedang to come up with an idea: to provide fresh, homemade tiffin meals to students and working professionals living away from their hometowns, so they could enjoy the comforting taste of home wherever they were.", 
      p3: "Word spread quickly. Within a year,More than 50 families and working professionals were relying on VEDANG VIJAY SHINDE's MOTHER'S kitchen for their daily meals. No restaurant could replicate the care that went into each stainless steel dabba.",
      p4:"Today, Swami Om Tiffin Services prepares more than 100 meals a day — but every meal still carries that same kitchen warmth, the same fresh ingredients, and the same commitment that Sudha Tai started with in her small home kitchen on Priangut.",
      imgAlt: "Authentic Maharashtrian meal spread",
      quote:
        "“आईच्या हातचं जेवण” — taste of mother's home cooking, delivered to your door.",
    },
    values: {
      badge: "Our Commitments",
      title: "What Makes Swami Om Different",
      v1: {
        title: "Veg & Non-Veg Choices",
        desc: "Choose from freshly prepared vegetarian and non-vegetarian meals. We use separate preparation practices and clearly communicate menu ingredients.",
      },
      v2: {
        title: "No Artificial Additives",
        desc: "We use only hand-pounded homemade masalas, cold-pressed groundnut oil, and pure desi ghee. Zero food colors, zero MSG, zero palm oil.",
      },
      v3: {
        title: "Cooked Like Home",
        desc: "Our kitchen follows the same recipes used in traditional Pune households — slow-cooked Katachi Amti, soft hand-pressed phulkas, and seasonal bhajis.",
      },
      v4: {
        title: "Fresh Every Meal",
        desc: "We cook fresh twice daily — morning batch for lunch tiffins and evening batch for dinner. Meals are never reheated or stored overnight.",
      },
      v5: {
        title: "Honest Pricing",
        desc: "No hidden charges, no intermediary platform fees. You pay directly for your food and delivery. Simple, fair, transparent — always.",
      },
      v6: {
        title: "Personal Care",
        desc: "We remember your preferences, pause your subscription when you travel, and adjust spice levels on request — because you're not a customer, you're family.",
      },
    },
    
    team: {
      badge: "Meet the People Behind Every Meal",
      title: "Our Dedicated Team",
      t1: {
        name: "Vishali Shinde",
        role: "Head Cook & Founder",
        initials: "ST",
        bio: "With 30+ years of home cooking experience in Kothrud, Sudha Tai started Swami Om to bring authentic Maharashtrian taste to working professionals and students who miss home-cooked food.",
      },
      t2: {
        name: "Namrata tai",
        role: "Co-Cook & Co-Founder",
        initials: "SB",
        bio: "",
      },
      t3: {
        name: "Anamika Tai",
        role: "Co-Cook & Co-Founder",
        initials: "PT",
        bio: "Priya handles all catering enquiries, manages special event menus, and ensures every family function we cater for feels like a personal celebration.",
      },
      t4: {
        name: "Vedang Vijay Shinde",
        role: "Owner",
        initials: "SO",
        bio: "The owner of Swami Om Tiffin Service, dedicated to bringing fresh, homestyle vegetarian and non-vegetarian meals with personal care to every customer.",
      },
    },
    cta: {
      badge: "Join Our Pune Family",
      title: "Ready to Experience Ghar Ka Khana?",
      desc: "WhatsApp us today to start your tiffin subscription or enquire about catering for your next event in Pune.",
      btn: "WhatsApp Us Now",
    },
  },

  /* ───────── LOCATION ───────── */
  location: {
    title: "Check Tiffin Service in Your Area",
    intro:
      "Enter your locality or pin your address to check delivery coverage, delivery slots, and request transparent location-based pricing.",
    radiusLabel: "Central kitchen radius",
    radiusValue: "7 km Guaranteed Fresh",
    searchLabel: "Locality, Apartment, or Landmark",
    search: "Search",
    placeholder: "e.g. Kothrud",
    gps: "Use GPS",
    searching: "Searching…",
    popular: "Popular coverage sectors",
    hubs: "{{count}} hubs online",
    mapInfo:
      "Hot-insulated tiffin carriers deployed directly at 11:45 AM & 7:15 PM",
    safety: "Tiffin Safety Guarantee",
    photo1: {
      alt: "Stainless steel tiffin boxes",
      caption: "Clean Stainless Dabbas",
    },
    photo2: {
      alt: "Rotis being cooked on a tawa",
      caption: "Rotis Made Fresh 30m Prior",
    },
    kmFrom: "{{dist}} km from kitchen",
    areaDelivery: "{{name}} Area Delivery",
    lunchSlot: "Lunch Slot",
    lunchBy: "By 12:30 PM",
    lunchPrep: "Prep at 10:45 AM",
    dinnerSlot: "Dinner Slot",
    dinnerBy: "By 7:45 PM",
    dinnerPrep: "Prep at 5:30 PM",
    estimatorTitle: "Customise Meal Estimator",
    estimatorSub: "Instant transparent quote",
    estimateLocation: "Delivery location",
    estimateKitchen: "Nearest kitchen: {{name}}",
    groupPeople: "Number of people",
    groupMeals: "Meal timing",
    groupPlan: "Duration plan",
    people: {
      1: "1 Person",
      2: "2 People",
      3: "3 People",
      4: "4+ Family",
    },
    freq: {
      lunch: "Lunch Only",
      dinner: "Dinner Only",
      both: "Both (2 Meals)",
    },
    duration: {
      trial: "Daily Trial",
      "15days": "15 Days",
      monthly: "30 Days (Best)",
    },
    durationShort: {
      trial: "Daily Trial",
      "15days": "15 Days",
      monthly: "30 Days",
    },
    period: {
      trial: "/ day",
      "15days": "/ 15 days",
      monthly: "/ month",
    },
    priceLabel: "Estimated kitchen price",
    directRate: "Direct Kitchen Rate",
    zeroCut: "Zero aggregator cut",
    disclaimer:
      "*Prices depend on meal requirements, quantity of rotis, and delivery cadence. Daily trial and monthly subscription estimates available upon request.",
    getPrice: "Get Price for This Location",
    customQuote: "Ask for a Custom Quote on WhatsApp",
    promiseTitle: "Our Fair Pricing Promise",
    promiseBody:
      "{{kitchen}} does not believe in hidden delivery markups or arbitrary app platform commissions. Every quote is direct from our kitchen to you. You pay strictly for quality whole grains, fresh vegetables, cold-pressed oils, and fair courier compensation.",
    waSubscribe:
      "Hello {{kitchen}}, I'd like to subscribe.\nLocation: {{label}} ({{dist}} km)\nPeople: {{people}}\nMeals: {{meals}}\nPlan: {{plan}}\nEstimated price: ₹{{price}}",
    waCustom:
      "Hello {{kitchen}}, I would like a custom quote.\nLocation: {{label}} ({{dist}} km)",
    errNotFound:
      "Locality not found in Pune. Try a nearby landmark or drop a pin on the map.",
    errSearch: "Search failed. Check your connection or drop a pin on the map.",
    errGpsNA: "GPS is not available on this device.",
    errGps: "Could not get your location. Allow location access or drop a pin.",
    zone: {
      inner: {
        badge: "Service Available — Priority Route",
        note: "Your address falls in our primary kitchen corridor. Hot home-style lunch and dinner can be dispatched reliably to your doorstep.",
        delivery:
          "Free delivery on 15 & 30-day plans! Since your locality is within 5 km of our central kitchen, daily transport fees are waived completely.",
      },
      mid: {
        badge: "Service Available — Standard Route",
        note: "Your address is within our standard delivery range. Tiffins are dispatched in scheduled batches along your route.",
        delivery:
          "A small delivery charge applies for your distance. It is lower on the monthly plan.",
      },
      outer: {
        badge: "On Request — Custom Delivery",
        note: "This location is outside our daily delivery zone. We can still serve you on request, so message us to confirm.",
        delivery: "Delivery for locations beyond 12 km is quoted individually.",
      },
    },
    steps: {
      title: "From Our Kadai to Your Dining Table",
      sub: "We cook in small, staggered batches so your tiffin never sits in transit for hours.",
      label: "Step {{n}} — {{time}}",
      cook: {
        time: "10:30 AM",
        title: "Daily Fresh Cooking",
        text: "Vegetables chopped at dawn, hand-roasted spice blends, and warm rotis prepared in small rounds per route zone.",
      },
      pack: {
        time: "11:45 AM",
        title: "Insulated Stainless Packing",
        text: "Packed boiling hot into sanitized 3-4 tier stainless dabbas or microwave-safe eco trays with heat-retention wraps.",
      },
      deliver: {
        time: "12:30 PM",
        title: "Punctual Handover",
        text: "Dedicated neighbourhood delivery riders drop off directly to your apartment security, reception, or flat door.",
      },
    },
  },

  /* ───────── MAP ───────── */
  map: {
    kitchenName: "🏠 Swami Om Central Kitchen",
    kitchenSub: "Kothrud · All tiffins dispatched from here",
    kitchenAdditional: "Additional kitchen hub",
    locating: "⏳ Locating…",
    kmFromKitchen: "{{dist}} km from kitchen",
    zoneInner: "✅ Free delivery zone",
    zoneMid: "🛵 Standard delivery",
    zoneOuter: "⚠️ Outside daily zone",
    legendTitle: "Delivery Zones",
    coverageRadius: "Coverage radius",
    legendInner: "≤ 5 km — Free Delivery",
    legendMid: "5–12 km — Standard",
    legendOuter: "> 12 km — On Request",
    weServe: "Locality we serve",
    hint: "Tap a locality sign or drag the pin",
    signDeliver: "{{name}} — we deliver here",
    signRequest: "{{name}} — delivery on request",
  },
};

/* ───────────────────────── MARATHI ───────────────────────── */
const mr = {
  brand: "स्वामी ओम",
  fix: "कृपया तुमचे पहिले नाव, आडनाव, ईमेल, रेटिंग आणि प्रतिक्रिया भरा.",

  nav: {
    home: "मुख्यपृष्ठ",
    about: "आमच्याबद्दल",
    location: "स्थान",
    review: "अभिप्राय",
    menu: "नेहमीचा मेन्यू",
    whatsapp: "व्हॉट्सअ‍ॅप करा",
    whatsappEnquiry: "📱 व्हॉट्सअ‍ॅप चौकशी",
    tagline: "टिफिन सेवा · पुणे",
    toggleMenu: "मेनू उघडा/बंद करा",
    logoAlt: "स्वामी ओम टिफिन सेवा लोगो",
    language: "भाषा",
  },

  footer: {
    tagline: "अस्सल महाराष्ट्रीयन घरगुती जेवण, रोज ताजे पोहोचवले जाते.",
    rights: "सर्व हक्क राखीव.",
    quickLinks: "जलद दुवे",
    contact: "संपर्क करा",
  },

  wa: {
    enquiry: "नमस्कार स्वामी ओम, मला तुमच्या डबा सेवेबद्दल चौकशी करायची आहे.",
    formEnquiry:
      "नमस्कार स्वामी ओम, मला डबा सेवेबद्दल चौकशी करायची आहे.\nनाव: {{name}}\nसंपर्क: {{phone}}\nपत्ता: {{address}}\nव्यक्ती: {{people}}\nजेवण: {{meals}}\nयोजना: {{plan}}",
    menu: "नमस्कार स्वामी ओम, आजचा मेन्यू काय आहे?",
    cateringEnquiry:
      "नमस्कार स्वामी ओम, मला केटरिंगबद्दल चौकशी करायची आहे.\nनाव: {{name}}\nसंपर्क: {{phone}}\nपत्ता: {{address}}\nव्यक्ती संख्या: {{people}}\nजेवणाचा प्रकार: {{foodType}}\nकार्यक्रमाची तारीख: {{date}}\nतपशील: {{description}}",
    diet: "नमस्कार स्वामी ओम, माझ्या डब्यासाठी मला आहारविषयक विशेष गरज आहे.",
    general: "नमस्कार स्वामी ओम, मला तुमच्याशी बोलायचे आहे.",
  },

  // Marathi names for localities. The key is the ENGLISH name used in
  // data/localities.js. Anything missing here simply shows in English.
  localities: {
    Kothrud: "कोथरूड",
    "Karve Nagar": "कर्वे नगर",
    Baner: "बाणेर",
    Balewadi: "बालेवाडी",
    Aundh: "औंध",
    Wakad: "वाकड",
    Hinjewadi: "हिंजवडी",
    Pashan: "पाषाण",
    Sus: "सूस",
    Warje: "वारजे",
    Shivajinagar: "शिवाजीनगर",
    Deccan: "डेक्कन",
    Erandwane: "एरंडवणे",
    "Sadashiv Peth": "सदाशिव पेठ",
    "Narayan Peth": "नारायण पेठ",
    "Shaniwar Peth": "शनिवार पेठ",
    Swargate: "स्वारगेट",
    Parvati: "पर्वती",
    Kondhwa: "कोंढवा",
    Hadapsar: "हडपसर",
    "Viman Nagar": "विमान नगर",
    Kharadi: "खराडी",
    Magarpatta: "मगरपट्टा",
    Bavdhan: "बावधन",
    "Sinhagad Road": "सिंहगड रस्ता",
    "Paud Road": "पौड रोड",
    Dhayari: "धायरी",
    Katraj: "कात्रज",
    Dhankawadi: "धनकवडी",
    Bibwewadi: "बिबवेवाडी",
    "Sahakar Nagar": "सहकार नगर",
    Camp: "कॅम्प",
    "Koregaon Park": "कोरेगाव पार्क",
    "Kalyani Nagar": "कल्याणी नगर",
    Yerawada: "येरवडा",
    Wanowrie: "वानवडी",
    Bhosari: "भोसरी",
    Pimpri: "पिंपरी",
    Chinchwad: "चिंचवड",
    Nigdi: "निगडी",
    Sangvi: "सांगवी",
    "Pimple Saudagar": "पिंपळे सौदागर",
    "Model Colony": "मॉडेल कॉलनी",
    "Law College Road": "लॉ कॉलेज रोड",
    "Prabhat Road": "प्रभात रोड",
    "Bhandarkar Road": "भांडारकर रोड",
  },

  /* ───────── HOME ───────── */
  home: {
    cateringForm: {
      title: "केटरिंग चौकशी",
      subtitle: "कार्यक्रमाची माहिती द्या आणि आम्ही तुमच्या केटरिंगची गरज कळवू.",
      name: "तुमचे नाव",
      phone: "संपर्क क्रमांक",
      address: "कार्यक्रमाचा पूर्ण पत्ता",
      people: "व्यक्ती संख्या",
      foodType: "जेवणाची पसंती",
      foodTypes: {
        veg: "शाकाहारी",
        nonVeg: "मांसाहारी",
        both: "शाकाहारी आणि मांसाहारी",
      },
      date: "कार्यक्रमाची तारीख",
      description: "कार्यक्रमाचे तपशील आणि गरजा",
      descriptionPlaceholder: "कार्यक्रम, मेन्यू, वेळ किंवा खास विनंतीबद्दल सांगा.",
      submit: "केटरिंग चौकशी पाठवा",
      close: "केटरिंग चौकशी फॉर्म बंद करा",
    },
    enquiry: {
      title: "डबा सेवा चौकशी",
      subtitle: "तुमची माहिती द्या आणि आम्ही व्हॉट्सअ‍ॅपवर उपलब्धता कळवू.",
      name: "तुमचे नाव",
      phone: "संपर्क क्रमांक",
      address: "पूर्ण डिलिव्हरी पत्ता",
      submit: "व्हॉट्सअ‍ॅपवर पाठवा",
      close: "चौकशी फॉर्म बंद करा",
    },
    hero: {
      badge: "🍲 पारंपरिक स्वयंपाकघराची उब",
      title1: "घरगुती जेवण,",
      title2: "मायेने बनवलेलं.",
      desc: "अस्सल महाराष्ट्रीयन घरगुती जेवण थेट तुमच्या दारापर्यंत. रोज ताजे बनवलेले शाकाहारी आणि मांसाहारी जेवण — आईच्या हातचं जेवण.",
      btnWhatsapp: "💬 व्हॉट्सअ‍ॅप चौकशी",
      btnAbout: "🙏 आमच्याबद्दल",
      trust: {
        everyday: "रोजचा डबा",
        fresh: "ताजे आणि घरगुती",
        catering: "खास केटरिंग",
        rates: "पारदर्शक दर",
      },
      imgAlt: "पारंपरिक भारतीय थाळी",
      freshDaily: "रोज ताजे तयार",
      homestyle: "100% घरगुती",
    },

    services: {
      badge: "आपल्या गरजेनुसार सेवा",
      title: "प्रत्येक दिनक्रमासाठी पौष्टिक जेवण",
      primaryTag: "⭐ मुख्य सेवा",
      primaryImgAlt: "रोजचा डबा",
      primaryTitle: "रोजची डबा सेवा",
      primaryMeals: "दुपारचे व रात्रीचे जेवण",
      primaryDesc:
        "विद्यार्थी, आयटी व्यावसायिक, एकटे राहणारे आणि ज्येष्ठ कुटुंबांसाठी रोजचे पौष्टिक जेवण. गरमागरम हाताच्या चपाती, घरी बनवलेले वरण, हलकी हंगामी भाजी आणि सुगंधी भात. दीर्घ बंधनांशिवाय पारदर्शक मासिक व दैनिक योजना.",
      f1: "कमी तेलात बनवलेले",
      f2: "तिखटपणा तुमच्या आवडीनुसार",
      f3: "सुट्टी घेणे / पुन्हा सुरू करणे सोपे",
      primaryCta: "डब्यासाठी चौकशी करा →",
      cateringTag: "आगाऊ नोंदणी",
      cateringImgAlt: "केटरिंग",
      cateringTitle: "केटरिंग सेवा",
      cateringPax: "15 ते 50 व्यक्ती",
      cateringDesc:
        "गृहप्रवेश, वाढदिवस, पूजा आणि वीकेंडच्या कार्यक्रमांसाठी जेवण. आईच्या हातच्या खऱ्या चवीसह गरम, अस्सल पार्टी मेन्यू.",
      c1: "तुमच्या आवडीनुसार भारतीय मेन्यू (उत्तर व दक्षिण)",
      c2: "ताजे कोल्ड-प्रेस्ड तेल आणि हाताने कुटलेले मसाले",
      c3: "किमान 48 तास आधी कळवणे आवश्यक",
      cateringCta: "तुमचे केटरिंग ठरवा →",
    },

    dishes: {
      badge: "अस्सल भारतीय चवी",
      title: "नेहमी मिळणारे घरगुती पदार्थ",
      menuOptions: "शाकाहारी आणि मांसाहारी",
      askMenu: "💬 आजचा मेन्यू व्हॉट्सअ‍ॅपवर विचारा",
      noticeTitle: "हंगामी रोजचा बदल",
      noticeBody:
        "आमचे स्वयंपाकघर पूर्णपणे हंगामी बाजारातील भाज्यांवर चालते, गोठवलेले किंवा प्रिझर्वेटिव्ह वापरत नाही. आजच्या दुपारच्या भाज्या जाणून घेण्यासाठी रोज सकाळी 10:00 पर्यंत आम्हाला संपर्क करा!",
      request: "प्लॅनमध्ये मागवा",
      regular: {
        tag: "नियमित",
        title: "नियमित शाकाहारी थाळी",
        desc: "ताजी शाकाहारी थाळी, पोळी, डाळ, हंगामी भाजी, भात आणि बदलत्या विशेष पदार्थांसह.",
        badge: "रोजचे संतुलित पोषण",
      },
      thursday: {
        tag: "गुरुवार स्पेशल",
        title: "खास गुरुवार शाकाहारी थाळी",
        desc: "3 साध्या चपाती, हंगामी भाजी, पुलाव आणि एक गोड पदार्थ.",
        badge: "गुरुवारची शाकाहारी मेजवानी",
      },
      sabzi: {
        tag: "उपलब्धता बदलते",
        title: "घरगुती हंगामी भाजी",
        desc: "रोज बदलणारे पदार्थ: भेंडी मसाला, बटाट्याची भाजी, मसूर डाळ किंवा दुधी-चना डाळ.",
        badge: "100% रोज बाजारातून ताजे",
      },
      sunday: {
        tag: "रविवार स्पेशल",
        title: "खास रविवार मांसाहारी थाळी",
        desc: "खास मांसाहारी थाळी दर रविवारी फक्त मांसाहारी ग्राहकांसाठी उपलब्ध आहे.",
        badge: "फक्त मांसाहारी ग्राहकांसाठी",
      },
    },

    how: {
      badge: "त्रासमुक्त अनुभव",
      title: "ताज्या घरगुती जेवणासाठी सोप्या पायऱ्या",
      desc: "कोणतेही क्लिष्ट अ‍ॅप सबस्क्रिप्शन किंवा बंधने नाहीत. थेट, वैयक्तिक स्वयंपाकघर समन्वय.",
      s1: {
        title: "तुमचा तपशील कळवा",
        body: "तुमचा पत्ता, कोणते जेवण हवे (दुपार, रात्र किंवा दोन्ही), आहारातील बंधने आणि सुरू करण्याची तारीख सांगा.",
        note: "📍 डिलिव्हरी क्षेत्र तपासा",
      },
      s2: {
        title: "मेन्यू आणि दर ठरवू",
        body: "आम्ही डिलिव्हरीची व्यवस्था निश्चित करतो, साप्ताहिक मेन्यू पाठवतो आणि तुमच्या अंतरानुसार योग्य दर सांगतो.",
        note: "🧾 प्रामाणिक, पारदर्शक अंदाज",
      },
      s3: {
        title: "निश्चित करा आणि गरम जेवणाचा आनंद घ्या",
        body: "लगेच सुरुवात करा! प्रवासात असाल तर सकाळी 9 च्या आधी डिलिव्हरी थांबवा, तुमचे जेवणाचे क्रेडिट वाया जाणार नाही.",
        note: "✅ कधीही जेवण थांबवा / वगळा",
      },
      ctaTitle: "आजपासून किंवा उद्यापासून सुरू करायचे आहे का?",
      ctaDesc:
        "दुसऱ्या दिवशीच्या जेवणाची नोंदणी दररोज संध्याकाळी 8:00 वाजता बंद होते.",
      ctaBtn: "त्वरित चौकशी पाठवा →",
    },

    why: {
      badge: "आमचे अन्नविषयक तत्त्व",
      title: "परिसरातील लोक स्वामी ओमवर का विश्वास ठेवतात",
      p1: {
        title: "कमी तेलातला आरोग्यदायी स्वयंपाक",
        desc: "जड फूड कलर नाहीत, कृत्रिम चवीचे पावडर नाहीत, फक्त मोजून वापरलेले आरोग्यदायी तेल.",
      },
      p2: {
        title: "लवचिक जेवण योजना",
        desc: "एक दिवसाची ट्रायल, 15 दिवसांचा पास किंवा पूर्ण मासिक सबस्क्रिप्शन. व्हॉट्सअ‍ॅपवरून कधीही थांबवा.",
      },
      p3: {
        title: "विश्वासार्ह स्थानिक डिलिव्हरी",
        desc: "दुपार आणि रात्रीच्या जेवणासाठी वेळेवर डिलिव्हरी. थर्मल इन्सुलेशनमुळे जेवण गरम राहते.",
      },
      p4: {
        title: "योग्य व पारदर्शक दर",
        desc: "तुमच्या मार्गाच्या अंतरावर आधारित स्पष्ट मासिक अंदाज. कोणतेही छुपे प्लॅटफॉर्म शुल्क नाही.",
      },
      p5: {
        title: "खास दिवसांसाठी केटरिंग",
        desc: "घरगुती कार्यक्रम, पूजा आणि वाढदिवसांसाठी मनापासून बनवलेले पारंपरिक जेवण.",
      },
      p6: {
        title: "स्वयंपाक्यांशी थेट संवाद",
        desc: "चॅटबॉट नाही — तिखटपणाच्या सूचना किंवा वेळेसाठी आमच्या स्वयंपाकघराला थेट व्हॉट्सअ‍ॅप करा.",
      },
    },

    reviews: {
      rating: "4.9 / 5.0",
      regulars: "(180+ स्थानिक नियमित ग्राहक)",
      title: "रोजच्या ग्राहकांचे प्रेम",
      learn: "आमच्याबद्दल जाणून घ्या",
      whatsapp: "💬 व्हॉट्सअ‍ॅप करा",
      stars: "5 पैकी 5 तारे",
      r1: {
        initial: "रा",
        text: "“घरापासून दूर राहून टेक जॉब करताना मला साधं वरण-पोळी खूप आठवायची. स्वामी ओमचा डबा गेली 6 महिने माझ्यासाठी मोठा आधार ठरला आहे. खरोखर पोटाला हलका, कधीच तेलकट नाही!”",
        name: "राहुल शर्मा",
        sub: "रात्रीच्या जेवणाचा नियमित ग्राहक · 2 आठवड्यांपूर्वी",
      },
      r2: {
        initial: "पू",
        text: "“आमच्या गृहप्रवेश पूजेसाठी 35 नातेवाईकांसाठी केटरिंग मागवलं होतं. सगळ्यांनी सात्त्विक पनीर, पुऱ्या आणि गुलाबजामचं कौतुक केलं. प्रामाणिक घरगुती चव!”",
        name: "पूजा कुलकर्णी",
        sub: "इव्हेंट केटरिंग · 1 महिन्यापूर्वी",
      },
      r3: {
        initial: "अ",
        text: "“व्हॉट्सअ‍ॅपवरून दिवस थांबवण्याची आणि वगळण्याची सोय खूप सोयीची आहे. घरचं जेवण हवं असलेल्या विद्यार्थ्यांना आणि ऑफिसमधील लोकांना नक्की सुचवेन.”",
        name: "अमित सक्सेना",
        sub: "मासिक डबा सदस्य · 3 आठवड्यांपूर्वी",
      },
    },

    cta: {
      badge: "वैयक्तिक स्वयंपाकघर काळजी",
      title: "आज खरंखुरं घरचं जेवण खावंसं वाटतंय?",
      desc: "तुमचा पसंतीचा पत्ता आणि दुपारचे, रात्रीचे जेवण किंवा खास पार्टी बॉक्स हवे आहेत ते सांगा. आम्ही डिलिव्हरीची उपलब्धता तपासून लगेच ताजे मेन्यू पर्याय पाठवू.",
      story: "🙏 आमची कहाणी जाणून घ्या",
      whatsapp: "💬 स्वयंपाकघराला थेट व्हॉट्सअ‍ॅप करा",
    },
  },

  rev: {
    badge: "तुमचा अनुभव सांगा",
    h: "आमच्या ग्राहकांच्या खऱ्या प्रतिक्रिया",
    intro: "स्वामी ओमच्या जेवणाबद्दल तुम्हाला काय आवडलं ते सांगा. तुमच्या प्रतिक्रियेमुळे प्रत्येक डबा गरम, ताजा आणि घरगुती ठेवण्यास आम्हाला मदत होते.",
    avg: "सरासरी रेटिंग",
    total: "एकूण प्रतिक्रिया",
    promise: "प्रत्येक प्रतिक्रिया आमची स्वयंपाकघर टीम वाचते आणि त्यातून सेवा अधिक चांगली करण्यास मदत होते.",
    load: "प्रतिक्रिया लोड होत आहेत…",
    empty: "अजून प्रतिक्रिया नाहीत",
    emptyHint: "स्वामी ओमसोबतचा तुमचा अनुभव सर्वप्रथम सांगा.",
    experience: "तुमचा अनुभव",
    write: "प्रतिक्रिया लिहा",
    proto: "सध्या प्रतिक्रिया या ब्राउझरमध्ये जतन केल्या जातात.",
    firstName: "पहिले नाव",
    lastName: "आडनाव",
    email: "ईमेल पत्ता",
    rating: "रेटिंग",
    text: "तुमची प्रतिक्रिया",
    submit: "प्रतिक्रिया पाठवा",
    saving: "जतन करत आहे…",
    ok: "तुमची प्रतिक्रिया शेअर केल्याबद्दल धन्यवाद!",
    fail: "प्रतिक्रिया जतन करता आली नाही. कृपया पुन्हा प्रयत्न करा.",
  },

  /* ───────── ABOUT ───────── */
  about: {
    stats: {
      years: "सेवेची वर्षे",
      meals: "रोज दिलेली जेवणे",
      localities: "पुण्यातील परिसर",
      options: "जेवणाचे पर्याय",
    },
    hero: {
      badge: "🍲 आमची कहाणी आणि मूल्ये",
      title: "स्वामी ओम टिफिन सेवांबद्दल",
      desc: "पिरंगुटच्या एका स्वयंपाकघरातून सुरू झालेली, अनेक दशकांच्या महाराष्ट्रीयन पाककला परंपरेवर उभी असलेली आणि एका विश्वासाने प्रेरित — माणूस कितीही दूर गेला तरी त्याला घरच्यासारखं जेवण मिळायला हवं.",
    },
    origin: {
      badge: "आमची सुरुवात",
      title: "वेदांग विजय शिंदे यांच्या आई आणि पत्नीच्या पिरंगुटमधील स्वयंपाकघरातून सुरू झालेली वाटचाल",
      p1: "2022 मध्ये वेदांग विजय शिंदे यांच्या आई आणि पत्नी या दोघीही गृहिणींनी इतर कुटुंबांसाठी घरगुती जेवण बनवायला सुरुवात केली. चविष्ट घरगुती वरण, मऊ चपाती आणि अस्सल गोडा मसाल्याच्या भाजीचा सुगंध यामुळे लोकांनी त्यांच्या जेवणाची चव आणि गुणवत्ता लगेच ओळखली.",
      p2: "त्याच वर्षी वेदांग यांची बहीण शिक्षणासाठी दुसऱ्या शहरात गेली आणि तिला आईच्या हातच्या जेवणाची आठवण येऊ लागली. यामुळे वेदांग यांना एक कल्पना सुचली — घरापासून दूर राहणाऱ्या विद्यार्थी आणि नोकरदारांसाठी ताजे, घरगुती डबे पोहोचवायचे, जेणेकरून ते कुठेही असले तरी घरच्या जेवणाची समाधान देणारी चव घेऊ शकतील.",
      p3: "ही बातमी वेगाने पसरली. एका वर्षातच 50 हून अधिक कुटुंबे आणि नोकरदार रोजच्या जेवणासाठी वेदांग विजय शिंदे यांच्या आईच्या स्वयंपाकघरावर अवलंबून राहू लागले. प्रत्येक स्टीलच्या डब्यात घेतलेली काळजी कोणतेही रेस्टॉरंट देऊ शकत नव्हते.",
      p4: "आज स्वामी ओम टिफिन सर्व्हिसेस दररोज 100 हून अधिक जेवणे तयार करते — पण प्रत्येक जेवणात अजूनही तीच स्वयंपाकघराची उब, ताजे साहित्य आणि पिरंगुटमधील छोट्या घरगुती स्वयंपाकघरातून सुरू झालेली तीच बांधिलकी आहे.",
      imgAlt: "अस्सल महाराष्ट्रीयन जेवणाची थाळी",
      quote:
        "“आईच्या हातचं जेवण” — आईच्या हातच्या स्वयंपाकाची चव, थेट तुमच्या दारापर्यंत.",
    },
    values: {
      badge: "आमची वचनबद्धता",
      title: "स्वामी ओम वेगळे का आहे",
      v1: {
        title: "शाकाहारी आणि मांसाहारी पर्याय",
        desc: "ताजे बनवलेले शाकाहारी आणि मांसाहारी जेवण निवडा. स्वतंत्र तयारीची काळजी घेतली जाते आणि मेन्यूमधील पदार्थ स्पष्टपणे सांगितले जातात.",
      },
      v2: {
        title: "कोणतेही कृत्रिम पदार्थ नाहीत",
        desc: "आम्ही फक्त हाताने कुटलेले घरगुती मसाले, कोल्ड-प्रेस्ड शेंगदाणा तेल आणि शुद्ध देशी तूप वापरतो. फूड कलर नाही, MSG नाही, पाम तेल नाही.",
      },
      v3: {
        title: "घरच्यासारखा स्वयंपाक",
        desc: "आमचे स्वयंपाकघर पुण्यातील पारंपरिक घरांत वापरल्या जाणाऱ्या त्याच पाककृती पाळते — मंद आचेवर शिजवलेली कटाची आमटी, मऊ हाताच्या चपाती आणि हंगामी भाज्या.",
      },
      v4: {
        title: "प्रत्येक जेवण ताजे",
        desc: "आम्ही दिवसातून दोनदा ताजे शिजवतो — दुपारच्या डब्यांसाठी सकाळची बॅच आणि रात्रीच्या जेवणासाठी संध्याकाळची बॅच. जेवण कधीही पुन्हा गरम केले जात नाही किंवा रात्रभर साठवले जात नाही.",
      },
      v5: {
        title: "प्रामाणिक दर",
        desc: "छुपे शुल्क नाही, मध्यस्थ प्लॅटफॉर्मचे शुल्क नाही. तुम्ही जेवण आणि डिलिव्हरीसाठी थेट पैसे देता. साधे, योग्य, पारदर्शक — नेहमी.",
      },
      v6: {
        title: "वैयक्तिक काळजी",
        desc: "आम्हाला तुमच्या आवडीनिवडी लक्षात असतात, तुम्ही प्रवासात असाल तेव्हा सबस्क्रिप्शन थांबवतो आणि विनंतीनुसार तिखटपणा बदलतो — कारण तुम्ही ग्राहक नाही, घरचे आहात.",
      },
    },
    timeline: {
      badge: "आमचा प्रवास",
      title: "पुण्यातील आमची वाटचाल",
      m1: {
        label: "पिरंगुटमध्ये सुरुवात",
        desc: "इतर कुटुंबांसाठी घरगुती जेवण बनवण्यास सुरुवात",
      },
      m2: {
        label: "घरगुती डब्यांची मागणी वाढली",
        desc: "विद्यार्थी आणि नोकरदारांसाठी डिलिव्हरी सुरू केली",
      },
      m3: {
        label: "50+ कुटुंबांचा विश्वास",
        desc: "कुटुंबे आणि नोकरदार रोजच्या जेवणासाठी जोडले गेले",
      },
      m4: {
        label: "केटरिंग सेवेची सुरुवात",
        desc: "कार्यक्रम आणि विशेष प्रसंगांसाठी जेवण देण्यास सुरुवात",
      },
      m5: {
        label: "दररोज 100+ जेवणे",
        desc: "पुण्यातील अनेक परिसरांमध्ये घरगुती जेवणाची सेवा",
      },
    },
    team: {
      badge: "प्रत्येक जेवणामागील माणसे",
      title: "आमचा समर्पित संघ",
      t1: {
        name: "सुधा ताई",
        role: "मुख्य स्वयंपाकी आणि संस्थापक",
        initials: "सु",
        bio: "कोथरूडमध्ये 30+ वर्षांच्या घरगुती स्वयंपाकाच्या अनुभवासह, सुधा ताईंनी घरच्या जेवणाची आठवण येणाऱ्या नोकरदार आणि विद्यार्थ्यांसाठी अस्सल महाराष्ट्रीयन चव पोहोचवण्यासाठी स्वामी ओम सुरू केले.",
      },
      t2: {
        name: "संतोष भैय्या",
        role: "डिलिव्हरी आणि व्यवस्थापन",
        initials: "सं",
        bio: "2018 पासून पुण्यातील सर्व डिलिव्हरी मार्गांवरील वेळेवर पाठवणीचे व्यवस्थापन. तुमचा डबा गरम आणि वेळेवर पोहोचेल याची संतोष दररोज खात्री करतात.",
      },
      t3: {
        name: "प्रिया ताई",
        role: "केटरिंग आणि इव्हेंट समन्वयक",
        initials: "प्रि",
        bio: "प्रिया सर्व केटरिंग चौकशा हाताळतात, खास कार्यक्रमांचे मेन्यू ठरवतात आणि आम्ही केटरिंग केलेला प्रत्येक कौटुंबिक सोहळा वैयक्तिक उत्सवासारखा वाटेल याची काळजी घेतात.",
      },
      t4: {
        name: "वेदांग विजय शिंदे",
        role: "मालक",
        initials: "स्वो",
        bio: "स्वामी ओम टिफिन सर्व्हिसचे मालक, प्रत्येक ग्राहकाला ताजे, घरगुती शाकाहारी आणि मांसाहारी जेवण तसेच आपुलकीची सेवा देण्यासाठी समर्पित.",
      },
    },
    cta: {
      badge: "आमच्या पुणेकर कुटुंबात सामील व्हा",
      title: "घरच्या जेवणाचा अनुभव घ्यायला तयार आहात?",
      desc: "तुमचे डबा सबस्क्रिप्शन सुरू करण्यासाठी किंवा पुण्यातील तुमच्या पुढील कार्यक्रमाच्या केटरिंगसाठी आजच आम्हाला व्हॉट्सअ‍ॅप करा.",
      btn: "आत्ताच व्हॉट्सअ‍ॅप करा",
    },
  },

  /* ───────── LOCATION ───────── */
  location: {
    title: "तुमच्या परिसरात डबा सेवा तपासा",
    intro:
      "तुमचा परिसर टाका किंवा पत्त्यावर पिन लावा आणि डिलिव्हरी क्षेत्र, डिलिव्हरीच्या वेळा तपासा व स्थानानुसार पारदर्शक दराची विनंती करा.",
    radiusLabel: "मध्यवर्ती स्वयंपाकघराची त्रिज्या",
    radiusValue: "7 किमी ताज्या जेवणाची हमी",
    searchLabel: "परिसर, अपार्टमेंट किंवा खूण",
    search: "शोधा",
    placeholder: "उदा. कोथरूड",
    gps: "GPS वापरा",
    searching: "शोधत आहे…",
    popular: "लोकप्रिय सेवा क्षेत्रे",
    hubs: "{{count}} केंद्रे सुरू",
    mapInfo:
      "गरम इन्सुलेटेड टिफिन कॅरियर सकाळी 11:45 आणि संध्याकाळी 7:15 ला थेट पोहोचवले जातात",
    safety: "टिफिन सुरक्षा हमी",
    photo1: { alt: "स्टीलचे टिफिन डबे", caption: "स्वच्छ स्टीलचे डबे" },
    photo2: {
      alt: "तव्यावर भाजल्या जाणाऱ्या पोळ्या",
      caption: "पोळ्या 30 मिनिटे आधी ताज्या बनवलेल्या",
    },
    kmFrom: "स्वयंपाकघरापासून {{dist}} किमी",
    areaDelivery: "{{name}} परिसरातील डिलिव्हरी",
    lunchSlot: "दुपारची वेळ",
    lunchBy: "12:30 पर्यंत",
    lunchPrep: "तयारी सकाळी 10:45 ला",
    dinnerSlot: "रात्रीची वेळ",
    dinnerBy: "7:45 पर्यंत",
    dinnerPrep: "तयारी संध्याकाळी 5:30 ला",
    estimatorTitle: "तुमचा जेवणाचा अंदाज ठरवा",
    estimatorSub: "त्वरित पारदर्शक दरपत्रक",
    estimateLocation: "डिलिव्हरीचे ठिकाण",
    estimateKitchen: "जवळचे स्वयंपाकघर: {{name}}",
    groupPeople: "व्यक्तींची संख्या",
    groupMeals: "जेवणाची वेळ",
    groupPlan: "योजनेचा कालावधी",
    people: {
      1: "1 व्यक्ती",
      2: "2 व्यक्ती",
      3: "3 व्यक्ती",
      4: "4+ कुटुंब",
    },
    freq: {
      lunch: "फक्त दुपार",
      dinner: "फक्त रात्र",
      both: "दोन्ही (2 जेवणे)",
    },
    duration: {
      trial: "रोजची ट्रायल",
      "15days": "15 दिवस",
      monthly: "30 दिवस (सर्वोत्तम)",
    },
    durationShort: {
      trial: "रोजची ट्रायल",
      "15days": "15 दिवस",
      monthly: "30 दिवस",
    },
    period: {
      trial: "/ दिवस",
      "15days": "/ 15 दिवस",
      monthly: "/ महिना",
    },
    priceLabel: "अंदाजे स्वयंपाकघर दर",
    directRate: "थेट स्वयंपाकघर दर",
    zeroCut: "कोणतेही एग्रीगेटर कमिशन नाही",
    disclaimer:
      "*दर जेवणाच्या गरजा, पोळ्यांची संख्या आणि डिलिव्हरीच्या वारंवारतेवर अवलंबून असतात. रोजची ट्रायल आणि मासिक सबस्क्रिप्शनचे अंदाज विनंतीनुसार उपलब्ध.",
    getPrice: "या स्थानासाठी दर मिळवा",
    customQuote: "व्हॉट्सअ‍ॅपवर खास दरपत्रक मागा",
    promiseTitle: "आमचे योग्य दराचे वचन",
    promiseBody:
      "{{kitchen}} छुपे डिलिव्हरी मार्कअप किंवा मनमानी अ‍ॅप प्लॅटफॉर्म कमिशनवर विश्वास ठेवत नाही. प्रत्येक दरपत्रक थेट आमच्या स्वयंपाकघरातून तुमच्यापर्यंत येते. तुम्ही फक्त दर्जेदार धान्य, ताज्या भाज्या, कोल्ड-प्रेस्ड तेल आणि डिलिव्हरी करणाऱ्यांच्या योग्य मोबदल्यासाठी पैसे देता.",
    waSubscribe:
      "नमस्कार {{kitchen}}, मला सबस्क्रिप्शन घ्यायचे आहे.\nठिकाण: {{label}} ({{dist}} किमी)\nव्यक्ती: {{people}}\nजेवण: {{meals}}\nयोजना: {{plan}}\nअंदाजे दर: ₹{{price}}",
    waCustom:
      "नमस्कार {{kitchen}}, मला खास दरपत्रक हवे आहे.\nठिकाण: {{label}} ({{dist}} किमी)",
    errNotFound:
      "पुण्यात परिसर सापडला नाही. जवळची खूण वापरून पहा किंवा नकाशावर पिन टाका.",
    errSearch: "शोध अयशस्वी झाला. तुमचे कनेक्शन तपासा किंवा नकाशावर पिन टाका.",
    errGpsNA: "या उपकरणावर GPS उपलब्ध नाही.",
    errGps:
      "तुमचे स्थान मिळवता आले नाही. स्थान प्रवेशाला परवानगी द्या किंवा पिन टाका.",
    zone: {
      inner: {
        badge: "सेवा उपलब्ध — प्राधान्य मार्ग",
        note: "तुमचा पत्ता आमच्या मुख्य स्वयंपाकघर मार्गिकेत येतो. गरमागरम घरगुती दुपारचे आणि रात्रीचे जेवण तुमच्या दारापर्यंत विश्वासाने पाठवता येते.",
        delivery:
          "15 आणि 30 दिवसांच्या योजनांवर मोफत डिलिव्हरी! तुमचा परिसर आमच्या मध्यवर्ती स्वयंपाकघरापासून 5 किमीच्या आत असल्याने रोजचे वाहतूक शुल्क पूर्णपणे माफ आहे.",
      },
      mid: {
        badge: "सेवा उपलब्ध — नेहमीचा मार्ग",
        note: "तुमचा पत्ता आमच्या नेहमीच्या डिलिव्हरी क्षेत्रात आहे. डबे तुमच्या मार्गावर ठरलेल्या बॅचमध्ये पाठवले जातात.",
        delivery:
          "तुमच्या अंतरानुसार थोडे डिलिव्हरी शुल्क लागू होते. मासिक योजनेत ते कमी असते.",
      },
      outer: {
        badge: "विनंतीनुसार — खास डिलिव्हरी",
        note: "हे ठिकाण आमच्या रोजच्या डिलिव्हरी क्षेत्राबाहेर आहे. तरीही आम्ही विनंतीनुसार सेवा देऊ शकतो, कृपया खात्री करण्यासाठी संदेश पाठवा.",
        delivery:
          "12 किमीपलीकडील ठिकाणांसाठी डिलिव्हरीचा दर स्वतंत्रपणे सांगितला जातो.",
      },
    },
    steps: {
      title: "आमच्या कढईपासून तुमच्या जेवणाच्या टेबलापर्यंत",
      sub: "आम्ही लहान, टप्प्याटप्प्याच्या बॅचमध्ये शिजवतो, त्यामुळे तुमचा डबा तासनतास प्रवासात पडून राहत नाही.",
      label: "पायरी {{n}} — {{time}}",
      cook: {
        time: "सकाळी 10:30",
        title: "रोज ताजा स्वयंपाक",
        text: "भाज्या पहाटे चिरलेल्या, हाताने भाजलेले मसाले आणि प्रत्येक मार्गाच्या विभागासाठी लहान बॅचमध्ये बनवलेल्या गरम पोळ्या.",
      },
      pack: {
        time: "सकाळी 11:45",
        title: "इन्सुलेटेड स्टील पॅकिंग",
        text: "निर्जंतुक केलेल्या 3-4 मजली स्टीलच्या डब्यांत किंवा मायक्रोवेव्ह-सुरक्षित इको ट्रेमध्ये, उष्णता टिकवणाऱ्या आवरणांसह उकळते गरम भरले जाते.",
      },
      deliver: {
        time: "दुपारी 12:30",
        title: "वेळेवर हस्तांतर",
        text: "विशेष परिसर डिलिव्हरी रायडर थेट तुमच्या अपार्टमेंट सिक्युरिटी, रिसेप्शन किंवा फ्लॅटच्या दारापर्यंत पोहोचवतात.",
      },
    },
  },

  /* ───────── MAP ───────── */
  map: {
    kitchenName: "🏠 स्वामी ओम सेंट्रल किचन",
    kitchenSub: "कोथरूड · सर्व डबे येथूनच पाठवले जातात",
    kitchenAdditional: "अतिरिक्त किचन केंद्र",
    locating: "⏳ स्थान शोधत आहे…",
    kmFromKitchen: "स्वयंपाकघरापासून {{dist}} किमी",
    zoneInner: "✅ मोफत डिलिव्हरी क्षेत्र",
    zoneMid: "🛵 नेहमीची डिलिव्हरी",
    zoneOuter: "⚠️ रोजच्या क्षेत्राबाहेर",
    legendTitle: "डिलिव्हरी क्षेत्रे",
    coverageRadius: "कव्हरेज त्रिज्या",
    legendInner: "≤ 5 किमी — मोफत डिलिव्हरी",
    legendMid: "5–12 किमी — नेहमीची",
    legendOuter: "> 12 किमी — विनंतीनुसार",
    weServe: "आम्ही सेवा देत असलेला परिसर",
    hint: "परिसराच्या फलकावर टॅप करा किंवा पिन ओढा",
    signDeliver: "{{name}} — आम्ही इथे डिलिव्हरी करतो",
    signRequest: "{{name}} — विनंतीनुसार डिलिव्हरी",
  },
};

/* ───────────────────────── INIT ───────────────────────── */
const saved = (() => {
  try {
    return localStorage.getItem("lang");
  } catch {
    return null;
  }
})();

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    mr: { translation: mr },
  },
  lng: saved === "mr" ? "mr" : "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

// Keep <html lang> and localStorage in sync whenever the language changes
const sync = (lng) => {
  document.documentElement.lang = lng;
  try {
    localStorage.setItem("lang", lng);
  } catch {
    /* ignore */
  }
};
sync(i18n.language);
i18n.on("languageChanged", sync);

export default i18n;
