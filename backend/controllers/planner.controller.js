import SiteSettings from "../models/SiteSettings.js";

// @desc    Calculate dynamic landscaping & turf cost estimate
// @route   POST /api/planner/estimate
export const calculateEstimate = async (req, res, next) => {
  try {
    const {
      areaLength,
      areaWidth,
      areaSqFt: directAreaSqFt,
      surfaceType = "natural-lawn",
      irrigationType = "none",
      includeSoilPrep = true,
      includePathway = false,
      includeLighting = false,
      plantPreference = "medium",
      measurementUnit = "feet", // 'feet' | 'metres'
    } = req.body;

    // Validate inputs
    const length = Number(areaLength) || 0;
    const width = Number(areaWidth) || 0;
    const directArea = Number(directAreaSqFt) || 0;

    let areaSqFt = 0;

    if (directArea > 0) {
      // Direct area provided
      areaSqFt = measurementUnit === "metres" ? directArea * 10.7639 : directArea;
    } else if (length > 0 && width > 0) {
      const calculatedArea = length * width;
      areaSqFt = measurementUnit === "metres" ? calculatedArea * 10.7639 : calculatedArea;
    } else {
      return res.status(400).json({
        success: false,
        message: "Please provide either length & width or a direct area value.",
      });
    }

    if (areaSqFt <= 0) {
      return res.status(400).json({
        success: false,
        message: "Area must be greater than zero.",
      });
    }

    // Retrieve live pricing rules from SiteSettings
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }

    const rules = settings.pricingRules || {};
    const taxConfig = settings.taxConfig || { enabled: true, percent: 18, label: "GST" };

    const breakdown = [];
    let subtotal = 0;

    // 1. Surface Material
    let surfaceRate = rules.naturalLawnPerSqFt || 35;
    let surfaceName = "Natural Lawn Grass (Selection One / Korean)";

    if (surfaceType === "artificial-turf") {
      surfaceRate = rules.artificialTurfPerSqFt || 75;
      surfaceName = "Premium 35mm UV-Treated Artificial Grass & Base";
    } else if (surfaceType === "sports-turf") {
      surfaceRate = rules.sportsTurfPerSqFt || 110;
      surfaceName = "FIFA-Standard Sports Turf with Rubber Infill";
    } else if (surfaceType === "garden-mix") {
      surfaceRate = Math.round(((rules.naturalLawnPerSqFt || 35) + (rules.artificialTurfPerSqFt || 75)) / 2);
      surfaceName = "Hybrid Lawn & Ornamental Planting Bed";
    }

    const surfaceCost = Math.round(areaSqFt * surfaceRate);
    breakdown.push({
      item: surfaceName,
      unitPrice: surfaceRate,
      quantity: Math.round(areaSqFt),
      unit: "sq ft",
      cost: surfaceCost,
      note: "Surface material and installation",
    });
    subtotal += surfaceCost;

    // 2. Soil Preparation & Grading
    if (includeSoilPrep && surfaceType !== "artificial-turf" && surfaceType !== "sports-turf") {
      const soilRate = rules.soilPreparationPerSqFt || 12;
      const soilCost = Math.round(areaSqFt * soilRate);
      breakdown.push({
        item: "Red Soil Enriched with Vermicompost & Surface Grading",
        unitPrice: soilRate,
        quantity: Math.round(areaSqFt),
        unit: "sq ft",
        cost: soilCost,
        note: "Soil preparation and grading",
      });
      subtotal += soilCost;
    }

    // 3. Irrigation System
    if (irrigationType === "drip") {
      const dripRate = rules.dripIrrigationPerSqFt || 18;
      const dripCost = Math.round(areaSqFt * dripRate);
      breakdown.push({
        item: "Automated Drip Irrigation with Micro-Drippers & Timer",
        unitPrice: dripRate,
        quantity: Math.round(areaSqFt),
        unit: "sq ft",
        cost: dripCost,
        note: "Drip irrigation system",
      });
      subtotal += dripCost;
    } else if (irrigationType === "sprinkler") {
      const sprinklerRate = rules.sprinklerSystemPerSqFt || 28;
      const sprinklerCost = Math.round(areaSqFt * sprinklerRate);
      breakdown.push({
        item: "Pop-Up Gear-Driven Lawn Sprinkler Network",
        unitPrice: sprinklerRate,
        quantity: Math.round(areaSqFt),
        unit: "sq ft",
        cost: sprinklerCost,
        note: "Sprinkler system",
      });
      subtotal += sprinklerCost;
    }

    // 4. Plant Density Package
    if (plantPreference === "dense") {
      const plantCost = Math.round(areaSqFt * 20);
      breakdown.push({
        item: "Lush Plant Density (Shrubs, Flowering Hedges, Accent Palms)",
        unitPrice: 20,
        quantity: Math.round(areaSqFt),
        unit: "sq ft",
        cost: plantCost,
        note: "Dense planting package",
      });
      subtotal += plantCost;
    } else if (plantPreference === "medium") {
      const plantCost = Math.round(areaSqFt * 12);
      breakdown.push({
        item: "Curated Plant Package (Perennial Shrubs & Accent Plants)",
        unitPrice: 12,
        quantity: Math.round(areaSqFt),
        unit: "sq ft",
        cost: plantCost,
        note: "Medium planting package",
      });
      subtotal += plantCost;
    }

    // 5. Add-ons
    if (includePathway) {
      const pathwayCost = 8500;
      breakdown.push({
        item: "Natural Basalt Stone Stepping Pathway",
        unitPrice: pathwayCost,
        quantity: 1,
        unit: "lot",
        cost: pathwayCost,
        note: "One-time installation",
      });
      subtotal += pathwayCost;
    }

    if (includeLighting) {
      const lightingCost = 12000;
      breakdown.push({
        item: "Warm LED Landscape Spike Lights & Cabling",
        unitPrice: lightingCost,
        quantity: 1,
        unit: "lot",
        cost: lightingCost,
        note: "One-time installation",
      });
      subtotal += lightingCost;
    }

    // Design & Engineering supervision
    const designFee = rules.landscapeDesignBaseRate || 4500;
    breakdown.push({
      item: "Design Layout, Soil Analysis & Project Supervision",
      unitPrice: designFee,
      quantity: 1,
      unit: "fixed",
      cost: designFee,
      note: "One-time design fee",
    });
    subtotal += designFee;

    // Calculate tax using configurable rate
    const taxPercent = taxConfig.enabled ? (taxConfig.percent || 0) : 0;
    const taxAmount = Math.round(subtotal * (taxPercent / 100));
    const totalEstimate = subtotal + taxAmount;

    // Material takeoffs
    const turfWastePercent = 5; // 5% cutting waste
    const turfRequired = Math.round(areaSqFt * (1 + turfWastePercent / 100));
    const soilBags = Math.round(areaSqFt / 25);
    const workDays = Math.max(3, Math.ceil(areaSqFt / 300));

    const estimateData = {
      areaSqFt: Math.round(areaSqFt),
      areaSqMetres: Math.round(areaSqFt / 10.7639),
      breakdown,
      subtotal,
      taxPercent,
      taxAmount,
      totalEstimate,
      taxLabel: taxConfig.label || "GST",
      taxNote: taxConfig.note || "",
      materialEstimates: {
        turfRequiredSqFt: turfRequired,
        soilBagsEstimated: soilBags,
        estimatedWorkDays: workDays,
        estimatedWorkDaysRange: `${workDays} to ${workDays + 3} working days`,
      },
      disclaimer:
        "This is a preliminary planning estimate based on standard Pune site conditions. Actual costs may vary depending on slope, accessibility, soil excavation needs, and plant selections. This is not a tax invoice. Final pricing is determined after a physical site inspection.",
    };

    res.status(200).json({
      success: true,
      data: estimateData,
    });
  } catch (error) {
    next(error);
  }
};
