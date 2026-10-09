import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: "Janai Landscape Services",
    },
    tagline: {
      type: String,
      default: "Transform Your Outdoors Into Something Extraordinary",
    },
    phone: {
      type: String,
      default: "+91 97676 71968",
    },
    email: {
      type: String,
      default: "info@janailandscape.com",
    },
    address: {
      type: String,
      default: "Survey No. 42, Near D-Mart, Baner-Balewadi Road, Pune, Maharashtra 411045",
    },
    operatingHours: {
      type: String,
      default: "Mon–Sat: 8:30 AM – 7:30 PM, Sun: 9:00 AM – 2:00 PM",
    },
    whatsappNumber: {
      type: String,
      default: "919767671968",
    },
    googleMapsEmbedUrl: {
      type: String,
      default: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04711153835!2d73.78056586616434!3d18.524598599502693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d3d3432!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    },
    socialLinks: {
      facebook: { type: String, default: "https://facebook.com" },
      instagram: { type: String, default: "https://instagram.com" },
      youtube: { type: String, default: "https://youtube.com" },
      linkedin: { type: String, default: "https://linkedin.com" },
    },
    pricingRules: {
      naturalLawnPerSqFt: { type: Number, default: 35 },
      artificialTurfPerSqFt: { type: Number, default: 75 },
      dripIrrigationPerSqFt: { type: Number, default: 18 },
      sprinklerSystemPerSqFt: { type: Number, default: 28 },
      soilPreparationPerSqFt: { type: Number, default: 12 },
      landscapeDesignBaseRate: { type: Number, default: 4500 },
      sportsTurfPerSqFt: { type: Number, default: 110 },
      maintenancePerMonthBase: { type: Number, default: 3500 },
    },
  },
  { timestamps: true }
);

export default mongoose.model("SiteSettings", siteSettingsSchema);
