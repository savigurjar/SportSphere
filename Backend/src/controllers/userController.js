const User = require("../models/user");
const jwt = require("jsonwebtoken")
const redisClient = require("../config/redis")
const bcrypt = require("bcrypt");
const validUser = require("../utils/validateUser");
const nodemailer = require("nodemailer");
const crypto = require("crypto");


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

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const people = await User.findById(req.result._id);
    if (!people) throw new Error("user not found");

    const isAllowed = await bcrypt.compare(oldPassword, people.password);
    if (!isAllowed) throw new Error("Old password is incorrect");

    people.password = await bcrypt.hash(newPassword, 10);
    await people.save();

    res.status(200).send("Password changed successfully");
  } catch (err) {
    res.status(400).send("Error " + err)
  }
};

const forgotPassword = async (req, res) => {
  try {
    const emailId = req.body?.emailId;  // optional chaining
    if (!emailId) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ emailId });

    if (!user) {
      return res.status(200).json({ message: "If email exists, reset link sent" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    const resetURL = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"HSA" <${process.env.EMAIL_USER}>`,
      to: emailId,
      subject: "Password Reset Request",
      html: `
        <p>You requested a password reset</p>
        <p>Click below to reset your password:</p>
        <a href="${resetURL}">Reset Password</a>
        <p>This link will expire in 10 minutes.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Reset link sent to your email" });

  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(400).json({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    console.log("INCOMING TOKEN:", req.params.token);

    const resetToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    console.log("HASHED INCOMING TOKEN:", resetToken);

    const people = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: new Date() }
    });

    if (!people) throw new Error("Invalid or expired token");

    people.password = await bcrypt.hash(req.body.password, 10);
    people.resetPasswordToken = undefined;
    people.resetPasswordExpire = undefined;

    await people.save();

    res.status(200).send("Password reset successfully");
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
};

// const updateProfile = async (req, res) => {
//   try {
//     const userId = req.result._id;

//     const allowedFields = ["firstName", "lastName", "age", "socialProfiles"];
//     const updates = {};

//     for (const field of allowedFields) {
//       if (req.body[field] !== undefined) {
//         updates[field] = req.body[field];
//       }
//     }

//     if (updates.socialProfiles) {
//       const allowedSocials = ["linkedin", "x", "leetcode", "github"];
//       const filtered = {};

//       for (const key of allowedSocials) {
//         if (updates.socialProfiles[key] !== undefined) {
//           filtered[key] = updates.socialProfiles[key];
//         }
//       }
//       updates.socialProfiles = filtered;
//     }

//     const user = await User.findByIdAndUpdate(
//       userId,
//       { $set: updates },
//       {
//         new: true,
//         runValidators: true,
//         select: "-password -resetPasswordToken -resetPasswordExpire",
//       }
//     );

//     res.status(200).json({
//       success: true,
//       user,
//       message: "Profile updated successfully",
//     });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find({}, '-password -resetPasswordToken -resetPasswordExpire')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalUsers = await User.countDocuments();

    res.status(200).json({
      success: true,
      page,
      limit,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      users
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
const adminRegister = async (req, res) => {
  try {
    await validUser(req.body);
    req.body.password = await bcrypt.hash(req.body.password, 10);


    const people = await User.create(req.body);

    const token = jwt.sign({ _id: people._id, role: people.role, emailId: people.emailId }, process.env.JWT_KEY, { expiresIn: "1d" })

   res.cookie("token", token, cookieOptions);

    res.status(201).send("Admin created successfully")
  } catch (err) {
    res.status(401).send("Error " + err)
  }
};

const deleteProfile = async (req, res) => {
  try {
    const userId = req.result._id;
    await User.findByIdAndDelete(userId);
    res.status(200).send("Profile Deleted Successfully")
  } catch (err) {
    res.status(400).send("Error " + err)
  }
};

// authController.js – add this function

const updateProfile = async (req, res) => {
  try {
    const userId = req.result._id; // from auth middleware

    // Allowed fields that can be updated (based on user schema)
    const allowedFields = [
      "firstName",
      "lastName",
      "phoneNumber",
      "gender",
      "dateOfBirth",
      "address",
      "profileImage"
    ];

    const updates = {};

    // Build update object only with fields present in request body
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        // If field is address, ensure it's an object (could be sent as JSON string)
        if (field === "address" && typeof req.body.address === "string") {
          try {
            updates.address = JSON.parse(req.body.address);
          } catch {
            updates.address = req.body.address;
          }
        } else {
          updates[field] = req.body[field];
        }
      }
    }

    // Update user and return new document (excluding password & reset tokens)
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      {
        new: true,
        runValidators: true,
        select: "-password -resetPasswordToken -resetPasswordExpire"
      }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user,
      message: "Profile updated successfully"
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getProfile,
  logoutUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getAllUsers,
  adminRegister,
  deleteProfile,
  updateProfile   // add this export
};

