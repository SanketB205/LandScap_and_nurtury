import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

// Models
import User from "./models/User.js";
import Service from "./models/services.js";
import Plant from "./models/Plant.js";
import Project from "./models/Project.js";
import SiteSettings from "./models/SiteSettings.js";
import Testimonial from "./models/Testimonial.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI ||
  process.env.mongourl ||
  "mongodb://localhost:27017/Nursery";

// Check if admin already exists — seed is idempotent and safe to re-run
const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // --- 1. Admin provisioning (only if no admin exists) ---
    const existingAdmin = await User.findOne({ role: "admin" });
    if (!existingAdmin) {
      const adminPassword = process.env.ADMIN_INITIAL_PASSWORD;
      if (!adminPassword) {
        console.error("❌ ADMIN_INITIAL_PASSWORD environment variable is required for seeding.");
        process.exit(1);
      }

      // Validate password strength
      if (adminPassword.length < 8) {
        console.error("❌ ADMIN_INITIAL_PASSWORD must be at least 8 characters.");
        process.exit(1);
      }

      const admin = await User.create({
        name: "Janai Administrator",
        email: "admin@janailandscape.com",
        password: adminPassword,
        role: "admin",
        phone: process.env.ADMIN_PHONE || "+91 97676 71968",
      });
      console.log(`✅ Admin user created: admin@janailandscape.com`);
      console.log("⚠️  Please change this password after first login.");
    } else {
      console.log("ℹ️  Admin user already exists. Skipping admin creation.");
    }

    // --- 2. Site Settings (idempotent) ---
    let settings = await SiteSettings.findOne();
    if (!settings) {
      await SiteSettings.create({
        companyName: "Janai Landscape Services",
        tagline: "Transform Your Outdoors Into Something Extraordinary",
        phone: "+91 97676 71968",
        email: "contact@janailandscape.com",
        address: "Survey No. 42, Near D-Mart, Baner-Balewadi Road, Pune, Maharashtra 411045",
        operatingHours: "Mon–Sat: 8:30 AM – 7:30 PM, Sun: 9:00 AM – 2:00 PM",
        whatsappNumber: "919767671968",
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
        taxConfig: {
          enabled: true,
          percent: 18,
          label: "GST",
          note: "This is an estimate, not a tax invoice. Final pricing may vary after site inspection.",
        },
      });
      console.log("✅ Site settings created.");
    } else {
      console.log("ℹ️  Site settings already exist. Skipping.");
    }

    // --- 3. Seed Services (only if collection is empty) ---
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      const services = [
        {
          title: "Landscape Design and Planning",
          slug: "landscape-design-and-planning",
          category: "Landscaping",
          shortDescription: "Architectural 2D & 3D master plans, plant selection, elevation grading, and outdoor living space concepts.",
          intro: "Transform your outdoor area into an architectural paradise with 2D/3D masterplans tailored for Pune properties.",
          bannerImage: "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=1200&q=80",
          startingPrice: 4500,
          priceUnit: "per design plan",
          unit: "per_project",
          features: [
            "2D Master CAD Layout & 3D Photorealistic Visualizations",
            "Hardscape planning (pathways, pergolas, retaining walls)",
            "Soil fertility and micro-climate assessments",
            "Native plant zoning schedule",
          ],
          advantages: [
            "Eliminates costly construction guesswork",
            "Maximizes Pune monsoon drainage",
            "Boosts property market value",
          ],
          isFeatured: true,
          status: "active",
          seoTitle: "Landscape Design and Planning - Janai Landscape Services Pune",
          seoDescription: "Professional 2D & 3D landscape design and planning services in Pune, Maharashtra.",
        },
        {
          title: "Garden Development and Maintenance",
          slug: "garden-development-and-maintenance",
          category: "Garden Maintenance",
          shortDescription: "Turnkey garden creation, soil revitalization, and seasonal maintenance programs.",
          intro: "Complete garden development and scheduled maintenance for Pune homes and commercial properties.",
          bannerImage: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80",
          startingPrice: 3500,
          priceUnit: "per month",
          unit: "per_project",
          features: [
            "Nutrient-enriched soil and organic composting",
            "Hedge trimming and lawn edging",
            "Eco-friendly pest control",
            "Seasonal plant rotation",
          ],
          advantages: [
            "Vibrant greenery without homeowner labor",
            "Early disease detection",
            "Pune-weather adapted schedules",
          ],
          isFeatured: true,
          status: "active",
          seoTitle: "Garden Development and Maintenance - Pune",
          seoDescription: "Garden development and maintenance services in Pune by Janai Landscape Services.",
        },
        {
          title: "Natural Grass and Artificial Turf Installation",
          slug: "natural-grass-and-artificial-turf-installation",
          category: "Turf Installation",
          shortDescription: "Natural carpet lawns and UV-stabilized artificial grass for lawns, terraces, and balconies.",
          intro: "Supply and installation of natural sod and synthetic turf for Pune properties.",
          bannerImage: "https://images.unsplash.com/photo-1598514982205-f45d6d5ed3f1?auto=format&fit=crop&w=1200&q=80",
          startingPrice: 35,
          priceUnit: "per sq ft",
          unit: "square_feet",
          features: [
            "Selection One, Korean, Bermuda grass varieties",
            "35mm-45mm UV-resistant artificial grass",
            "Engineered base and geotextile barriers",
            "Laser-level compacting for drainage",
          ],
          advantages: [
            "Zero mud tracking during monsoon",
            "Artificial turf saves watering costs",
            "Natural sod creates cooling microclimate",
          ],
          isFeatured: true,
          status: "active",
          seoTitle: "Natural Grass and Artificial Turf Installation - Pune",
          seoDescription: "Natural grass and artificial turf installation services in Pune.",
        },
        {
          title: "Sports Ground and Sports Field Development",
          slug: "sports-ground-and-sports-field-development",
          category: "Sports Field",
          shortDescription: "FIFA-standard artificial football turfs and multi-sport courts.",
          intro: "High-performance sporting infrastructure for Pune schools, clubs, and corporate grounds.",
          bannerImage: "https://images.unsplash.com/photo-1587502536263-9298d2fbd3f6?auto=format&fit=crop&w=1200&q=80",
          startingPrice: 110,
          priceUnit: "per sq ft",
          unit: "square_feet",
          features: [
            "50mm Monofilament football turf",
            "Sub-base slope engineering with drainage",
            "UV-treated perimeter netting",
            "LED floodlighting design",
          ],
          advantages: [
            "Drains monsoon rain in under 15 minutes",
            "Player safety with shock absorption",
            "High ROI for venue operators",
          ],
          isFeatured: true,
          status: "active",
          seoTitle: "Sports Ground Development - Pune",
          seoDescription: "Sports field and football turf development in Pune.",
        },
        {
          title: "Nursery Plants and Gardening Supplies",
          slug: "nursery-plants-and-gardening-supplies",
          category: "Nursery",
          shortDescription: "Wholesale supply of indoor plants, flowering shrubs, trees, and gardening supplies.",
          intro: "Climate-acclimatized plants from our Pune nursery with horticultural care guides.",
          bannerImage: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
          startingPrice: 120,
          priceUnit: "per plant",
          unit: "per_project",
          features: [
            "Acclimatized indoor plants",
            "Flowering perennials",
            "Shade and avenue trees",
            "Organic fertilizers and potting mixes",
          ],
          advantages: [
            "Direct nursery pricing",
            "Healthy root balls",
            "Horticulturist guidance",
          ],
          isFeatured: true,
          status: "active",
          seoTitle: "Nursery Plants and Gardening Supplies - Pune",
          seoDescription: "Nursery plants and gardening supplies in Pune.",
        },
        {
          title: "Irrigation Systems (Drip & Sprinkler)",
          slug: "irrigation-systems-drip-and-sprinkler",
          category: "Irrigation",
          shortDescription: "Automated drip irrigation and sprinkler systems for water conservation.",
          intro: "Smart irrigation systems that deliver precise root-zone hydration.",
          bannerImage: "https://images.unsplash.com/photo-1598515213694-70c3f46c22b5?auto=format&fit=crop&w=1200&q=80",
          startingPrice: 18,
          priceUnit: "per sq ft",
          unit: "square_feet",
          features: [
            "Pop-up rotary sprinklers",
            "Pressure-compensating drip lines",
            "Smart Wi-Fi timer valves",
            "Filter stations and fertigation",
          ],
          advantages: [
            "Reduces water consumption by 50-70%",
            "Prevents root rot from over-watering",
            "Automates garden care",
          ],
          isFeatured: false,
          status: "active",
          seoTitle: "Irrigation Systems Drip Sprinkler - Pune",
          seoDescription: "Drip and sprinkler irrigation systems in Pune.",
        },
        {
          title: "Residential and Commercial Landscaping",
          slug: "residential-and-commercial-landscaping",
          category: "Landscaping",
          shortDescription: "End-to-end landscape architecture for villas, campuses, and commercial properties.",
          intro: "Complete landscape design-build for residential and commercial properties across Pune.",
          bannerImage: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80",
          startingPrice: 45,
          priceUnit: "per sq ft",
          unit: "square_feet",
          features: [
            "Site clearance and leveling",
            "Water bodies and fountains",
            "Stone pathways and gazebos",
            "Post-handover maintenance",
          ],
          advantages: [
            "Single point of responsibility",
            "Strict timeline adherence",
            "Green building compliance support",
          ],
          isFeatured: false,
          status: "active",
          seoTitle: "Residential and Commercial Landscaping - Pune",
          seoDescription: "Residential and commercial landscaping services in Pune.",
        },
        {
          title: "Lawn Renovation and Aeration",
          slug: "lawn-renovation-and-maintenance",
          category: "Garden Maintenance",
          shortDescription: "Core aeration, dethatching, and lawn restoration services.",
          intro: "Restore patchy lawns with core aeration, dethatching, and organic fertilization.",
          bannerImage: "https://images.unsplash.com/photo-1524594154908-edd5534f0c87?auto=format&fit=crop&w=1200&q=80",
          startingPrice: 15,
          priceUnit: "per sq ft",
          unit: "square_feet",
          features: [
            "Mechanical dethatching",
            "Deep core aeration",
            "Nutrient top-dressing",
            "Spot sod patching",
          ],
          advantages: [
            "Lower cost than full lawn replacement",
            "Improved root oxygenation",
            "Visible results in 15-20 days",
          ],
          isFeatured: false,
          status: "active",
          seoTitle: "Lawn Renovation and Aeration - Pune",
          seoDescription: "Lawn renovation and aeration services in Pune.",
        },
      ];

      await Service.insertMany(services);
      console.log("✅ Seeded 8 Services.");
    } else {
      console.log(`ℹ️  ${serviceCount} services already exist. Skipping service seeding.`);
    }

    // --- 4. Seed Plants (only if collection is empty) ---
    const plantCount = await Plant.countDocuments();
    if (plantCount === 0) {
      const plants = [
        {
          name: "Areca Palm (Chrysalidocarpus)",
          botanicalName: "Dypsis lutescens",
          category: "indoor",
          description: "Tropical feather palm that filters indoor air pollutants.",
          careInstructions: "Water when top 1-2 inches of soil feel dry. Bright indirect sunlight.",
          sunlight: "Indirect Bright",
          watering: "Moderate",
          space: "Medium",
          isIndoor: true,
          price: 450,
          stockQuantity: 40,
          inStock: true,
          images: ["https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80"],
          isFeatured: true,
          status: "active",
        },
        {
          name: "Snake Plant (Golden Hahnii)",
          botanicalName: "Sansevieria trifasciata",
          category: "indoor",
          description: "Architectural plant that produces oxygen at night.",
          careInstructions: "Water sparingly every 2-3 weeks. Low light to bright indirect.",
          sunlight: "Low Light",
          watering: "Low",
          space: "Small",
          isIndoor: true,
          price: 250,
          stockQuantity: 65,
          inStock: true,
          images: ["https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=800&q=80"],
          isFeatured: true,
          status: "active",
        },
        {
          name: "Royal Red Hibiscus",
          botanicalName: "Hibiscus rosa-sinensis",
          category: "flowering",
          description: "Tropical shrub with vibrant red blooms year-round.",
          careInstructions: "Full sun (5-6 hours daily). Keep soil moist but well-drained.",
          sunlight: "Full Sun",
          watering: "Moderate",
          space: "Medium",
          isIndoor: false,
          price: 180,
          stockQuantity: 50,
          inStock: true,
          images: ["https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80"],
          isFeatured: true,
          status: "active",
        },
        {
          name: "Selection One Natural Carpet Grass (Sod)",
          botanicalName: "Zoysia japonica cultivar",
          category: "lawn-grass",
          description: "Fine-bladed turf variety for Indian home gardens.",
          careInstructions: "Water daily morning for first 3 weeks. Mow every 12-15 days.",
          sunlight: "Full Sun",
          watering: "High",
          space: "Large",
          isIndoor: false,
          price: 32,
          stockQuantity: 5000,
          inStock: true,
          images: ["https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=800&q=80"],
          isFeatured: true,
          status: "active",
        },
      ];

      await Plant.insertMany(plants);
      console.log("✅ Seeded Nursery Plants.");
    } else {
      console.log(`ℹ️  ${plantCount} plants already exist. Skipping plant seeding.`);
    }

    // --- 5. Seed Projects (only if collection is empty) ---
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      const projects = [
        {
          title: "Koregaon Park Luxury Villa Garden",
          slug: "koregaon-park-luxury-villa-garden",
          location: "Koregaon Park, Pune",
          category: "Residential",
          description: "Backyard transformation with Korean carpet lawn, stone waterfall, and automated drip irrigation.",
          clientName: "Private Client",
          area: "4,200 sq ft",
          beforeImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
          afterImage: "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=1200&q=80",
          gallery: [],
          completionDate: new Date("2025-11-15"),
          isFeatured: true,
          status: "published",
          seoTitle: "Koregaon Park Villa Garden - Janai Landscape",
          seoDescription: "Luxury villa garden transformation in Koregaon Park, Pune.",
        },
        {
          title: "Balewadi Multi-Sport Football Turf",
          slug: "balewadi-arena-multi-sport-football-turf",
          location: "Balewadi High Street, Pune",
          category: "Sports Turf",
          description: "7-a-side commercial football arena with drainage and floodlighting.",
          clientName: "Private Client",
          area: "8,500 sq ft",
          beforeImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
          afterImage: "https://images.unsplash.com/photo-1587502536263-9298d2fbd3f6?auto=format&fit=crop&w=1200&q=80",
          gallery: [],
          completionDate: new Date("2025-10-05"),
          isFeatured: true,
          status: "published",
          seoTitle: "Balewadi Football Turf - Janai Landscape",
          seoDescription: "Multi-sport football turf construction in Balewadi, Pune.",
        },
      ];

      await Project.insertMany(projects);
      console.log("✅ Seeded Projects.");
    } else {
      console.log(`ℹ️  ${projectCount} projects already exist. Skipping project seeding.`);
    }

    // --- 6. Seed Testimonials (only if collection is empty) ---
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      const testimonials = [
        {
          name: "Vikram Shinde",
          role: "Villa Owner",
          location: "Koregaon Park, Pune",
          content: "Janai Landscape Services revamped our garden with quality work and punctual service.",
          rating: 5,
          isFeatured: true,
          status: "active",
        },
        {
          name: "Pooja Mehta",
          role: "Terrace Garden Owner",
          location: "Baner, Pune",
          content: "Artificial turf on our terrace transformed our family evenings.",
          rating: 5,
          isFeatured: true,
          status: "active",
        },
      ];

      await Testimonial.insertMany(testimonials);
      console.log("✅ Seeded Testimonials.");
    } else {
      console.log(`ℹ️  ${testimonialCount} testimonials already exist. Skipping testimonial seeding.`);
    }

    console.log("✅ Database seeding completed.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
};

seedData();
