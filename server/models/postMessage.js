import mongoose from 'mongoose';
const { Schema } = mongoose

const PostSchema = new Schema({
    title: String,
    message: String,
    name: String,// userin adi,onuda frontda elagelendirecik
    creator: String, //user-creator's id HARDAN GELDIYINI ARASDIR
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],// array of user id's
        default: []
    },
    comments: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date().toISOString(),
    },
})

export default mongoose.model("PostMessage", PostSchema)
