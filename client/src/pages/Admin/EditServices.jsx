import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditService = () => {
    const { id } = useParams();
    const [form, setForm] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/services`)
            .then(res => {
                const service = res.data.find(s => s._id === id);
                setForm({
                    ...service,
                    features: service.features.join("\n"),
                    advantages: service.advantages.join("\n"),
                });
            });
    }, [id]);

    const uploadImage = async (file) => {
        const data = new FormData();
        data.append("image", file);
        const res = await axios.post(
            "http://localhost:5000/api/services/upload",
            data
        );
        return res.data.url;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...form,
            features: form.features.split("\n"),
            advantages: form.advantages.split("\n"),
        };

        await axios.put(
            `http://localhost:5000/api/services/${id}`,
            payload
        );

        alert("Service Updated");
    };

    if (!form) return <p>Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Edit Service</h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    name="title"
                    value={form.title}
                    className="input"
                    onChange={handleChange}
                />

                <textarea
                    name="shortDescription"
                    value={form.shortDescription}
                    className="input"
                    onChange={handleChange}
                />

                <textarea
                    name="intro"
                    value={form.intro}
                    className="input h-32"
                    onChange={handleChange}
                />

                <textarea
                    name="features"
                    value={form.features}
                    className="input h-32"
                    onChange={handleChange}
                />

                <textarea
                    name="advantages"
                    value={form.advantages}
                    className="input h-32"
                    onChange={handleChange}
                />

                {/* <input
          type="file"
          onChange={async (e) => {
            const url = await uploadImage(e.target.files[0]);
            setForm({ ...form, bannerImage: url });
          }}
        />

        {form.bannerImage && (
          <img src={form.bannerImage} className="h-40 rounded" />
        )} */}

                <input
                    type="text"
                    name="bannerImage"
                    value={form.bannerImage}
                    className="input"
                    onChange={handleChange}
                />

                {form.bannerImage && (
                    <img
                        src={form.bannerImage}
                        className="h-40 rounded border"
                    />
                )}

                <button className="bg-green-600 text-white px-6 py-2 rounded">
                    Update Service
                </button>

            </form>
        </div>
    );
};

export default EditService;
