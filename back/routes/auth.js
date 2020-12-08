const express = require("express");
const User = require("../models/User");
// const Role = require("../models/Role");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();


router.post("/login", async (req, res) => {
  const email = req.body.email;
  try {
    await User.findOne({ email }).exec((err, user) => {
        if(err) return err
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        function generateAccessToken(user) {
            return jwt.sign(user, "secretkey", { expiresIn: "180m" });
        }
        const token = generateAccessToken({ user: user });

        res.json({ token: token, user: user});
    })
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
