const express = require("express");
const Register = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult, check } = require("express-validator");

const router = express.Router();

const validationChecks = [
    check(
      "firstName",
      "Name must be as least 3 characters long!"
    ).isLength({ min: 3 }),
    check(
        "lastName",
        "Last Name must be as least 3 characters long!"
    ).isLength({ min: 3 }),
    check("email", "Invalid email address!").isEmail(),
    check("password", "Password is not strong enough. You must include one lower case, one uppercase and one number!").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
];


router.post("/", validationChecks, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            res.json({ errMessage: "Password is not strong enough!" });
        } else {
            const email = req.body.email;
            let user = await Register.findOne({ email });
            if (user) {
                res.json({ errMessage: "This email already exists!" });
                return;
            } else {
                const userData = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 8)
                };
                Register.create(userData, function (err, post) {
                    if (err) return err;
                    res.json({ successMessage: "You have been registered successfully!" });
                    return;
                });
            }
        }
    } catch (e) {
        res.sendStatus(500)
    }
});

module.exports = router;
