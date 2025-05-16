const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");


const app = express();
app.use(cors({
    origin: '*',
}))

app.use(express.json());
dotenv.config();
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("connected successfully to the database")
}).catch((err) => {
    console.log("error connecting to the database", err)
});

app.listen(process.env.PORT)
console.log(`server is running on port ${process.env.PORT}`)
module.exports = app;
const userRoute = require("./routes/user.route");
app.use("/api/user", userRoute);
const announceRoute = require("./routes/Announce.route");
app.use("/api/announce", announceRoute);