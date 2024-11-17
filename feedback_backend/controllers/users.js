const Users = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.renderSignupForm=async (req, res) => {
    try {
      const { username, email, password } = req.body;
      console.log(req.body);
      const user = await Users.findOne({ email });
      if (user) {
        return res
          .status(404)
          .json({ message: "User already exists, you can login",success:true });
      }
      const newUser = new Users({
        username,
        email,
        password,
      });
      newUser.password = await bcrypt.hash(password, 10);
      await newUser.save();
  
      res.status(200).json({ message: "User signup successfully", success:true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", success:false });
    }
  };

  module.exports.renderLoginForm=async (req, res) => {
    try {
      const { email, password } = req.body;
      // console.log(req.body);
      const user = await Users.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not exists, you can signup", success:false});
      }
  
      const isPassEqual = await bcrypt.compare(password, user.password);
      if (!isPassEqual) {
        return res
          .status(404)
          .json({ message: "please check your email or password" , success:false });
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
          success:true,
          jwtToken,
          email,
          username: user.username,
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", success:false });
    }
  };