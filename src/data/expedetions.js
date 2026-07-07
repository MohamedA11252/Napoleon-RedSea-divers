const IMG = {
  wreck: "https://media.base44.com/images/public/6a4bfe1f24077d99a17e4331/eaf837643_generated_425c7d06.png",
  garden: "https://media.base44.com/images/public/6a4bfe1f24077d99a17e4331/80116fa85_generated_73593ef5.png",
  coral: "https://media.base44.com/images/public/6a4bfe1f24077d99a17e4331/ae0fdb36f_generated_7393b9d6.png",
  bluehole: "https://media.base44.com/images/public/6a4bfe1f24077d99a17e4331/2223c0f7e_generated_368b373c.png",
  barracuda: "https://media.base44.com/images/public/6a4bfe1f24077d99a17e4331/3a3e55a34_generated_bb3f9b85.png",
  night: "https://media.base44.com/images/public/6a4bfe1f24077d99a17e4331/71a987405_generated_62265158.png",
};

export const categoryOrder = [
  "Discovery Scuba Diving",
  "Daily Diving",
  "Courses",
  "Specialities",
  "Liveaboard Adventure",
];

export const activities = [
  // ── Discovery Scuba Diving ──
  {
    slug: "discovery-scuba-diving",
    title: "Discovery Scuba Diving",
    category: "Discovery Scuba Diving",
    image: IMG.wreck,
    tagline: "Your first breaths beneath the surface — an unforgettable introduction to the underwater world.",
    stats: [
      { label: "Max Depth", value: "12m" },
      { label: "Level", value: "No Experience" },
      { label: "Duration", value: "Half Day" },
    ],
    description: [
      "Have you ever wondered what it feels like to breathe underwater? The Discovery Scuba Diving experience is designed for those who want to try diving for the very first time, with no prior certification required. In the warm, crystal-clear waters of the Red Sea, you'll take your first breaths beneath the surface and discover a world of vibrant coral and marine life that most people only see in documentaries.",
      "Your session begins with a comprehensive safety briefing and basic skill instruction from one of our PADI-certified instructors. You'll start in shallow water to get comfortable with the equipment, then venture into the reef for a guided shallow dive to a maximum depth of 12 metres. With a maximum ratio of two students per instructor, you'll feel safe and supported throughout. All equipment is provided — simply bring your swimsuit and a sense of adventure.",
    ],
    price: "00.00 EUR",
  },

  // ── Daily Diving ──
  {
    slug: "daily-diving",
    title: "Daily Diving",
    category: "Daily Diving",
    image: IMG.garden,
    tagline: "Guided daily expeditions for certified divers across the Red Sea's finest reefs and wrecks.",
    stats: [
      { label: "Max Depth", value: "30m" },
      { label: "Level", value: "Certified" },
      { label: "Duration", value: "Full Day" },
    ],
    description: [
      "Our Daily Diving programme is the core of what we do — guided two-dive day trips for certified divers to the Red Sea's most spectacular sites. Departing from Sharm El Sheikh each morning aboard our luxury vessel, you'll visit a curated rotation of reefs and wrecks selected daily based on conditions, marine life activity, and the experience level of the group.",
      "Each trip includes two immersive dives at different sites, separated by a surface interval on the sun deck where our chef prepares a gourmet brunch and refreshments. Our guides — each with thousands of dives in the Red Sea — provide thorough briefings and lead small groups of no more than six divers. Nitrox is available on every trip at no additional cost for certified divers. Whether you're joining us for a single day or a week of diving, every detail is orchestrated to deliver the golden standard of underwater exploration.",
    ],
    price: "00.00 EUR",
  },

  // ── Courses ──
  {
    slug: "padi-bubblemaker",
    title: "PADI Bubblemaker",
    category: "Courses",
    image: IMG.garden,
    tagline: "The very first underwater adventure for children aged 8 and 9.",
    stats: [
      { label: "Max Depth", value: "2m" },
      { label: "Age", value: "8-9" },
      { label: "Duration", value: "1 Hour" },
    ],
    description: [
      "The PADI Bubblemaker programme is as fun as it sounds — a chance for children to experience the thrill of breathing underwater in a safe, controlled environment. Designed for kids aged 8 and 9, this introductory session takes place in shallow water (no deeper than 2 metres) and requires no prior experience. It's the perfect way to spark a lifelong love of the ocean.",
      "Under the patient guidance of our PADI-certified instructors, your child will learn the basics of scuba equipment and take their first breaths underwater. Sessions last approximately one hour and include all equipment specifically sized for children. Parents are welcome to observe from the surface or, if certified divers, join the session. A celebratory certificate and photo are provided to commemorate the experience.",
    ],
    price: "00.00 EUR",
  },
  {
    slug: "padi-open-water-diver",
    title: "PADI Open Water Diver",
    category: "Courses",
    image: IMG.coral,
    tagline: "Your passport to the underwater world — the world's most popular scuba certification.",
    stats: [
      { label: "Max Depth", value: "18m" },
      { label: "Duration", value: "3 Days" },
      { label: "Cert", value: "Included" },
    ],
    description: [
      "The PADI Open Water Diver certification is your entry into the global community of divers. This comprehensive three-day course teaches you everything you need to dive independently to a depth of 18 metres, anywhere in the world. No prior experience is needed — just the ability to swim and a spirit of adventure.",
      "The course is structured in three phases: knowledge development (which can be completed online before you arrive), confined water training where you'll learn essential skills in calm, shallow water, and four open water dives where you'll apply your skills on the reef. Our maximum class size of four students per instructor ensures personalised attention. Upon completion, you'll receive a certification recognised at dive centres worldwide — your passport to a lifetime of underwater exploration.",
    ],
    price: "00.00 EUR",
  },
  {
    slug: "padi-advanced-open-water",
    title: "PADI Advanced Open Water",
    category: "Courses",
    image: IMG.coral,
    tagline: "Take the next step — refine your skills and explore new underwater territories.",
    stats: [
      { label: "Max Depth", value: "30m" },
      { label: "Duration", value: "2-3 Days" },
      { label: "Dives", value: "5" },
    ],
    description: [
      "The PADI Advanced Open Water course is designed to build your confidence and expand your diving skills through five Adventure Dives. You don't need to be an 'advanced' diver to take this course — it's designed to be taken immediately after Open Water certification, helping you gain experience under the guidance of our expert instructors.",
      "Over two to three days, you'll complete five Adventure Dives: a Deep Dive (to 30 metres), an Underwater Navigation Dive, and three additional dives of your choosing. Popular options include Wreck Diving, Night Diving, Underwater Photography, Drift Diving, and Fish Identification. Each dive introduces new skills while letting you explore some of the Red Sea's most exciting sites. Upon completion, you'll be certified to dive to 30 metres worldwide.",
    ],
    price: "00.00 EUR",
  },
  {
    slug: "efr-emergency-first-response",
    title: "EFR (Emergency First Response)",
    category: "Courses",
    image: IMG.barracuda,
    tagline: "Essential life-saving skills for divers and non-divers alike.",
    stats: [
      { label: "Duration", value: "1 Day" },
      { label: "Prerequisite", value: "None" },
      { label: "Cert", value: "Included" },
    ],
    description: [
      "Emergency First Response (EFR) training provides the skills and confidence to respond to medical emergencies — not just in diving, but in everyday life. This course is a prerequisite for the PADI Rescue Diver certification, but it's valuable for anyone who wants to be prepared to help in an emergency situation.",
      "Over a single day, you'll learn primary care (CPR), secondary care (first aid), and how to manage a range of emergency scenarios including choking, bleeding, shock, and spinal injuries. The course follows internationally recognised emergency care guidelines and includes hands-on practice with training mannequins. Certification is valid for two years and is accepted worldwide. No diving experience is required — this course is open to everyone.",
    ],
    price: "00.00 EUR",
  },
  {
    slug: "padi-rescue-diver",
    title: "PADI Rescue Diver",
    category: "Courses",
    image: IMG.barracuda,
    tagline: "Become the diver every team trusts — learn to prevent and manage dive emergencies.",
    stats: [
      { label: "Duration", value: "3-4 Days" },
      { label: "Level", value: "Advanced" },
      { label: "Cert", value: "Included" },
    ],
    description: [
      "The PADI Rescue Diver course is often described as the most challenging and rewarding course in the PADI system. Over three to four days, you'll learn to prevent and manage problems both above and below the surface, developing the skills and confidence to handle dive emergencies that, while rare, can occur.",
      "The course covers self-rescue, recognising and managing stress in other divers, emergency management, rescuing panicked and unresponsive divers, and managing equipment problems. You'll participate in rescue scenarios that simulate real emergencies, building muscle memory and decision-making skills. Prerequisites include PADI Advanced Open Water certification, EFR training within the past 24 months, and a minimum of 20 logged dives. Upon completion, you'll be a more confident, aware, and capable dive buddy.",
    ],
    price: "00.00 EUR",
  },
  {
    slug: "divemaster",
    title: "Divemaster",
    category: "Courses",
    image: IMG.barracuda,
    tagline: "The first step into professional diving — transform your passion into a career.",
    stats: [
      { label: "Duration", value: "2+ Weeks" },
      { label: "Level", value: "Professional" },
      { label: "Cert", value: "Included" },
    ],
    description: [
      "The PADI Divemaster certification is your entry into the world of professional diving. This intensive course transforms experienced recreational divers into dive professionals capable of guiding certified divers, assisting instructors with courses, and managing dive operations. It's the gateway to a career in the diving industry, anywhere in the world.",
      "Over a minimum of two weeks (often completed as an internship), you'll develop leadership-level knowledge of dive theory, refine your water skills to demonstration quality, and learn the practical skills of dive management. You'll work alongside our team of instructors, guiding real divers and assisting with real courses. Prerequisites include Rescue Diver certification, 40 logged dives (60 by completion), EFR within 24 months, and a medical statement signed by a physician. Upon certification, you'll join the global PADI professional community.",
    ],
    price: "00.00 EUR",
  },
  {
    slug: "reactivate-refreshment",
    title: "ReActivate (Refreshment)",
    category: "Courses",
    image: IMG.bluehole,
    tagline: "Haven't dived in a while? Refresh your skills and confidence in a single session.",
    stats: [
      { label: "Duration", value: "2 Hours" },
      { label: "Level", value: "Certified" },
      { label: "Cert", value: "Updated" },
    ],
    description: [
      "If you haven't dived in six months or more, the PADI ReActivate programme is the ideal way to ease back into the water with confidence. This refresher course reviews essential knowledge and skills, ensuring you're comfortable and safe before your next dive trip. It's quick, easy, and tailored to your experience level.",
      "The programme begins with an online knowledge review that you complete at your own pace, followed by a confined water session with one of our instructors. You'll practise equipment assembly, buoyancy control, mask clearing, alternate air source use, and other core skills. The session takes approximately two hours, after which you'll receive an updated certification card reflecting your reactivated status. All equipment is provided.",
    ],
    price: "00.00 EUR",
  },
  {
    slug: "junior-scuba-diving",
    title: "Junior Scuba Diving",
    category: "Courses",
    image: IMG.garden,
    tagline: "An underwater adventure designed especially for young explorers aged 8-9.",
    stats: [
      { label: "Max Depth", value: "2m" },
      { label: "Age", value: "8-9" },
      { label: "Duration", value: "1 Hour" },
    ],
    description: [
      "Junior Scuba Diving introduces children aged 8 and 9 to the magic of breathing underwater in a safe, fun, and age-appropriate environment. Similar to the Bubblemaker programme but with more flexibility, this experience can be conducted in a pool or in shallow, calm sea conditions — giving young adventurers a real taste of scuba diving.",
      "Under the careful supervision of our PADI instructors, children learn basic scuba skills and explore the underwater world to a maximum depth of 2 metres. Sessions are kept short and engaging, with plenty of encouragement. All equipment is child-sized and provided. Participants receive a recognition certificate and, most importantly, memories that often spark a lifelong passion for the ocean.",
    ],
    price: "00.00 EUR",
  },
  {
    slug: "junior-open-water-diver",
    title: "Junior Open Water Diver",
    category: "Courses",
    image: IMG.coral,
    tagline: "The full certification for young divers aged 10-14 — adventure with age-appropriate depth limits.",
    stats: [
      { label: "Max Depth", value: "12-18m" },
      { label: "Age", value: "10-14" },
      { label: "Duration", value: "3 Days" },
    ],
    description: [
      "The PADI Junior Open Water Diver course gives young divers aged 10-14 the same comprehensive training as the full Open Water course, with depth limits appropriate to their age. Divers aged 10-11 are certified to 12 metres, while those aged 12-14 are certified to 18 metres. This certification automatically upgrades to a full Open Water certification at age 15.",
      "The course follows the same structure as the adult programme: knowledge development, confined water training, and four open water dives. Our instructors are experienced in working with young divers and ensure the course is engaging, safe, and fun. A parent or guardian must be present during the course. Upon completion, junior divers can explore reefs worldwide with a certified parent, guardian, or PADI professional.",
    ],
    price: "00.00 EUR",
  },

  // ── Specialities ──
  {
    slug: "padi-deep-diver",
    title: "PADI Deep Diver",
    category: "Specialities",
    image: IMG.bluehole,
    tagline: "Extend your limits — explore the deeper realms of the Red Sea.",
    stats: [
      { label: "Max Depth", value: "40m" },
      { label: "Duration", value: "2 Days" },
      { label: "Dives", value: "4" },
    ],
    description: [
      "The PADI Deep Diver specialty certifies you to dive to 40 metres — the maximum depth for recreational diving. The Red Sea, with its exceptional visibility and dramatic wall dives, is the perfect location for this course. You'll learn the techniques, equipment considerations, and planning procedures for safely conducting deep dives.",
      "Over four training dives, you'll experience the physiological effects of depth, practise deep descents and ascents, learn about colour changes and pressure effects, and conduct emergency decompression procedures. You'll also learn to manage gas supply and handle the additional risks associated with deeper diving. Prerequisites: PADI Adventure Diver (or Advanced Open Water) and minimum age 15. Upon completion, you'll be certified to explore the Red Sea's deepest wrecks and walls.",
    ],
    price: "00.00 EUR",
  },
  {
    slug: "padi-night-diver",
    title: "PADI Night Diver",
    category: "Specialities",
    image: IMG.night,
    tagline: "Discover a completely different underwater world after the sun goes down.",
    stats: [
      { label: "Duration", value: "2 Days" },
      { label: "Dives", value: "3 Night" },
      { label: "Cert", value: "Included" },
    ],
    description: [
      "The underwater world transforms entirely after dark. The PADI Night Diver specialty teaches you the skills and protocols for safe, enjoyable night diving — an experience that reveals marine life and behaviours you'll never see during the day. Octopus hunting, bioluminescent plankton, sleeping parrotfish, and the vibrant colours of corals under torchlight make night diving one of diving's most magical experiences.",
      "Over three night dives, you'll learn dive light techniques, communication signals, navigation at night, and how to manage potential issues unique to low-visibility diving. You'll also experience the unforgettable moment of turning off your torch on a moonlit night to watch bioluminescent plankton sparkle around you. Prerequisites: PADI Open Water Diver and minimum age 12. All specialised equipment, including primary and backup torches, is provided.",
    ],
    price: "00.00 EUR",
  },
  {
    slug: "padi-enriched-air-nitrox",
    title: "PADI Enriched Air (Nitrox)",
    category: "Specialities",
    image: IMG.coral,
    tagline: "Dive longer, dive safer — master the use of enriched air nitrox.",
    stats: [
      { label: "Duration", value: "1 Day" },
      { label: "Dives", value: "Optional" },
      { label: "Cert", value: "Included" },
    ],
    description: [
      "The PADI Enriched Air Nitrox specialty is one of the most popular certifications in diving — and for good reason. Diving with enriched air (oxygen levels above the standard 21%) allows you to extend your bottom time, reduce surface intervals, and add an extra margin of safety on deeper dives. It's especially valuable for liveaboard diving and repetitive diving.",
      "This course can be completed in as little as one day. You'll learn the benefits and risks of enriched air, how to analyse your tank's oxygen content, equipment considerations, and how to plan dives using nitrox tables and dive computers. The course includes practical oxygen analysis sessions and, optionally, two enriched air dives. Prerequisites: PADI Open Water Diver and minimum age 12. Upon certification, you'll be able to use nitrox at dive centres worldwide.",
    ],
    price: "00.00 EUR",
  },
  {
    slug: "padi-sidemount",
    title: "PADI Sidemount",
    category: "Specialities",
    image: IMG.coral,
    tagline: "Experience a new configuration that offers flexibility, redundancy, and comfort.",
    stats: [
      { label: "Duration", value: "2 Days" },
      { label: "Dives", value: "4" },
      { label: "Cert", value: "Included" },
    ],
    description: [
      "Originally developed by cave divers, sidemount diving has become increasingly popular among recreational divers for its comfort, flexibility, and safety benefits. Instead of wearing tanks on your back, you carry two cylinders alongside your body — reducing strain on your back, providing redundant gas supply, and making it easier to enter and exit the water.",
      "Over four training dives, you'll learn sidemount equipment configuration, cylinder management, gas switching, and emergency procedures. The course covers the benefits of sidemount for divers with back issues, those interested in technical diving, and photographers who need the additional flexibility. Prerequisites: PADI Open Water Diver, minimum age 15, and 20 logged dives. All specialised sidemount equipment is provided.",
    ],
    price: "00.00 EUR",
  },
  {
    slug: "padi-wreck-diver",
    title: "PADI Wreck Diver",
    category: "Specialities",
    image: IMG.wreck,
    tagline: "Unlock the mysteries of sunken vessels — learn to safely explore Red Sea wrecks.",
    stats: [
      { label: "Duration", value: "2 Days" },
      { label: "Dives", value: "4" },
      { label: "Cert", value: "Included" },
    ],
    description: [
      "The Red Sea is home to some of the world's most famous wreck dives, from the legendary SS Thistlegorm to the wrecks of Abu Nuhas reef. The PADI Wreck Diver specialty teaches you the skills to safely explore these underwater museums — mapping wrecks, assessing hazards, and conducting penetration dives within the light zone.",
      "Over four training dives, you'll learn wreck navigation and mapping, techniques for avoiding silt-out, the use of penetration lines and reels, and emergency procedures for wreck diving. You'll also study the history of the wrecks you dive, adding context and depth to the experience. Prerequisites: PADI Adventure Diver and minimum age 15. Upon completion, you'll be certified to plan and execute wreck penetration dives worldwide.",
    ],
    price: "00.00 EUR",
  },

  // ── Liveaboard Adventure ──
  {
    slug: "north-safari",
    title: "North Safari",
    category: "Liveaboard Adventure",
    image: IMG.wreck,
    tagline: "A multi-day liveaboard expedition to the Red Sea's legendary northern wrecks and reefs.",
    stats: [
      { label: "Duration", value: "5-7 Days" },
      { label: "Level", value: "Advanced" },
      { label: "Dives/Day", value: "Up to 4" },
    ],
    diveSites: [
      "SS Thistlegorm",
      "Abu Nuhas",
      "Ras Mohammed Marine Park",
      "Gubal",
      "Abu Galawa North",
      "South Gemini",
    ],
    description: [
      "Our North Safari is the definitive Red Sea liveaboard experience — a multi-day voyage to the most celebrated wrecks and reefs of the northern Red Sea. Aboard our 28-metre luxury vessel, you'll wake each morning at a new dive site, with up to four dives per day and the freedom of a liveaboard schedule that means no daily travel time to and from shore.",
      "Your journey takes you to the SS Thistlegorm, the legendary World War II wreck; Abu Nuhas, the 'ship graveyard' with four wrecks on a single reef; the world-famous walls of Ras Mohammed Marine Park; the sheltered lagoons of Gubal and Abu Galawa North; and the pinnacles of South Gemini. Each site offers something unique — from penetrating wreck dives to drift dives along walls carpeted in soft corals. Expect pelagic encounters, extraordinary visibility, and the camaraderie of a small group of fellow divers.",
      "Your liveaboard includes all meals prepared by our onboard chef, ensuite cabins, unlimited diving (conditions permitting), nitrox for certified divers, and all port and marine park fees. With a maximum of 12 guests, our North Safari maintains the intimacy and luxury that defines Napoleon RedSea Diver.",
    ],
    price: "00.00 EUR",
  },
  {
    slug: "south-safari",
    title: "South Safari",
    category: "Liveaboard Adventure",
    image: IMG.bluehole,
    tagline: "An immersive liveaboard journey through the pristine southern Red Sea.",
    stats: [
      { label: "Duration", value: "5-7 Days" },
      { label: "Level", value: "Advanced" },
      { label: "Dives/Day", value: "Up to 4" },
    ],
    diveSites: [
      "Marsa Shona",
      "Sataya",
      "Abu Galawa Soraya",
      "Shaab Marsa Alam",
      "Abu Dabbab",
      "Fury Shoal",
      "Shaab Maksour",
    ],
    description: [
      "Our South Safari takes you to the less-travelled, pristine reefs of the southern Red Sea — a region known for its abundant marine life, dramatic wall dives, and the famous dolphin encounters at Sataya reef. Far from the crowds of the northern sites, the southern Red Sea offers a more remote, adventurous liveaboard experience for divers who have already experienced the classics.",
      "Your voyage includes the rolling reefs of Marsa Shona and Shaab Marsa Alam; the spinner dolphin sanctuary at Sataya; the coral gardens of Abu Galawa Soraya; the dugong-inhabited seagrass beds of Abu Dabbab; the pelagic paradise of Fury Shoal; and the deep walls of Shaab Maksour. The southern Red Sea is renowned for its shark encounters — oceanic whitetips, grey reefs, and the occasional hammerhead — as well as its pristine, uncrowded reef systems.",
      "Your liveaboard includes all meals prepared by our onboard chef, ensuite cabins, unlimited diving (conditions permitting), nitrox for certified divers, and all port and marine park fees. The southern sites are best suited to advanced divers with experience in drift diving and moderate currents. With a maximum of 12 guests, this is the ultimate expression of the Napoleon RedSea Diver experience.",
    ],
    price: "00.00 EUR",
  },
];

export const getActivityBySlug = (slug) => activities.find((a) => a.slug === slug);