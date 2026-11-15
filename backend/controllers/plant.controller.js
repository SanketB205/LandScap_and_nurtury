import Plant from "../models/Plant.js";

// @desc    Get all plants with search & filters (paginated)
// @route   GET /api/plants
export const getAllPlants = async (req, res, next) => {
  try {
    const {
      search,
      category,
      sunlight,
      watering,
      isIndoor,
      status,
      inStock,
      page = 1,
      limit = 50,
      sort = "createdAt",
      order = "desc",
    } = req.query;
    let query = {};

    if (!status || status === "active") {
      query.status = "active";
    } else if (status) {
      query.status = status;
    }

    if (category && category !== "all") {
      query.category = category;
    }

    if (sunlight && sunlight !== "all") {
      query.sunlight = sunlight;
    }

    if (watering && watering !== "all") {
      query.watering = watering;
    }

    if (isIndoor !== undefined) {
      query.isIndoor = isIndoor === "true";
    }

    if (inStock !== undefined) {
      query.inStock = inStock === "true";
    }

    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      query.$or = [
        { name: { $regex: escapedSearch, $options: "i" } },
        { botanicalName: { $regex: escapedSearch, $options: "i" } },
        { description: { $regex: escapedSearch, $options: "i" } },
      ];
    }

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;
    const sortOrder = order === "asc" ? 1 : -1;

    const [plants, total] = await Promise.all([
      Plant.find(query)
        .sort({ [sort]: sortOrder, createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Plant.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: plants.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: plants,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single plant by ID or slug
// @route   GET /api/plants/:id
export const getPlantById = async (req, res, next) => {
  try {
    let plant;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      plant = await Plant.findById(req.params.id);
    } else {
      plant = await Plant.findOne({ slug: req.params.id });
    }
    if (!plant) {
      return res.status(404).json({ success: false, message: "Plant not found." });
    }
    res.status(200).json({ success: true, data: plant });
  } catch (error) {
    next(error);
  }
};

// @desc    Intelligent Nursery Recommendations
// @route   GET /api/plants/recommendations
export const getRecommendations = async (req, res, next) => {
  try {
    const { sunlight, watering, space, isIndoor, limit = 8 } = req.query;
    let query = { status: "active", inStock: true };

    if (sunlight) query.sunlight = sunlight;
    if (watering) query.watering = watering;
    if (space) query.space = space;
    if (isIndoor !== undefined) query.isIndoor = isIndoor === "true";

    let recommended = await Plant.find(query).limit(parseInt(limit));

    // If exact query yields fewer than 3, fall back to broader matches
    if (recommended.length < 3 && (sunlight || watering || space)) {
      let fallbackQuery = { status: "active", inStock: true };
      if (sunlight) fallbackQuery.sunlight = sunlight;
      recommended = await Plant.find(fallbackQuery).limit(parseInt(limit));
    }

    res.status(200).json({
      success: true,
      count: recommended.length,
      data: recommended,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new plant (Admin only)
// @route   POST /api/plants
export const createPlant = async (req, res, next) => {
  try {
    // Validate price and stock
    if (req.body.price !== undefined && Number(req.body.price) < 0) {
      return res.status(400).json({ success: false, message: "Price cannot be negative." });
    }
    if (req.body.stockQuantity !== undefined && Number(req.body.stockQuantity) < 0) {
      return res.status(400).json({ success: false, message: "Stock quantity cannot be negative." });
    }

    const plant = await Plant.create(req.body);
    res.status(201).json({ success: true, data: plant });
  } catch (error) {
    next(error);
  }
};

// @desc    Update plant (Admin only)
// @route   PUT /api/plants/:id
export const updatePlant = async (req, res, next) => {
  try {
    // Validate price and stock
    if (req.body.price !== undefined && Number(req.body.price) < 0) {
      return res.status(400).json({ success: false, message: "Price cannot be negative." });
    }
    if (req.body.stockQuantity !== undefined && Number(req.body.stockQuantity) < 0) {
      return res.status(400).json({ success: false, message: "Stock quantity cannot be negative." });
    }

    const plant = await Plant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!plant) {
      return res.status(404).json({ success: false, message: "Plant not found." });
    }
    res.status(200).json({ success: true, data: plant });
  } catch (error) {
    next(error);
  }
};

// @desc    Archive/restore plant (Admin only)
// @route   PATCH /api/plants/:id/archive
export const archivePlant = async (req, res, next) => {
  try {
    const { archived } = req.body;
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ success: false, message: "Plant not found." });
    }

    plant.status = archived ? "archived" : "active";
    await plant.save();

    res.status(200).json({ success: true, data: plant });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete plant (Admin only)
// @route   DELETE /api/plants/:id
export const deletePlant = async (req, res, next) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);
    if (!plant) {
      return res.status(404).json({ success: false, message: "Plant not found." });
    }
    res.status(200).json({ success: true, message: "Plant deleted successfully." });
  } catch (error) {
    next(error);
  }
};
