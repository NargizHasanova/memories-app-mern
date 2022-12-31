import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import dotenv from "dotenv";

const app = express()
dotenv.config()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());
app.use("/posts", postRoutes)
app.use("/user", userRoutes)

// mongoose
//     .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifedTopology: true })
//     .then(app.listen(PORT, () => console.log('server is running on port ' + PORT)))
//     .catch(err => console.log('DB error', err)) bu error verir Operation `postmessages.insertOne()` buffering timed out after 10000ms

mongoose
    .connect(process.env.CONNECTION_URL)
    .then(() => console.log("DB ok"))
    .catch(err => console.log('DB error', err))

app.listen(process.env.PORT, () => {
    console.log("backend is runnig");
})