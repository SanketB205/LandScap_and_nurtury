import Project from "../models/Project.js";
import slugify from "slugify";

// @desc    Get all projects (paginated)
// @route   GET /api/projects
export const getAllProjects = async (req, res, next) => {
  try {
    const { category, featured, status, page = 1, limit = 50 } = req.query;
    let query = {};

    if (!status || status === "published") {
      query.status = "published";
    } else if (status) {
      query.status = status;
    }

    if (category && category !== "all") {
      query.category = category;
    }

    if (featured === "true") {
      query.isFeatured = true;
    }

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [projects, total] = await Promise.all([
      Project.find(query)
        .sort({ completionDate: -1, createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Project.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: projects.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project by slug
// @route   GET /api/projects/:slug
export const getProjectBySlug = async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug, status: "published" });
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new project (Admin only)
// @route   POST /api/projects
export const createProject = async (req, res, next) => {
  try {
    const {
      title,
      location,
      category,
      description,
      clientName,
      area,
      beforeImage,
      afterImage,
      gallery,
      completionDate,
      isFeatured,
      seoTitle,
      seoDescription,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Title and description are required." });
    }

    const slug = slugify(title, { lower: true, strict: true });
    const existing = await Project.findOne({ slug });
    if (existing) {
      return res.status(400).json({ success: false, message: "A project with this title already exists." });
    }

    const project = await Project.create({
      title,
      slug,
      location: location || "Pune, Maharashtra",
      category: category || "Residential",
      description,
      clientName: clientName || "Private Client",
      area: area || "",
      beforeImage: beforeImage || "",
      afterImage: afterImage || "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=1200&q=80",
      gallery: gallery || [],
      completionDate: completionDate || Date.now(),
      isFeatured: Boolean(isFeatured),
      status: "published",
      seoTitle: seoTitle || "",
      seoDescription: seoDescription || "",
    });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project (Admin only)
// @route   PUT /api/projects/:id
export const updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    if (req.body.title && req.body.title !== project.title) {
      req.body.slug = slugify(req.body.title, { lower: true, strict: true });
      const existing = await Project.findOne({ slug: req.body.slug, _id: { $ne: project._id } });
      if (existing) {
        return res.status(400).json({ success: false, message: "A project with this title already exists." });
      }
    }

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// @desc    Archive/restore project (Admin only)
// @route   PATCH /api/projects/:id/archive
export const archiveProject = async (req, res, next) => {
  try {
    const { archived } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    project.status = archived ? "archived" : "published";
    await project.save();

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project (Admin only)
// @route   DELETE /api/projects/:id
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }
    res.status(200).json({ success: true, message: "Project deleted successfully." });
  } catch (error) {
    next(error);
  }
};
