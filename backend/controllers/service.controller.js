import Service from "../models/services.js";
import slugify from "slugify";

// @desc    Get all services (with pagination and filtering)
// @route   GET /api/services
export const getAllServices = async (req, res, next) => {
  try {
    const { category, status, page = 1, limit = 50 } = req.query;
    let query = {};

    // If not status specified, show only active (public view)
    if (!status || status === "active") {
      query.status = "active";
    } else if (status === "all") {
      // admin can see all statuses
    } else {
      query.status = status;
    }

    if (category && category !== "all") {
      query.category = category;
    }

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [services, total] = await Promise.all([
      Service.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Service.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: services.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single service by slug
// @route   GET /api/services/:slug
export const getServiceBySlug = async (req, res, next) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, status: "active" });
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found." });
    }
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new service (Admin only)
// @route   POST /api/services
export const createService = async (req, res, next) => {
  try {
    const {
      title,
      shortDescription,
      intro,
      features,
      advantages,
      startingPrice,
      priceUnit,
      unit,
      bannerImage,
      category,
      faqs,
      gallery,
      seoTitle,
      seoDescription,
    } = req.body;

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
      unit: unit || "square_feet",
      bannerImage: bannerImage || "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=1200&q=80",
      category: category || "Landscaping",
      faqs: faqs || [],
      gallery: gallery || [],
      status: "active",
      seoTitle: seoTitle || "",
      seoDescription: seoDescription || "",
    });

    res.status(201).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

// @desc    Update service (Admin only)
// @route   PUT /api/services/:id
export const updateService = async (req, res, next) => {
  try {
    let service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found." });
    }

    if (req.body.title && req.body.title !== service.title) {
      req.body.slug = slugify(req.body.title, { lower: true, strict: true });
      // Check slug collision
      const existing = await Service.findOne({ slug: req.body.slug, _id: { $ne: service._id } });
      if (existing) {
        return res.status(400).json({ success: false, message: "A service with this title already exists." });
      }
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

// @desc    Archive/restore service (Admin only) - soft delete
// @route   PATCH /api/services/:id/archive
export const archiveService = async (req, res, next) => {
  try {
    const { archived } = req.body;
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found." });
    }

    service.status = archived ? "archived" : "active";
    await service.save();

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete service (Admin only) - hard delete
// @route   DELETE /api/services/:id
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
