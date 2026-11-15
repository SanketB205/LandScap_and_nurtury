import Quotation from "../models/Quotation.js";
import Inquiry from "../models/Inquiry.js";
import SiteSettings from "../models/SiteSettings.js";

// Generate collision-resistant quotation number
const generateQuoteNumber = async () => {
  let isUnique = false;
  let quoteNumber = "";
  while (!isUnique) {
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    const ts = Date.now().toString().slice(-4);
    quoteNumber = `JLS-QT-${year}-${random}${ts}`;
    const existing = await Quotation.findOne({ quoteNumber });
    if (!existing) isUnique = true;
  }
  return quoteNumber;
};

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
      taxPercent,
      terms,
    } = req.body;

    if (!customerName || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Customer name and at least one item are required.",
      });
    }

    // Get configurable tax rate from SiteSettings
    let settings = await SiteSettings.findOne();
    const defaultTaxPercent = settings?.taxConfig?.percent ?? 0;
    const effectiveTaxPercent = taxPercent !== undefined ? Number(taxPercent) : defaultTaxPercent;

    const calculatedItems = items.map((item) => ({
      description: item.description,
      quantity: Number(item.quantity) || 1,
      unit: item.unit || "sq ft",
      unitPrice: Number(item.unitPrice) || 0,
      total: Math.round((Number(item.quantity) || 1) * (Number(item.unitPrice) || 0) * 100) / 100,
    }));

    const subtotal = Math.round(
      calculatedItems.reduce((acc, curr) => acc + curr.total, 0) * 100
    ) / 100;
    const taxAmount = Math.round(subtotal * (effectiveTaxPercent / 100) * 100) / 100;
    const grandTotal = Math.round((subtotal + taxAmount) * 100) / 100;
    const quoteNumber = await generateQuoteNumber();

    // Immutable snapshot of items
    const itemsSnapshot = JSON.stringify(calculatedItems);

    const quotation = await Quotation.create({
      quoteNumber,
      inquiryId: inquiryId || null,
      customerName,
      customerEmail,
      customerPhone,
      projectTitle: projectTitle || "Custom Landscaping & Turf Installation",
      items: calculatedItems,
      subtotal,
      taxPercent: effectiveTaxPercent,
      taxAmount,
      grandTotal,
      terms: terms || [
        "Quote valid for 30 days from date of issuance.",
        "Payment terms: 50% advance on confirmation, 30% after surface preparation, 20% on completion handover.",
        "Water and electrical connections at site to be provided by client.",
        "Estimated completion time subject to weather conditions.",
        "This is an estimate, not a tax invoice. Final pricing may vary after site inspection.",
      ],
      status: "Sent",
      itemsSnapshot,
      currentRevision: 1,
      revisionHistory: [
        {
          status: "Sent",
          changedBy: "Admin",
          changedAt: new Date(),
          note: "Quotation created",
          subtotal,
          taxPercent: effectiveTaxPercent,
          taxAmount,
          grandTotal,
        },
      ],
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

// @desc    Get all quotations (paginated)
// @route   GET /api/quotations (Admin only)
export const getAllQuotations = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    let query = {};
    if (status && status !== "all") {
      query.status = status;
    }

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [quotations, total] = await Promise.all([
      Quotation.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Quotation.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: quotations.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: quotations,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single quotation by ID or Number
// @route   GET /api/quotations/:id
export const getQuotationById = async (req, res, next) => {
  try {
    let quotation;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      quotation = await Quotation.findById(req.params.id);
    } else {
      quotation = await Quotation.findOne({ quoteNumber: req.params.id });
    }
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
    const { status, note } = req.body;
    const validStatuses = ["Draft", "Sent", "Accepted", "Rejected"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const quotation = await Quotation.findById(req.params.id);
    if (!quotation) {
      return res.status(404).json({ success: false, message: "Quotation not found." });
    }

    // Add revision history entry
    quotation.revisionHistory.push({
      status,
      changedBy: req.user?.name || "Admin",
      changedAt: new Date(),
      note: note || `Status updated to ${status}`,
      subtotal: quotation.subtotal,
      taxPercent: quotation.taxPercent,
      taxAmount: quotation.taxAmount,
      grandTotal: quotation.grandTotal,
    });
    quotation.currentRevision = (quotation.currentRevision || 1) + 1;
    quotation.status = status;

    await quotation.save();

    res.status(200).json({ success: true, data: quotation });
  } catch (error) {
    next(error);
  }
};
