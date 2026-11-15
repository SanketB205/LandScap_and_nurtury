import Testimonial from "../models/Testimonial.js";

// @desc    Get testimonials (public - featured only)
// @route   GET /api/testimonials
export const getTestimonials = async (req, res, next) => {
  try {
    const { status, featured } = req.query;
    let query = {};

    if (status && status !== "all") {
      query.status = status;
    } else {
      // Public view: only active testimonials
      query.status = "active";
    }

    if (featured === "true") {
      query.isFeatured = true;
    }

    const testimonials = await Testimonial.find(query).sort({ createdAt: -1 });
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

// @desc    Update testimonial (Admin only)
// @route   PUT /api/testimonials/:id
export const updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Testimonial not found." });
    }
    res.status(200).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

// @desc    Archive/restore testimonial (Admin only)
// @route   PATCH /api/testimonials/:id/archive
export const archiveTestimonial = async (req, res, next) => {
  try {
    const { archived } = req.body;
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Testimonial not found." });
    }

    testimonial.status = archived ? "archived" : "active";
    await testimonial.save();

    res.status(200).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete testimonial (Admin only)
// @route   DELETE /api/testimonials/:id
export const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Testimonial not found." });
    }
    res.status(200).json({ success: true, message: "Testimonial deleted successfully." });
  } catch (error) {
    next(error);
  }
};
