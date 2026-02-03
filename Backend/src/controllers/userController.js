const User = require("../models/user");
const jwt = require("jsonwebtoken")
const redisClient = require("../config/redis")
const bcrypt = require("bcrypt");
const validUser = require("../utils/validateUser");


const isProd = process.env.NODE_ENV === "production";

const cookieOptions = {
    httpOnly: true,
    secure: isProd,                 // https ke liye
    sameSite: isProd ? "None" : "Lax",
    maxAge: 24 * 60 * 60 * 1000,
};


const signupUser = async (req, res) => {
    try {

        await validUser(req.body);

        req.body.password = await bcrypt.hash(req.body.password, 10);
        req.body.role = "user";

        const people = await User.create(req.body);
        const reply = {
            firstName: people.firstName,
            emailId: people.emailId,
            _id: people._id
        }

        const token = jwt.sign(
            { _id: people._id, role: people.role, emailId: people.emailId },
            process.env.JWT_KEY,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, cookieOptions);
        res.status(201).json({
            user: reply,
            message: "User created successfully"
        });


    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const people = await User.findOne({ emailId });
        if (!people) throw new Error("Invalid Credentials");

        const Isallowed = await bcrypt.compare(password, people.password);
        if (!Isallowed) throw new Error("Invalid Credentials")

        const reply = {
            firstName: people.firstName,
            emailId: people.emailId,
            _id: people._id
        }

        const token = jwt.sign({ _id: people._id, role: people.role, emailId: people.emailId }, process.env.JWT_KEY, { expiresIn: "1d" })

        res.cookie("token", token, cookieOptions);

        res.status(200).json({
            user: reply,
            message: "User Login Successfully"
        })
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message || "Login failed",
        });
    }
}

const getProfile = async (req, res) => {
    try {
        res.status(200).json({ user: req.result });

    } catch (err) {
        res.status(400).send("Error " + err)
    }
}

const logoutUser = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("Token is missing");

    const payload = jwt.verify(token, process.env.JWT_KEY);

    await redisClient.set(`token:${token}`, "Blocked");
    await redisClient.expireAt(`token:${token}`, payload.exp);


    res.clearCookie("token", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "None" : "Lax",
    });

    res.status(200).send("Logout Successfully")
  } catch (err) {
    res.status(401).send("Error " + err.message);
  }
};


module.exports = { signupUser, loginUser, getProfile ,logoutUser};