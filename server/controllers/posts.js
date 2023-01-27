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
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        // sort({ _id: -1 }) is gona return the newest posts first
        // limit means limit qeder posts qaytar
        // skipde deyirki meselen 2ci seyfedesense ancaq 2nin postlarini goster daha 1den baslama
        res.json(
            {
                posts: posts,
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
        //bunu yazanda axtarisda "me" versek bele "merni" tapacaq
        const title = new RegExp(searchQuery, "i"); // registr sensitive

        const posts = await PostMessage.find(
            { $or: [{ title: title }, { tags: { $in: tags.split(',') } }] }
        );// hansi yazilan tagi include edirse butun o postlari qaytaracaq(amcaq birinci tapdigini yox)


        res.json(posts); 
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// GET SINGLE POST
export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        res.status(200).json(post);

    } catch (error) {
        console.log(error);
        res.status(404).json(error.message);
    }
}

// CREATE POST
export const createPost = async (req, res) => {
    try {
        const newPost = new PostMessage(
            { ...req.body, creator: req.userId }
            //, createdAt: new Date().toISOString() sildim bunu
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
        res.status(404).json(err.message)
    }
}

// DELETE POST
export const deletePost = async (req, res) => {

    try {
        await PostMessage.findByIdAndDelete(req.params.id)

        res.status(200).json(req.params.id)

    } catch (err) {
        res.status(404).json(err.message)
    }
}

// COMMENT POST
export const commentPost = async (req, res) => {
    const postId = req.params.id;
    const commentValue = req.body.value;
    // commentValue => 'Nargiz Hasanova: check'

    try {
        const post = await PostMessage.findById(postId);
        post.comments.push(commentValue);

        const updatedPost = await PostMessage.findByIdAndUpdate(postId, post, { new: true });
        res.json(updatedPost);
    } catch (err) {
        res.status(404).json(err.message)
    }
}

// LIKE POST
export const likePost = async (req, res) => {
    try {
        if (!req.userId) return res.json({ message: "Unauthenticated" });
        const post = await PostMessage.findById(req.params.postId) //req.params.id = postId
        const isLiked = post.likes.find((id) => id === req.userId);
        if (!isLiked) { // yeni postu bu id-de olan wexs like etmeyib
            // like the post
            post.likes.push(req.userId);
        } else {
            // dislike the post
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(req.params.postId, post, { new: true });
        console.log(updatedPost);
        res.status(200).json(updatedPost);

    } catch (err) {
        console.log(err);
        res.status(404).json({ message: err })
    }
}

























