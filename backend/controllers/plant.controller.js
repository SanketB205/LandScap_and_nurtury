import Plant from "../models/Plant.js";

// @desc    Get all plants with search & filters
// @route   GET /api/plants
export const getAllPlants = async (req, res, next) => {
  try {
    const { search, category, sunlight, watering, isIndoor, status, inStock } = req.query;
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
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { botanicalName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const plants = await Plant.find(query).sort({ isFeatured: -1, createdAt: -1 });
    res.status(200).json({ success: true, count: plants.length, data: plants });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single plant by ID
// @route   GET /api/plants/:id
export const getPlantById = async (req, res, next) => {
  try {
    const plant = await Plant.findById(req.params.id);
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
    const { sunlight, watering, space, isIndoor } = req.query;
    let query = { status: "active", inStock: true };

    if (sunlight) query.sunlight = sunlight;
    if (watering) query.watering = watering;
    if (space) query.space = space;
    if (isIndoor !== undefined) query.isIndoor = isIndoor === "true";

    let recommended = await Plant.find(query).limit(8);

    // If exact query yields fewer than 3, fall back to broader matches
    if (recommended.length < 3) {
      let fallbackQuery = { status: "active", inStock: true };
      if (sunlight) fallbackQuery.sunlight = sunlight;
      recommended = await Plant.find(fallbackQuery).limit(8);
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

// @desc    Create new plant
// @route   POST /api/plants (Admin only)
export const createPlant = async (req, res, next) => {
  try {
    const plant = await Plant.create(req.body);
    res.status(201).json({ success: true, data: plant });
  } catch (error) {
    next(error);
  }
};

// @desc    Update plant
// @route   PUT /api/plants/:id (Admin only)
export const updatePlant = async (req, res, next) => {
  try {
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

// @desc    Delete plant
// @route   DELETE /api/plants/:id (Admin only)
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
