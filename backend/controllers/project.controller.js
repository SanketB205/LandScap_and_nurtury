import Project from "../models/Project.js";
import slugify from "slugify";

// @desc    Get all projects
// @route   GET /api/projects
export const getAllProjects = async (req, res, next) => {
  try {
    const { category, featured, status } = req.query;
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

    const projects = await Project.find(query).sort({ completionDate: -1, createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project by slug
// @route   GET /api/projects/:slug
export const getProjectBySlug = async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new project
// @route   POST /api/projects (Admin only)
export const createProject = async (req, res, next) => {
  try {
    const { title, location, category, description, clientName, area, beforeImage, afterImage, gallery, completionDate, isFeatured } = req.body;

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
    });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id (Admin only)
export const updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    if (req.body.title && req.body.title !== project.title) {
      req.body.slug = slugify(req.body.title, { lower: true, strict: true });
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

// @desc    Delete project
// @route   DELETE /api/projects/:id (Admin only)
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
