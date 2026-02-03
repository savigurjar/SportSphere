const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const main = require("./config/db")
const redisClient = require("./config/redis");
const authRouter = require("./routes/userRoute")

app.use(express.json());
app.use(cookieParser());

app.use("/user", authRouter);

const initializeConnection = async () => {
    try {
        await Promise.all([main(), redisClient.connect()]);
        console.log("Connected to DB and Redis");

        app.listen(process.env.PORT, () => {
            console.log(`Server listening on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.log("Error Occurred:", err);
    }
};

initializeConnection();





