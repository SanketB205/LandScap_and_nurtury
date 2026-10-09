import Inquiry from "../models/Inquiry.js";

// Generate unique reference ID
const generateReferenceId = async () => {
  let isUnique = false;
  let referenceId = "";

  while (!isUnique) {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    referenceId = `JLS-INQ-${randomDigits}`;
    const existing = await Inquiry.findOne({ referenceId });
    if (!existing) {
      isUnique = true;
    }
  }
  return referenceId;
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

    const referenceId = await generateReferenceId();

    const inquiry = await Inquiry.create({
      referenceId,
      type: type || "quote",
      name,
      phone,
      email,
      serviceName: serviceName || "General Landscaping",
      propertyType: propertyType || "Residential Villa",
      areaSqFt: Number(areaSqFt) || 0,
      location: location || "Pune, Maharashtra",
      budgetRange: budgetRange || "₹25,000 - ₹50,000",
      preferredDate: preferredDate || null,
      message: message || "",
      referenceImages: referenceImages || [],
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

// @desc    Get all inquiries (Admin only)
// @route   GET /api/inquiries
export const getAllInquiries = async (req, res, next) => {
  try {
    const { status, search, type } = req.query;
    let query = {};

    if (status && status !== "all") {
      query.status = status;
    }

    if (type && type !== "all") {
      query.type = type;
    }

    if (search) {
      query.$or = [
        { referenceId: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    const inquiries = await Inquiry.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: inquiries.length, data: inquiries });
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

// @desc    Update inquiry status
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

    inquiry.status = status;
    inquiry.statusHistory.push({
      status,
      changedAt: new Date(),
      note: note || `Status updated to ${status} by ${req.user.name}`,
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
      author: req.user.name || "Admin",
      date: new Date(),
    });

    await inquiry.save();
    res.status(200).json({ success: true, data: inquiry });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete inquiry
// @route   DELETE /api/inquiries/:id (Admin only)
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
