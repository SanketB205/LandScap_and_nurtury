import SiteSettings from "../models/SiteSettings.js";

// @desc    Get public site settings
// @route   GET /api/settings
export const getSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

// @desc    Update site settings & pricing rules
// @route   PUT /api/settings (Admin only)
export const updateSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(req.body);
    } else {
      settings = await SiteSettings.findByIdAndUpdate(settings._id, req.body, {
        new: true,
        runValidators: true,
      });
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};
