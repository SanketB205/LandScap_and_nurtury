import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

// Models
import User from "./models/User.js";
import Service from "./models/services.js";
import Plant from "./models/Plant.js";
import Project from "./models/Project.js";
import Inquiry from "./models/Inquiry.js";
import SiteSettings from "./models/SiteSettings.js";
import Testimonial from "./models/Testimonial.js";
import Quotation from "./models/Quotation.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI ||
  process.env.mongourl ||
  "mongodb://localhost:27017/Nursery";

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing collections
    await Promise.all([
      User.deleteMany({}),
      Service.deleteMany({}),
      Plant.deleteMany({}),
      Project.deleteMany({}),
      Inquiry.deleteMany({}),
      SiteSettings.deleteMany({}),
      Testimonial.deleteMany({}),
      Quotation.deleteMany({}),
    ]);
    console.log("Cleared old database records.");

    const admin = await User.create({
      name: "Janai Admin",
      email: "admin@janailandscape.com",
      password: "Admin@Janai2026",
      role: "admin",
      phone: "+91 97676 71968",
    });

    await User.create({
      name: "Rahul Deshmukh",
      email: "rahul.deshmukh@example.com",
      password: "Customer@123",
      role: "customer",
      phone: "+91 98220 12345",
    });

    console.log("Admin user created: admin@janailandscape.com / Admin@Janai2026");

    // 2. Seed 8 Core Services
    const services = [
      {
        title: "Landscape Design and Planning",
        slug: "landscape-design-and-planning",
        category: "Landscaping",
        shortDescription:
          "Architectural 2D & 3D master plans, plant selection, elevation grading, and outdoor living space concepts tailored for Pune villas and commercial properties.",
        intro:
          "Transform your raw outdoor area into an architectural paradise. Our horticulture architects combine environmental climate modeling for Maharashtra with aesthetic balance, zoning your property for relaxation, entertaining, and verdant beauty.",
        bannerImage:
          "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=1200&q=80",
        startingPrice: 4500,
        priceUnit: "per design plan",
        features: [
          "2D Master CAD Layout & 3D Photorealistic Visualizations",
          "Hardscape planning (pathways, pergolas, retaining walls, water features)",
          "Micro-climate and soil fertility assessments",
          "Native and drought-resilient plant zoning schedule",
          "Complete execution blueprint with material take-offs",
        ],
        advantages: [
          "Eliminates costly construction guesswork and material wastage",
          "Maximizes Pune monsoon drainage and sun path orientation",
          "Boosts property market value by up to 20%",
        ],
        faqs: [
          {
            question: "How long does a landscape design plan take to complete?",
            answer:
              "Typically 7 to 10 working days, including the initial physical site assessment in Pune, 2D drafts, and final 3D rendering reviews.",
          },
          {
            question: "Do you also execute the design you create?",
            answer:
              "Yes! We offer turnkey design-build execution where our nursery team, earthmovers, and agronomists implement the approved design seamlessly.",
          },
        ],
        isFeatured: true,
        status: "active",
      },
      {
        title: "Garden Development and Maintenance",
        slug: "garden-development-and-maintenance",
        category: "Garden Maintenance",
        shortDescription:
          "Turnkey garden creation, soil revitalization, ornamental beds, regular hedging, pest management, and seasonal fertilizing programs.",
        intro:
          "A stunning garden requires expert biological care. Janai Landscape Services provides complete development followed by scheduled weekly and monthly maintenance packages to keep your garden lush all year round.",
        bannerImage:
          "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80",
        startingPrice: 3500,
        priceUnit: "per month",
        features: [
          "Nutrient-enriched red soil filling & organic vermicomposting",
          "Precision hedge trimming, shrub shaping, and lawn edging",
          "Integrated eco-friendly pest and disease control",
          "Seasonal flowering plant rotation",
          "Dedicated trained gardener deployment with agronomist supervision",
        ],
        advantages: [
          "Consistently vibrant greenery without homeowner labor",
          "Early disease detection prevents plant loss",
          "Custom watering and fertilizing schedules adapted to Pune weather",
        ],
        faqs: [
          {
            question: "What maintenance frequencies do you offer?",
            answer:
              "We provide weekly (4 visits/month), bi-weekly (8 visits/month), or full-time residential gardener deployments.",
          },
        ],
        isFeatured: true,
        status: "active",
      },
      {
        title: "Natural Grass and Artificial Turf Installation",
        slug: "natural-grass-and-artificial-turf-installation",
        category: "Turf Installation",
        shortDescription:
          "Top-grade natural carpet lawns (Selection 1, Korean, Bermuda) and 25mm–45mm UV-stabilized artificial grass for balconies, terraces, and lawns.",
        intro:
          "Whether you crave the cool, fresh dew of living grass or the maintenance-free, pet-safe perfection of high-density synthetic turf, we supply and install Maharashtra's highest standard turf systems.",
        bannerImage:
          "https://images.unsplash.com/photo-1598514982205-f45d6d5ed3f1?auto=format&fit=crop&w=1200&q=80",
        startingPrice: 35,
        priceUnit: "per sq ft",
        features: [
          "Fresh sod harvested directly from our Pune nursery farms",
          "Varieties: Selection One, Korean Grass, Bermuda Grass, Mexican Grass",
          "35mm–40mm 4-tone UV-resistant realistic artificial grass",
          "Engineered crushed-aggregate base and geotextile weed barriers",
          "Laser-level compacting for seamless puddle-free drainage",
        ],
        advantages: [
          "Zero mud tracking during Pune monsoon downpours",
          "Artificial turf saves 100% of watering costs and mowing labor",
          "Natural sod creates a cooling microclimate reducing ambient heat",
        ],
        faqs: [
          {
            question: "Is artificial grass safe for pets and children?",
            answer:
              "Absolutely. Our synthetic turfs are lead-free, non-toxic, anti-bacterial, and designed with rapid drainage perforations.",
          },
        ],
        isFeatured: true,
        status: "active",
      },
      {
        title: "Sports Ground and Sports Field Development",
        slug: "sports-ground-and-sports-field-development",
        category: "Sports Field",
        shortDescription:
          "FIFA-standard artificial football turfs, cricket practice box nets, multi-sport courts, and professional natural grass sports ground leveling.",
        intro:
          "From commercial football turfs in Pune to school athletic complexes and corporate sports grounds, we engineer high-performance sporting infrastructure built to endure heavy play.",
        bannerImage:
          "https://images.unsplash.com/photo-1587502536263-9298d2fbd3f6?auto=format&fit=crop&w=1200&q=80",
        startingPrice: 110,
        priceUnit: "per sq ft",
        features: [
          "50mm Monofilament spine football turf with SBR rubber infill & silica sand",
          "Sub-base slope engineering with herringbone perforated drainage pipes",
          "High-tensile UV-treated perimeter netting & steel enclosure structures",
          "High-lumen LED floodlighting design for night gaming",
          "Cricket practice wickets with natural and artificial batting mats",
        ],
        advantages: [
          "Drains torrential monsoon rain in under 15 minutes",
          "Exceptional ball roll, bounce, and shock absorption for player safety",
          "High commercial return on investment for turf venue operators",
        ],
        faqs: [
          {
            question: "How long does a full football turf installation take?",
            answer:
              "A standard 5-a-side to 7-a-side turf arena generally takes 18 to 25 days including sub-base grading, asphalt/PCC, turf laying, and lighting.",
          },
        ],
        isFeatured: true,
        status: "active",
      },
      {
        title: "Nursery Plants and Gardening Supplies",
        slug: "nursery-plants-and-gardening-supplies",
        category: "Nursery",
        shortDescription:
          "Direct nursery wholesale supply of air-purifying indoor plants, flowering shrubs, avenue trees, ceramic planters, organic fertilizers, and potting mixes.",
        intro:
          "Visit our sprawling nursery in Pune or order directly for site delivery. We cultivate healthy, climate-acclimatized plants backed by horticultural care guides for lasting growth.",
        bannerImage:
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
        startingPrice: 120,
        priceUnit: "per plant",
        features: [
          "Acclimatized indoor plants (Areca Palms, Snake Plants, Monsteras, ZZ)",
          "Flowering perennials (Hibiscus, Bougainvillea, Champa, Ixora)",
          "Shade and avenue trees (Neem, Gulmohar, Tabebuia, Badam)",
          "Organic vermicompost, neem cake, and cocopeat blocks",
          "Bulk delivery and planting labor available across Pune and PCMC",
        ],
        advantages: [
          "Direct nursery pricing without middleman retail markups",
          "Guaranteed healthy root balls and pest-free stock",
          "Guidance from experienced horticulturists on site compatibility",
        ],
        faqs: [
          {
            question: "Do you supply plants in bulk for housing societies and developers?",
            answer:
              "Yes, we regularly fulfill large-scale nursery orders for residential townships, IT parks, and villa communities.",
          },
        ],
        isFeatured: true,
        status: "active",
      },
      {
        title: "Irrigation Systems (Drip & Sprinkler)",
        slug: "irrigation-systems-drip-and-sprinkler",
        category: "Irrigation",
        shortDescription:
          "Automated smart drip irrigation, pop-up gear sprinklers, micro-misters, and timer controllers designed to conserve up to 60% of garden water.",
        intro:
          "Protect your landscape investment with intelligent watering. Our precision hydraulic irrigation networks deliver exact root-zone hydration automatically, even when you travel.",
        bannerImage:
          "https://images.unsplash.com/photo-1598515213694-70c3f46c22b5?auto=format&fit=crop&w=1200&q=80",
        startingPrice: 18,
        priceUnit: "per sq ft",
        features: [
          "Concealed pop-up rotary sprinklers for seamless lawn coverage",
          "Pressure-compensating drip lateral lines with clog-resistant drippers",
          "Smart Wi-Fi and solar-compatible automated solenoid timer valves",
          "Filter stations and fertilizer venturi injectors for fertigation",
          "Zone isolation valves for low pressure balancing",
        ],
        advantages: [
          "Reduces water consumption by 50% to 70% compared to hose pipes",
          "Prevents root rot and leaf fungal diseases from over-watering",
          "Automates garden care so lawns thrive effortlessly",
        ],
        faqs: [
          {
            question: "Can an irrigation system be installed in an existing garden?",
            answer:
              "Yes! We use trenchless and micro-trench methods to lay concealed piping with minimal disturbance to your established lawn.",
          },
        ],
        isFeatured: false,
        status: "active",
      },
      {
        title: "Residential and Commercial Landscaping",
        slug: "residential-and-commercial-landscaping",
        category: "Landscaping",
        shortDescription:
          "End-to-end landscape architecture for residential villas, IT campuses, hotels, hospitals, and real estate developer township clubhouses.",
        intro:
          "We create inspiring outdoor spaces that reflect your brand identity and provide peaceful natural retreats. From conceptual master planning to turnkey handover.",
        bannerImage:
          "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80",
        startingPrice: 45,
        priceUnit: "per sq ft",
        features: [
          "Site clearance, leveling, and heavy soil amendment",
          "Water bodies, koi ponds, cascading waterfalls, and fountains",
          "Stone pathways, gazebos, pergolas, and outdoor seating plazas",
          "Security-perimeter dense green barrier hedging",
          "Post-handover maintenance and warranty coverage",
        ],
        advantages: [
          "Single point of responsibility from design through completion",
          "Strict adherence to timelines and safety protocols",
          "Enhanced corporate appeal and IGBC green building compliance support",
        ],
        faqs: [
          {
            question: "Do you handle projects outside Pune city?",
            answer:
              "We service all regions across Pune, PCMC, Lonavala, Khandala, Mulshi, Talegaon, and surrounding Maharashtra districts.",
          },
        ],
        isFeatured: false,
        status: "active",
      },
      {
        title: "Lawn Renovation and Maintenance",
        slug: "lawn-renovation-and-maintenance",
        category: "Garden Maintenance",
        shortDescription:
          "Revive patchy, weed-infested, or compacted lawns with core aeration, dethatching, topdressing, overseeding, and organic fertilization.",
        intro:
          "Don't replace your stressed lawn—restore it! Our lawn renovation program restores yellowing or patchy grass into a velvety, dense green carpet in 3 to 4 weeks.",
        bannerImage:
          "https://images.unsplash.com/photo-1524594154908-edd5534f0c87?auto=format&fit=crop&w=1200&q=80",
        startingPrice: 15,
        priceUnit: "per sq ft",
        features: [
          "Mechanical dethatching to remove dead moss and choked roots",
          "Deep core aeration relieving compacted Maharashtra black cotton soil",
          "Nutrient top-dressing with washed river sand and compost blend",
          "Spot sod patching or overseeding with disease-resistant seed",
          "Broadleaf selective weed control and grub eradication",
        ],
        advantages: [
          "Fraction of the cost of completely stripping and relaying new grass",
          "Significantly improves root oxygenation and water absorption",
          "Noticeable green surge and lush softness within 15–20 days",
        ],
        faqs: [
          {
            question: "When is the best time to renovate a lawn in Pune?",
            answer:
              "Immediately before or during the monsoons (June–August) and in early spring (February–March) when root activity is strongest.",
          },
        ],
        isFeatured: false,
        status: "active",
      },
    ];

    await Service.insertMany(services);
    console.log("Seeded 8 Services.");

    // 3. Seed Nursery Plants Catalog
    const plants = [
      {
        name: "Areca Palm (Chrysalidocarpus)",
        botanicalName: "Dypsis lutescens",
        category: "indoor",
        description:
          "Popular tropical feather palm with lush golden-green arching fronds. Acts as an efficient natural air purifier, filtering indoor xylene and toluene.",
        careInstructions:
          "Water when the top 1-2 inches of soil feel dry. Place in bright, indirect sunlight. Mist fronds occasionally during dry months.",
        sunlight: "Indirect Bright",
        watering: "Moderate",
        space: "Medium",
        isIndoor: true,
        price: 450,
        stockQuantity: 40,
        inStock: true,
        images: [
          "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
        ],
        isFeatured: true,
      },
      {
        name: "Snake Plant (Golden Hahnii)",
        botanicalName: "Sansevieria trifasciata",
        category: "indoor",
        description:
          "Virtually indestructible architectural plant with rigid sword-like leaves edged in vibrant yellow. Excellent oxygen producer through the night.",
        careInstructions:
          "Extremely drought tolerant. Water sparingly every 2–3 weeks. Thrives in low light to bright indirect sunlight. Avoid overwatering.",
        sunlight: "Low Light",
        watering: "Low",
        space: "Small",
        isIndoor: true,
        price: 250,
        stockQuantity: 65,
        inStock: true,
        images: [
          "https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=800&q=80",
        ],
        isFeatured: true,
      },
      {
        name: "Royal Red Hibiscus",
        botanicalName: "Hibiscus rosa-sinensis",
        category: "flowering",
        description:
          "Stunning perennial tropical shrub that produces massive, vibrant red blooms year-round in Pune's warm climate. Loved by butterflies and pollinators.",
        careInstructions:
          "Requires full sunlight (at least 5–6 hours daily). Keep soil consistently moist but well drained. Feed with organic potash fertilizer monthly.",
        sunlight: "Full Sun",
        watering: "Moderate",
        space: "Medium",
        isIndoor: false,
        price: 180,
        stockQuantity: 50,
        inStock: true,
        images: [
          "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80",
        ],
        isFeatured: true,
      },
      {
        name: "Bougainvillea (Spectabilis Variegated)",
        botanicalName: "Bougainvillea spectabilis",
        category: "flowering",
        description:
          "Hardy, vibrant climbing vine capable of transforming compound walls, pergolas, and balconies into blankets of intense pink, purple, or orange blossoms.",
        careInstructions:
          "Thrives in intense hot sunlight with minimal water. Prune aggressively after blooming to stimulate heavy flower flushes.",
        sunlight: "Full Sun",
        watering: "Low",
        space: "Large",
        isIndoor: false,
        price: 220,
        stockQuantity: 35,
        inStock: true,
        images: [
          "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80",
        ],
        isFeatured: true,
      },
      {
        name: "Ficus Microcarpa Bonsai",
        botanicalName: "Ficus microcarpa",
        category: "ornamental",
        description:
          "Sculptural centerpiece with exposed aerial roots and glossy deep-green canopy. Adds instant serenity and Zen elegance to verandas and living rooms.",
        careInstructions:
          "Prefers warm, humid environments with bright filtered light. Allow soil to dry slightly between thorough waterings.",
        sunlight: "Indirect Bright",
        watering: "Moderate",
        space: "Small",
        isIndoor: true,
        price: 1200,
        stockQuantity: 15,
        inStock: true,
        images: [
          "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80",
        ],
        isFeatured: false,
      },
      {
        name: "Peace Lily (Spathiphyllum)",
        botanicalName: "Spathiphyllum wallisii",
        category: "indoor",
        description:
          "Graceful shade-loving indoor beauty showcasing deep green foliage and pristine white spathe flowers. Excellent indicator plant that drops when thirsty.",
        careInstructions:
          "Keep away from harsh direct sun. Water once weekly or when leaves begin to soften. Prefers high humidity.",
        sunlight: "Low Light",
        watering: "Moderate",
        space: "Small",
        isIndoor: true,
        price: 320,
        stockQuantity: 30,
        inStock: true,
        images: [
          "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=800&q=80",
        ],
        isFeatured: false,
      },
      {
        name: "Selection One Natural Carpet Grass (Sod)",
        botanicalName: "Zoysia japonica cultivar",
        category: "lawn-grass",
        description:
          "Dense, fine-bladed, velvety green turf variety specifically bred for Indian home gardens and villa lawns. Highly weed competitive once rooted.",
        careInstructions:
          "Water daily in the morning during first 3 weeks. Mow every 12–15 days to a height of 1.5–2 inches. Fertilize with nitrogen every quarter.",
        sunlight: "Full Sun",
        watering: "High",
        space: "Large",
        isIndoor: false,
        price: 32,
        stockQuantity: 5000,
        inStock: true,
        images: [
          "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=800&q=80",
        ],
        isFeatured: true,
      },
      {
        name: "Monstera Deliciosa (Swiss Cheese Plant)",
        botanicalName: "Monstera deliciosa",
        category: "indoor",
        description:
          "Iconic statement indoor plant famous for its dramatic fenestrated leaves. Brings a striking tropical forest aesthetic into homes and modern offices.",
        careInstructions:
          "Position in bright, indirect light. Water when the top half of soil dries. Wipe large leaves with a damp cloth to promote photosynthesis.",
        sunlight: "Indirect Bright",
        watering: "Moderate",
        space: "Large",
        isIndoor: true,
        price: 650,
        stockQuantity: 20,
        inStock: true,
        images: [
          "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
        ],
        isFeatured: true,
      },
      {
        name: "Champa / White Frangipani",
        botanicalName: "Plumeria alba",
        category: "trees",
        description:
          "Fragrant, sculptural ornamental tree with milky white blossoms centered with radiant yellow. Very drought-tolerant once established.",
        careInstructions:
          "Full sun exposure required for heavy flower production. Extremely drought tolerant. Requires well-drained sandy-loam soil.",
        sunlight: "Full Sun",
        watering: "Low",
        space: "Large",
        isIndoor: false,
        price: 550,
        stockQuantity: 25,
        inStock: true,
        images: [
          "https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=800&q=80",
        ],
        isFeatured: false,
      },
      {
        name: "Golden Bamboo Hedge Plant",
        botanicalName: "Phyllostachys aurea",
        category: "shrubs",
        description:
          "Fast-growing dense privacy screen plant with upright yellow-golden canes. Creates a natural sound barrier and windbreak for properties.",
        careInstructions:
          "Thrives in sun or light shade. Keep well-watered during the first growing season. Trim tops annually to desired hedge height.",
        sunlight: "Full Sun",
        watering: "Moderate",
        space: "Large",
        isIndoor: false,
        price: 380,
        stockQuantity: 40,
        inStock: true,
        images: [
          "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80",
        ],
        isFeatured: false,
      },
    ];

    await Plant.insertMany(plants);
    console.log("Seeded 10 Nursery Plants.");

    // 4. Seed Completed Projects across Pune
    const projects = [
      {
        title: "Koregaon Park Luxury Villa Garden",
        slug: "koregaon-park-luxury-villa-garden",
        location: "Koregaon Park, Pune",
        category: "Residential",
        description:
          "Complete transformation of a 4,200 sq ft barren backyard into an opulent tropical oasis featuring Korean carpet lawn, custom stone waterfall, automated drip irrigation, and exotic palm borders.",
        clientName: "Dr. K. Singhania",
        area: "4,200 sq ft",
        beforeImage:
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
        afterImage:
          "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=1200&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1598514982205-f45d6d5ed3f1?auto=format&fit=crop&w=800&q=80",
        ],
        completionDate: new Date("2025-11-15"),
        isFeatured: true,
        status: "published",
      },
      {
        title: "Hinjewadi Tech Park Green Plaza & Turf",
        slug: "hinjewadi-tech-park-green-plaza-turf",
        location: "Hinjewadi Phase 2, Pune",
        category: "Commercial",
        description:
          "Engineered 12,000 sq ft corporate recreation campus with high-density UV-treated artificial turf, shade pergola pavilions, geometric planters, and low-maintenance native horticulture.",
        clientName: "CyberSpire Tech Campus",
        area: "12,000 sq ft",
        beforeImage:
          "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80",
        afterImage:
          "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1598515213694-70c3f46c22b5?auto=format&fit=crop&w=800&q=80",
        ],
        completionDate: new Date("2025-08-20"),
        isFeatured: true,
        status: "published",
      },
      {
        title: "Balewadi Arena Multi-Sport Football Turf",
        slug: "balewadi-arena-multi-sport-football-turf",
        location: "Balewadi High Street, Pune",
        category: "Sports Turf",
        description:
          "Turnkey construction of a 7-a-side commercial football arena using 50mm spine turf, laser-graded sub-base with perforated storm drainage, safety side padding, and 4-mast floodlighting.",
        clientName: "KickOff Sports Academy",
        area: "8,500 sq ft",
        beforeImage:
          "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
        afterImage:
          "https://images.unsplash.com/photo-1587502536263-9298d2fbd3f6?auto=format&fit=crop&w=1200&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1524594154908-edd5534f0c87?auto=format&fit=crop&w=800&q=80",
        ],
        completionDate: new Date("2025-10-05"),
        isFeatured: true,
        status: "published",
      },
      {
        title: "Baner Penthouse Terrace & Sky Garden",
        slug: "baner-penthouse-terrace-and-sky-garden",
        location: "Baner-Pashan Link Road, Pune",
        category: "Terrace Garden",
        description:
          "Weight-optimized rooftop garden featuring 35mm artificial lawn, waterproof root barrier membranes, automated micro-drip planters, ambient warm lighting, and a vertical herb green wall.",
        clientName: "Mr. Vikram Joshi",
        area: "1,800 sq ft",
        beforeImage:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        afterImage:
          "https://images.unsplash.com/photo-1598515213694-70c3f46c22b5?auto=format&fit=crop&w=1200&q=80",
        gallery: [],
        completionDate: new Date("2026-01-18"),
        isFeatured: false,
        status: "published",
      },
      {
        title: "Kothrud Heritage Bungalow Lawn Renovation",
        slug: "kothrud-heritage-bungalow-lawn-renovation",
        location: "Mayur Colony, Kothrud, Pune",
        category: "Residential",
        description:
          "Comprehensive restoration of a compacted 20-year-old lawn. Core aerated, graded with compost-enriched red soil, and relaid with fresh Selection One sod with hidden pop-up sprinklers.",
        clientName: "Mrs. Anjali Kulkarni",
        area: "2,500 sq ft",
        beforeImage:
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
        afterImage:
          "https://images.unsplash.com/photo-1524594154908-edd5534f0c87?auto=format&fit=crop&w=1200&q=80",
        gallery: [],
        completionDate: new Date("2026-02-10"),
        isFeatured: false,
        status: "published",
      },
    ];

    await Project.insertMany(projects);
    console.log("Seeded 5 Projects.");

    // 5. Seed SiteSettings
    await SiteSettings.create({
      companyName: "Janai Landscape Services",
      tagline: "Transform Your Outdoors Into Something Extraordinary",
      phone: "+91 97676 71968",
      email: "contact@janailandscape.com",
      address:
        "Survey No. 42, Near D-Mart, Baner-Balewadi Road, Pune, Maharashtra 411045",
      operatingHours:
        "Mon–Sat: 8:30 AM – 7:30 PM, Sun: 9:00 AM – 2:00 PM",
      whatsappNumber: "919767671968",
      googleMapsEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.164369483321!2d73.78440787595304!3d18.56661146776118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf30f6587d19%3A0x6e38b3684a2ef695!2sBaner%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
      socialLinks: {
        facebook: "https://facebook.com/janailandscape",
        instagram: "https://instagram.com/janailandscape",
        youtube: "https://youtube.com/@janailandscapeservices",
        linkedin: "https://linkedin.com/company/janai-landscape-services",
      },
      pricingRules: {
        naturalLawnPerSqFt: 35,
        artificialTurfPerSqFt: 75,
        dripIrrigationPerSqFt: 18,
        sprinklerSystemPerSqFt: 28,
        soilPreparationPerSqFt: 12,
        landscapeDesignBaseRate: 4500,
        sportsTurfPerSqFt: 110,
        maintenancePerMonthBase: 3500,
      },
    });
    console.log("Seeded SiteSettings & Pricing Rules.");

    // 6. Seed Testimonials
    const testimonials = [
      {
        name: "Vikram Shinde",
        role: "Villa Owner, Koregaon Park",
        location: "Koregaon Park, Pune",
        content:
          "Janai Landscape Services completely revamped our outdoor garden space. From soil preparation to laying fresh Korean grass and putting in automated drippers, their crew was punctual, respectful, and delivered exceptional quality.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        isFeatured: true,
      },
      {
        name: "Pooja Mehta",
        role: "Terrace Garden Owner, Baner",
        location: "Baner, Pune",
        content:
          "We wanted a low-maintenance artificial turf setup on our 14th-floor terrace in Baner. They did proper waterproofing protection and installed 35mm lush green grass. Our family spends every evening there now!",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        isFeatured: true,
      },
      {
        name: "Abhishek Kulkarni",
        role: "Sports Club Director, Balewadi",
        location: "Balewadi, Pune",
        content:
          "Constructing a full football turf in Pune during pre-monsoon was tricky, but Janai's team engineered the slope drainage flawlessly. Heavy rains don't flood our pitch at all. Highly recommended for commercial projects.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        isFeatured: true,
      },
    ];
    await Testimonial.insertMany(testimonials);
    console.log("Seeded Testimonials.");

    // 7. Seed Sample Inquiries
    const inquiries = [
      {
        referenceId: "JLS-INQ-10492",
        type: "quote",
        name: "Amit Patel",
        phone: "+91 98901 23456",
        email: "amit.patel@gmail.com",
        serviceName: "Natural Grass and Artificial Turf Installation",
        propertyType: "Residential Villa",
        areaSqFt: 1200,
        location: "Wakad, Pune",
        budgetRange: "₹50,000 - ₹1,00,000",
        message: "Looking to install Selection 1 natural grass lawn in our backyard with sprinkler watering.",
        status: "New",
        statusHistory: [
          { status: "New", changedAt: new Date(), note: "Inquiry received via website." },
        ],
      },
      {
        referenceId: "JLS-INQ-20831",
        type: "site-visit",
        name: "Sneha Deshpande",
        phone: "+91 97654 32109",
        email: "sneha.d@outlook.com",
        serviceName: "Landscape Design and Planning",
        propertyType: "Farmhouse",
        areaSqFt: 5000,
        location: "Mulshi Road, Pune",
        budgetRange: "₹1,00,000+",
        message: "Need complete landscape master planning for a 1-acre weekend home in Mulshi.",
        status: "Contacted",
        internalNotes: [
          { note: "Called client. Site visit scheduled for coming Saturday 11 AM.", author: "Janai Admin" },
        ],
        statusHistory: [
          { status: "New", changedAt: new Date(Date.now() - 86400000), note: "Inquiry received." },
          { status: "Contacted", changedAt: new Date(), note: "Initial phone consultation done." },
        ],
      },
    ];
    await Inquiry.insertMany(inquiries);
    console.log("Seeded Inquiries.");

    console.log("✅ All Database Seeding Completed Successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
};

seedData();
