const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const Users = require("./model/user");
const Feedback = require("./model/feedback");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { signUpValidation, loginValidation, isAuthorized } = require("./middleware");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = 8080;
const mongo_url = process.env.MONGO_URL;
async function main() {
  await mongoose.connect(mongo_url);
}

main()
  .then((result) => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

// ********************signup route*******************
app.post("/signUp", signUpValidation, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // console.log(req.body);
    const user = await Users.findOne({ email });
    if (user) {
      return res
        .status(404)
        .json({ message: "User already exists, you can login" });
    }
    const newUser = new Users({
      username,
      email,
      password,
    });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});
// *******************login route****************
app.post("/login", loginValidation, async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    const user = await Users.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not exists, you can signup" });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res
        .status(404)
        .json({ message: "please check your email or password" });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res
      .status(200)
      .json({
        message: "User login successfully",
        jwtToken,
        email,
        name: user.name,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ############## routes for the feedback ##############

app.get("/feedbacks",isAuthorized, async (req, res) => {
  try {
    console.log("logged in user deatails------", req.user);
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.post("/feedbacks",isAuthorized, async (req, res) => {
  try {
    const { title, description, rating } = req.body;
    const newFeedback = new Feedback({
      title,
      description,
      rating,
    });
    res.status(200).json(newFeedback);
    await newFeedback.save();
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.listen(port, () => console.log("server is listening the port 8080 "));

app.get("/posts", (req, res) => {
  res.send("hello, i am home");
});
