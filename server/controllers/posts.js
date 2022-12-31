import PostMessage from "../models/postMessage.js"

// GET ALL POSTS
// export const getPosts = async (req, res) => {
//     try {
//         const allPosts = await PostMessage.find()
//         res.status(200).json(allPosts)
//     } catch (err) {
//         res.status(404).json({ message: err.message })
//     }
// }
export const getPosts = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

        const total = await PostMessage.countDocuments({});
        // sort({ _id: -1 }) is gona return the newest posts first
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        // limit means limit qeder posts qaytar
        // skipde deyirki meselen 2ci seyfedesense ancaq 2nin postlarini goster daha 1den baslama
        res.json(
            {
                data: posts,
                currentPage: Number(page),
                numberOfPages: Math.ceil(total / LIMIT)
            }
        );
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// GET POSTS BY SEARCH
export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i"); // registr sensitive

        const posts = await PostMessage.find(
            { $or: [{ title }, { tags: { $in: tags.split(',') } }] }
        );

        res.json({ data: posts }); // data-nin burda yazilmasinin ne menasi var sonradan iki defe destructure edecik ic ice gic gic
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// GET SINGLE POST
export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        console.log(post);
        res.status(200).json(post);

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}



// CREATE POST
export const createPost = async (req, res) => {
    try {
        const newPost = new PostMessage(
            { ...req.body, creator: req.userId, createdAt: new Date().toISOString() }
        )

        const savedPost = await newPost.save()
        res.status(201).json(savedPost)

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

// UPDATE POST
export const updatePost = async (req, res) => {

    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
        )

        res.status(200).json(updatedPost)

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

// DELETE POST
export const deletePost = async (req, res) => {

    try {
        await PostMessage.findByIdAndDelete(req.params.id)

        res.status(200).json("post had been deleted successfully")

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

// COMMENT POST
export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;
    // req.body.value => {value: 'Nargiz Hasanova: check'}

    try {
        const post = await PostMessage.findById(id);
        post.comments.push(value);

        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

        res.json(updatedPost);

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

// LIKE POST
export const likePost = async (req, res) => {
    try {
        if (!req.userId) return res.json({ message: "Unauthenticated" });
        const post = await PostMessage.findById(req.params.id)

        // likes is array of strings
        const index = post.likes.findIndex((id) => id === String(req.userId));
        if (index === -1) { // yeni postu bu id-de olan wexs like etmeyib
            // like the post
            post.likes.push(req.userId);
        } else {
            // dislike the post
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(req.params.id, post, { new: true });
        res.status(200).json(updatedPost);

    } catch (err) {
        console.log(err);
        res.status(404).json({ message: err })
    }
}