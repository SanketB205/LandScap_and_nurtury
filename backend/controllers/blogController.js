import Blog from '../Models/blogModel.js';

// Seed data
const initialBlogs = [
    {
        title: "10 Easy Plants for Beginners",
        description:
            "Start your gardening journey with low-maintenance plants like Snake Plant, Aloe Vera, and Money Plant. Perfect for homes and offices.",
        image:
            "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
    },
    {
        title: "Landscaping Ideas for Small Gardens",
        description:
            "Transform small spaces into beautiful green paradises using vertical gardens, decorative stones, and smart plant layering.",
        image:
            "https://images.unsplash.com/photo-1598908314732-07113901949e",
    },
    {
        title: "Seasonal Plant Care Guide",
        description:
            "Learn how to take care of your plants during summer, monsoon, and winter with simple watering and pruning techniques.",
        image:
            "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFuZHNjYXBlc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        title: "10 Easy Plants for Beginners",
        description:
            "Start your gardening journey with low-maintenance plants like Snake Plant, Aloe Vera, and Money Plant. Perfect for homes and offices.",
        image:
            "https://plus.unsplash.com/premium_photo-1681398647663-584fabb61317?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGFuZHNjYXBlJTIwcGVvcGxlfGVufDB8fDB8fHww",
    },
    {
        title: "Landscaping Ideas for Small Gardens",
        description:
            "Transform small spaces into beautiful green paradises using vertical gardens, decorative stones, and smart plant layering.",
        image:
            "https://plus.unsplash.com/premium_photo-1661849531267-dbcf99ca7b48?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGFuZHNjYXBlJTIwcGVvcGxlfGVufDB8fDB8fHww",
    },
    {
        title: "Seasonal Plant Care Guide",
        description:
            "Learn how to take care of your plants during summer, monsoon, and winter with simple watering and pruning techniques.",
        image:
            "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735",
    },
];

export const getAllBlogs = async (req, res) => {
    try {
        
            await Blog.deleteMany({});
            await Blog.insertMany(initialBlogs);
            let blogs = await Blog.find();
            res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
