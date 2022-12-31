import mongoose from 'mongoose';
const { Schema } = mongoose

const PostSchema = new Schema({
    title: String,
    message: String,
    name: String,
    creator: String, //user-creator's id
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    comments: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

export default mongoose.model("PostMessage", PostSchema)
