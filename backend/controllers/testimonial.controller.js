import Testimonial from "../models/Testimonial.js";

// @desc    Get testimonials
// @route   GET /api/testimonials
export const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ isFeatured: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: testimonials.length, data: testimonials });
  } catch (error) {
    next(error);
  }
};

// @desc    Create testimonial (Admin only)
// @route   POST /api/testimonials
export const createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};
