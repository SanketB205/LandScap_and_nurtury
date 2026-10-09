import SiteSettings from "../models/SiteSettings.js";

// @desc    Calculate dynamic landscaping & turf cost estimate
// @route   POST /api/planner/estimate
export const calculateEstimate = async (req, res, next) => {
  try {
    const {
      areaLength,
      areaWidth,
      surfaceType = "natural-lawn", // 'natural-lawn' | 'artificial-turf' | 'sports-turf' | 'garden-mix'
      irrigationType = "none", // 'none' | 'drip' | 'sprinkler'
      includeSoilPrep = true,
      includePathway = false,
      includeLighting = false,
      plantPreference = "medium", // 'minimal' | 'medium' | 'dense'
    } = req.body;

    const length = Number(areaLength) || 0;
    const width = Number(areaWidth) || 0;
    const areaSqFt = length * width > 0 ? length * width : Number(req.body.areaSqFt) || 500;

    // Retrieve live pricing rules from SiteSettings
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }

    const rules = settings.pricingRules || {
      naturalLawnPerSqFt: 35,
      artificialTurfPerSqFt: 75,
      sportsTurfPerSqFt: 110,
      dripIrrigationPerSqFt: 18,
      sprinklerSystemPerSqFt: 28,
      soilPreparationPerSqFt: 12,
      landscapeDesignBaseRate: 4500,
    };

    const breakdown = [];
    let subtotal = 0;

    // 1. Surface Material
    let surfaceRate = rules.naturalLawnPerSqFt;
    let surfaceName = "Natural Lawn Grass (Selection One / Korean)";

    if (surfaceType === "artificial-turf") {
      surfaceRate = rules.artificialTurfPerSqFt;
      surfaceName = "Premium 35mm UV-Treated Artificial Grass & Base";
    } else if (surfaceType === "sports-turf") {
      surfaceRate = rules.sportsTurfPerSqFt;
      surfaceName = "FIFA-Standard Sports Turf with Rubber Infill";
    } else if (surfaceType === "garden-mix") {
      surfaceRate = Math.round((rules.naturalLawnPerSqFt + rules.artificialTurfPerSqFt) / 2);
      surfaceName = "Hybrid Lawn & Ornamental Planting Bed";
    }

    const surfaceCost = Math.round(areaSqFt * surfaceRate);
    breakdown.push({
      item: surfaceName,
      unitPrice: surfaceRate,
      quantity: areaSqFt,
      unit: "sq ft",
      cost: surfaceCost,
    });
    subtotal += surfaceCost;

    // 2. Soil Preparation & Grading
    if (includeSoilPrep && surfaceType !== "artificial-turf" && surfaceType !== "sports-turf") {
      const soilCost = Math.round(areaSqFt * (rules.soilPreparationPerSqFt || 12));
      breakdown.push({
        item: "Red Soil Enriched with Vermicompost & Surface Grading",
        unitPrice: rules.soilPreparationPerSqFt || 12,
        quantity: areaSqFt,
        unit: "sq ft",
        cost: soilCost,
      });
      subtotal += soilCost;
    }

    // 3. Irrigation System
    if (irrigationType === "drip") {
      const dripCost = Math.round(areaSqFt * (rules.dripIrrigationPerSqFt || 18));
      breakdown.push({
        item: "Automated Drip Irrigation with Micro-Drippers & Timer",
        unitPrice: rules.dripIrrigationPerSqFt || 18,
        quantity: areaSqFt,
        unit: "sq ft",
        cost: dripCost,
      });
      subtotal += dripCost;
    } else if (irrigationType === "sprinkler") {
      const sprinklerCost = Math.round(areaSqFt * (rules.sprinklerSystemPerSqFt || 28));
      breakdown.push({
        item: "Pop-Up Gear-Driven Lawn Sprinkler Network",
        unitPrice: rules.sprinklerSystemPerSqFt || 28,
        quantity: areaSqFt,
        unit: "sq ft",
        cost: sprinklerCost,
      });
      subtotal += sprinklerCost;
    }

    // 4. Plant Density Package
    let plantCost = 0;
    if (plantPreference === "dense") {
      plantCost = Math.round(areaSqFt * 20);
      breakdown.push({
        item: "Lush Plant Density (Shrubs, Flowering Hedges, Accent Palms)",
        unitPrice: 20,
        quantity: areaSqFt,
        unit: "sq ft",
        cost: plantCost,
      });
      subtotal += plantCost;
    } else if (plantPreference === "medium") {
      plantCost = Math.round(areaSqFt * 12);
      breakdown.push({
        item: "Curated Plant Package (Perennial Shrubs & Accent Plants)",
        unitPrice: 12,
        quantity: areaSqFt,
        unit: "sq ft",
        cost: plantCost,
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
    });
    subtotal += designFee;

    const estimatedTax = Math.round(subtotal * 0.18); // 18% GST estimate
    const totalEstimate = subtotal + estimatedTax;

    res.status(200).json({
      success: true,
      data: {
        areaSqFt,
        breakdown,
        subtotal,
        estimatedTax,
        totalEstimate,
        materialEstimates: {
          turfRequiredSqFt: Math.round(areaSqFt * 1.05), // 5% cutting waste
          soilBagsEstimated: Math.round(areaSqFt / 25),
          estimatedWorkDays: Math.max(3, Math.ceil(areaSqFt / 300)),
        },
        disclaimer:
          "This is a preliminary planning estimate based on standard Pune site conditions. Actual costs may vary depending on slope, accessibility, soil excavation needs, and plant selections.",
      },
    });
  } catch (error) {
    next(error);
  }
};
