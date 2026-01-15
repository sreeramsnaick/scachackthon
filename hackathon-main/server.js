const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.js");
const authRouter = require("./routes/auth.js");
const commentRouter = require("./routes/comments.js");
const discussionRouter = require("./routes/discussion.js");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect("mongodb+srv://karthikwarrier103_db_user:IyqMsTjF9eVUPN4g@jana-nayakan.4owtetz.mongodb.net/?appName=Jana-Nayakan");
app.use(express.json());

app.use(cors({
    origin: "*",
    credentials: true
}));
app.use("/", userRouter);
app.use("/auth", authRouter);
app.use("/discussion", discussionRouter);
app.use("/comments", commentRouter);
app.listen(3000, (error)=> {
    if (error) {
        console.error(error);
    }
})