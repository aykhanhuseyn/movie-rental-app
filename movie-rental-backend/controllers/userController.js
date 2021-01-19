const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// REGISTER
exports.register = async (req, res) => {
  try {
    let { email, password, confirm, name, gender } = req.body;

    // validate
    if (!name || !email || !password || !confirm || !gender)
      return res.status(400).json({ message: "Bütün sahələr doldurulmayıb." });
    if (password.length < 8)
      return res
        .status(400)
        .json({ message: "Şifrə minimum 8 simvoldan ibarət olmalıdır." });
    if (password !== confirm)
      return res
        .status(400)
        .json({ message: "Şifrə və şifrənin təkrarı eyni deyil." });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ message: `Bu email (${email}) artıq qeydiyyatdan keçib.` });

    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password,
      confirm,
      name,
      gender,
    });
    // const savedUser = await newUser.save();
    // res.json(savedUser);
    newUser.save(function (err, user) {
      if (err) {
        return res.status(400).send({
          message: err,
        });
      }

      user.password = undefined;
      return res.json(user);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    console.log("request body", req.body);
    const { email, password, remember } = req.body;

    // validate
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email və ya şifrə boş ola bilməz." });

    const user = await User.findOne({ email });

    const compare = await user.comparePassword(password);
    if (!user || !compare) {
      return res.status(401).json({
        message: "Yoxlama uğursuz oldu. İstifadəçi adı və ya şifrə yanlışdır.",
      });
    }

    let expiresIn = remember ? "3 days" : "10h";
    const token = jwt.sign(
      { id: user._id, iat: Math.floor(Date.now() / 1000) - 30 },
      process.env.JWT_SECRET,
      { expiresIn }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.tokenIsValid = async function (req, res) {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
