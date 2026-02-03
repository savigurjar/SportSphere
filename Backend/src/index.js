const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const main = require("./config/db")


app.use(express.json());
app.use(cookieParser());







