import { useState } from "react";
import axios from "axios";
import slugify from "slugify";

const AddService = () => {
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    intro: "",
    features: "",
    advantages: "",
    bannerImage: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      slug: slugify(form.title, { lower: true }),
      features: form.features.split("\n"),
      advantages: form.advantages.split("\n"),
    };

    await axios.post("http://localhost:5000/api/services", payload);
    alert("✅ Service Added Successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-green-700 to-green-500 p-6">
          <h1 className="text-3xl font-bold text-white">
            🌿 Add New Service
          </h1>
          <p className="text-green-100 mt-1">
            Create a new landscaping or nursery service
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          {/* Title */}
          <div className="md:col-span-2">
            <label className="label">Service Title</label>
            <input
              name="title"
              placeholder="Artificial Grass Installation"
              className="input"
              onChange={handleChange}
              required
            />
          </div>

          {/* Short Description */}
          <div className="md:col-span-2">
            <label className="label">Short Description</label>
            <textarea
              name="shortDescription"
              placeholder="Short summary for cards & SEO"
              className="input h-24"
              onChange={handleChange}
            />
          </div>

          {/* Intro */}
          <div className="md:col-span-2">
            <label className="label">Introduction</label>
            <textarea
              name="intro"
              placeholder="Detailed intro about the service"
              className="input h-32"
              onChange={handleChange}
            />
          </div>

          {/* Features */}
          <div>
            <label className="label">Features</label>
            <textarea
              name="features"
              placeholder="• Feature one&#10;• Feature two"
              className="input h-40"
              onChange={handleChange}
            />
          </div>

          {/* Advantages */}
          <div>
            <label className="label">Advantages</label>
            <textarea
              name="advantages"
              placeholder="• Advantage one&#10;• Advantage two"
              className="input h-40"
              onChange={handleChange}
            />
          </div>

          {/* Image URL */}
          <div className="md:col-span-2">
            <label className="label">Banner Image URL</label>
            <input
              type="text"
              placeholder="https://images.unsplash.com/..."
              className="input"
              value={form.bannerImage}
              onChange={(e) =>
                setForm({ ...form, bannerImage: e.target.value })
              }
            />
          </div>

          {/* Image Preview */}
          {form.bannerImage && (
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500 mb-2">Preview</p>
              <img
                src={form.bannerImage}
                className="w-full h-64 object-cover rounded-xl border"
              />
            </div>
          )}

          {/* Submit */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl shadow-lg transition font-semibold"
            >
              🌱 Add Service
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddService;
