const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const handleAlreadyExists= (res, msg, user) => {
  if (user!=null) {
    return res.json({ msg, status: false });
  }
};
const handleUserNotFound = (res, msg, user) => {
  if (!user) {
    return res.json({ msg, status: false });
  }
};
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    //input validation checks
    if (username === "" || password === "") {
      return res.json({ msg: "Enter the credentials first", status: false });
    }
   //checking if user exist
    const user = await User.findOne({ username });
    handleUserNotFound(res, "Incorrect Username ", user);
   //checking if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg:"Incorrect  Password", status: false });
    }

    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};
module.exports.register = async (req, res, next) => {
  try { 
    const { username, email, password } = req.body;
    //input validation checks
    if (username === "" || password === "" || email=="") {
      return res.json({ msg: "Enter the credentials first", status: false });
    }
    //check if user exist
    const usernameCheck = await User.findOne({ username });
    console.log(usernameCheck)
    handleAlreadyExists(res, "Username already used", usernameCheck);
    //check if email already exists
    const emailCheck = await User.findOne({ email });
    handleAlreadyExists(res, "Email already used", emailCheck);
    const costFactor=10;
    //calculating hash
    const hashedPassword = await bcrypt.hash(password, costFactor);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const
    //getting  user with id
     users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    
    const userId = req.params.id;
    const avatarImage = req.body.image;
    //setting and updating the avatar profile picture
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    //loging out the account
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
