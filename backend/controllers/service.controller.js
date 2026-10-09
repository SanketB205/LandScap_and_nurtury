import Service from "../models/services.js";
import slugify from "slugify";

// @desc    Get all services
// @route   GET /api/services
export const getAllServices = async (req, res, next) => {
  try {
    const { category, status } = req.query;
    let query = {};

    // If not authenticated admin, show only active services
    if (!status || status === "active") {
      query.status = "active";
    } else if (status) {
      query.status = status;
    }

    if (category) {
      query.category = category;
    }

    const services = await Service.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single service by slug
// @route   GET /api/services/:slug
export const getServiceBySlug = async (req, res, next) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found." });
    }
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new service
// @route   POST /api/services (Admin only)
export const createService = async (req, res, next) => {
  try {
    const { title, shortDescription, intro, features, advantages, startingPrice, priceUnit, bannerImage, category, faqs, gallery } = req.body;

    if (!title || !shortDescription) {
      return res.status(400).json({ success: false, message: "Title and short description are required." });
    }

    const slug = slugify(title, { lower: true, strict: true });

    // Check slug collision
    const existing = await Service.findOne({ slug });
    if (existing) {
      return res.status(400).json({ success: false, message: "A service with this title already exists." });
    }

    const service = await Service.create({
      title,
      slug,
      shortDescription,
      intro,
      features: Array.isArray(features) ? features : (features ? features.split("\n").filter(Boolean) : []),
      advantages: Array.isArray(advantages) ? advantages : (advantages ? advantages.split("\n").filter(Boolean) : []),
      startingPrice: Number(startingPrice) || 0,
      priceUnit: priceUnit || "per sq ft",
      bannerImage: bannerImage || "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=1200&q=80",
      category: category || "Landscaping",
      faqs: faqs || [],
      gallery: gallery || [],
      status: "active",
    });

    res.status(201).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

// @desc    Update service
// @route   PUT /api/services/:id (Admin only)
export const updateService = async (req, res, next) => {
  try {
    let service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found." });
    }

    if (req.body.title && req.body.title !== service.title) {
      req.body.slug = slugify(req.body.title, { lower: true, strict: true });
    }

    if (req.body.features && typeof req.body.features === "string") {
      req.body.features = req.body.features.split("\n").filter(Boolean);
    }

    if (req.body.advantages && typeof req.body.advantages === "string") {
      req.body.advantages = req.body.advantages.split("\n").filter(Boolean);
    }

    service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id (Admin only)
export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found." });
    }

    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Service deleted successfully." });
  } catch (error) {
    next(error);
  }
};
