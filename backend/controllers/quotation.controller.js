import Quotation from "../models/Quotation.js";
import Inquiry from "../models/Inquiry.js";

// @desc    Generate a new digital quotation
// @route   POST /api/quotations (Admin only)
export const createQuotation = async (req, res, next) => {
  try {
    const {
      inquiryId,
      customerName,
      customerEmail,
      customerPhone,
      projectTitle,
      items,
      gstPercent = 18,
      terms,
    } = req.body;

    if (!customerName || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Customer name and at least one item are required.",
      });
    }

    const calculatedItems = items.map((item) => ({
      description: item.description,
      quantity: Number(item.quantity) || 1,
      unit: item.unit || "sq ft",
      unitPrice: Number(item.unitPrice) || 0,
      total: (Number(item.quantity) || 1) * (Number(item.unitPrice) || 0),
    }));

    const subtotal = calculatedItems.reduce((acc, curr) => acc + curr.total, 0);
    const gstAmount = Math.round((subtotal * (Number(gstPercent) || 18)) / 100);
    const grandTotal = subtotal + gstAmount;
    const quoteNumber = `JLS-QT-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;

    const quotation = await Quotation.create({
      quoteNumber,
      inquiryId: inquiryId || null,
      customerName,
      customerEmail,
      customerPhone,
      projectTitle: projectTitle || "Custom Landscaping & Turf Installation",
      items: calculatedItems,
      subtotal,
      gstPercent: Number(gstPercent) || 18,
      gstAmount,
      grandTotal,
      terms: terms || [
        "Quote valid for 30 days from date of issuance.",
        "Payment terms: 50% advance on confirmation, 30% after surface preparation, 20% on completion handover.",
        "Water and electrical connections at site to be provided by client.",
      ],
      status: "Sent",
    });

    // If linked to an inquiry, update inquiry status
    if (inquiryId) {
      await Inquiry.findByIdAndUpdate(inquiryId, {
        status: "Quotation Sent",
        $push: {
          statusHistory: {
            status: "Quotation Sent",
            changedAt: new Date(),
            note: `Quotation ${quoteNumber} generated for ₹${grandTotal}.`,
          },
        },
      });
    }

    res.status(201).json({ success: true, data: quotation });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all quotations
// @route   GET /api/quotations (Admin only)
export const getAllQuotations = async (req, res, next) => {
  try {
    const quotations = await Quotation.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: quotations.length, data: quotations });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single quotation by ID or Number
// @route   GET /api/quotations/:id
export const getQuotationById = async (req, res, next) => {
  try {
    const quotation = await Quotation.findById(req.params.id);
    if (!quotation) {
      return res.status(404).json({ success: false, message: "Quotation not found." });
    }
    res.status(200).json({ success: true, data: quotation });
  } catch (error) {
    next(error);
  }
};

// @desc    Update quotation status
// @route   PATCH /api/quotations/:id/status
export const updateQuotationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const quotation = await Quotation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!quotation) {
      return res.status(404).json({ success: false, message: "Quotation not found." });
    }
    res.status(200).json({ success: true, data: quotation });
  } catch (error) {
    next(error);
  }
};
