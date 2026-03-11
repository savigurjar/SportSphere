const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const main = require("./config/db")
const redisClient = require("./config/redis");
const authRouter = require("./routes/userRoute")
const cors = require("cors");

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));
const allowedOrigins = [
  "https://himalayanfootballclub.onrender.com",
  "http://localhost:5173",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow server-to-server / Postman

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(null, false); // IMPORTANT: don't throw
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", authRouter);

app.get('/',(req,res)=>{
    res.send({
        activeStatus:true,
        error:false
    })
})

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





