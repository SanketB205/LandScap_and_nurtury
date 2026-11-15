import Inquiry from "../models/Inquiry.js";

// Allowed status transitions
const ALLOWED_TRANSITIONS = {
  New: ["Contacted", "Rejected"],
  Contacted: ["Quotation Sent", "Rejected"],
  "Quotation Sent": ["Approved", "Rejected"],
  Approved: ["Completed"],
  Rejected: [],
  Completed: [],
};

// Generate unique reference ID with collision protection
const generateReferenceId = async () => {
  let attempts = 0;
  const maxAttempts = 100;
  while (attempts < maxAttempts) {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const referenceId = `JLS-INQ-${randomDigits}`;
    const existing = await Inquiry.findOne({ referenceId });
    if (!existing) {
      return referenceId;
    }
    attempts++;
  }
  throw new Error("Unable to generate unique reference ID after multiple attempts.");
};

// @desc    Submit new inquiry / quotation request
// @route   POST /api/inquiries
export const createInquiry = async (req, res, next) => {
  try {
    const {
      name,
      phone,
      email,
      serviceName,
      propertyType,
      areaSqFt,
      location,
      budgetRange,
      preferredDate,
      message,
      referenceImages,
      type,
    } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: "Please provide your name, phone number, and email address.",
      });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // Basic phone validation (allow digits, spaces, +, -, parentheses)
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid phone number.",
      });
    }

    const referenceId = await generateReferenceId();

    const inquiry = await Inquiry.create({
      referenceId,
      type: type || "quote",
      name: name.trim(),
      phone: phone.trim(),
      email: email.toLowerCase().trim(),
      serviceName: serviceName || "General Landscaping",
      propertyType: propertyType || "Residential Villa",
      areaSqFt: Number(areaSqFt) || 0,
      location: location || "Pune, Maharashtra",
      budgetRange: budgetRange || "₹25,000 - ₹50,000",
      preferredDate: preferredDate || null,
      message: message ? message.trim() : "",
      referenceImages: Array.isArray(referenceImages) ? referenceImages : [],
      status: "New",
      statusHistory: [
        {
          status: "New",
          changedAt: new Date(),
          note: "Inquiry received via website.",
        },
      ],
    });

    res.status(201).json({
      success: true,
      referenceId: inquiry.referenceId,
      message:
        "Thank you! Your inquiry has been received. Our Pune landscaping specialist will contact you within 24 business hours.",
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all inquiries (Admin only) — paginated
// @route   GET /api/inquiries?page=1&limit=20&status=New&search=xyz
export const getAllInquiries = async (req, res, next) => {
  try {
    const { status, search, type, page = 1, limit = 20 } = req.query;
    let query = {};

    if (status && status !== "all") {
      query.status = status;
    }

    if (type && type !== "all") {
      query.type = type;
    }

    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      query.$or = [
        { referenceId: { $regex: escapedSearch, $options: "i" } },
        { name: { $regex: escapedSearch, $options: "i" } },
        { phone: { $regex: escapedSearch, $options: "i" } },
        { email: { $regex: escapedSearch, $options: "i" } },
        { location: { $regex: escapedSearch, $options: "i" } },
      ];
    }

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [inquiries, total] = await Promise.all([
      Inquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Inquiry.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: inquiries.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: inquiries,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single inquiry by ID
// @route   GET /api/inquiries/:id (Admin only)
export const getInquiryById = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Inquiry not found." });
    }
    res.status(200).json({ success: true, data: inquiry });
  } catch (error) {
    next(error);
  }
};

// @desc    Update inquiry status with validated transitions
// @route   PATCH /api/inquiries/:id/status (Admin only)
export const updateInquiryStatus = async (req, res, next) => {
  try {
    const { status, note } = req.body;

    const validStatuses = ["New", "Contacted", "Quotation Sent", "Approved", "Rejected", "Completed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Inquiry not found." });
    }

    // Validate status transition
    const allowedNext = ALLOWED_TRANSITIONS[inquiry.status] || [];
    if (inquiry.status !== status && !allowedNext.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot transition from "${inquiry.status}" to "${status}". Allowed: ${allowedNext.join(", ") || "none"}`,
      });
    }

    inquiry.status = status;
    inquiry.statusHistory.push({
      status,
      changedAt: new Date(),
      note: note || `Status updated to ${status} by ${req.user?.name || "Admin"}`,
    });

    await inquiry.save();
    res.status(200).json({ success: true, data: inquiry });
  } catch (error) {
    next(error);
  }
};

// @desc    Add internal note to inquiry
// @route   PATCH /api/inquiries/:id/notes (Admin only)
export const addInquiryNote = async (req, res, next) => {
  try {
    const { note } = req.body;
    if (!note || !note.trim()) {
      return res.status(400).json({ success: false, message: "Note text is required." });
    }

    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Inquiry not found." });
    }

    inquiry.internalNotes.push({
      note: note.trim(),
      author: req.user?.name || "Admin",
      date: new Date(),
    });

    await inquiry.save();
    res.status(200).json({ success: true, data: inquiry });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete inquiry (Admin only)
// @route   DELETE /api/inquiries/:id
export const deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Inquiry not found." });
    }

    await Inquiry.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Inquiry record deleted successfully." });
  } catch (error) {
    next(error);
  }
};
