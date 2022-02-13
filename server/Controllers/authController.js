const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerController = async (request, response) => {
  let userInfo = request.body;
  try {
    const searchedUser = await User.findOne({ email: userInfo.email });
    if (searchedUser) {
      return response
        .status(400)
        .json({ errors: [{ msg: "user already exists" }] });
    }
    const hashedPasword = await bcrypt.hash(userInfo.password, 10);
    const user = await new User({
      name: userInfo.name,
      email: userInfo.email,
      phone:userInfo.phone,
      password: hashedPasword,
    });
    await user.save();
    const token = jwt.sign(
      { name: user.username, email: user.email, id: user._id },
      process.env.KEY
    );
    response.status(200).json({ user, token });
  } catch (error) {
    response.status(500).json({ errors: [{ msg: "error server" }] });
  }
};
const loginController = async (request, response) => {
  //request
  const userInfo = request.body;
  try {
    //search for user
    const user = await User.findOne({ email: userInfo.email });
    if (!user) {
      return response
        .status(401)
        .json({ errors: [{ msg: "you must register before" }] });
    }
    //compare the passwordl of the user request with the password saved on the databse (searchedUser)
    const result = await bcrypt.compare(userInfo.password, user.password);
    if (!result) {
      return response
        .status(400)
        .json({ errors: [{ msg: "your passwordl is wrong" }] });
    }
    if (result == true) {
      const token = await jwt.sign(
        {
          name: user.name,
          email: user.email,
          id: user._id,
        },
        process.env.KEY
      );
      response.status(200).json({ user, token });
    }
  } catch (error) {
    response.status(500).json({ message: "login failed" });
  }
};

module.exports = { registerController, loginController };
