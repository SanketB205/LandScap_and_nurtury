import Inquiry from "../models/Inquiry.js";
import Service from "../models/services.js";
import Plant from "../models/Plant.js";
import Project from "../models/Project.js";

// @desc    Get real database stats for Admin dashboard
// @route   GET /api/analytics/stats (Admin only)
export const getAdminStats = async (req, res, next) => {
  try {
    const [
      totalInquiries,
      newInquiries,
      contactedInquiries,
      completedInquiries,
      totalServices,
      activeServices,
      totalPlants,
      activePlants,
      totalProjects,
      publishedProjects,
      recentInquiries,
    ] = await Promise.all([
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: "New" }),
      Inquiry.countDocuments({ status: "Contacted" }),
      Inquiry.countDocuments({ status: "Completed" }),
      Service.countDocuments(),
      Service.countDocuments({ status: "active" }),
      Plant.countDocuments(),
      Plant.countDocuments({ status: "active" }),
      Project.countDocuments(),
      Project.countDocuments({ status: "published" }),
      Inquiry.find().sort({ createdAt: -1 }).limit(10),
    ]);

    // Inquiries by property type
    const propertyTypeStats = await Inquiry.aggregate([
      { $group: { _id: "$propertyType", count: { $sum: 1 } } },
    ]);

    // Inquiries by status
    const statusStats = await Inquiry.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalInquiries,
        newInquiries,
        contactedInquiries,
        completedInquiries,
        totalServices,
        activeServices,
        totalPlants,
        activePlants,
        totalProjects,
        publishedProjects,
        recentInquiries,
        propertyTypeStats,
        statusStats,
      },
    });
  } catch (error) {
    next(error);
  }
};
