const express = require("express");
const Register = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult, check } = require("express-validator");
// const md5 = require("md5");

const router = express.Router();

function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Parse token
    const showToken = JSON.parse(bearerToken);
    // Set the token
    req.token = showToken.token;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

/* GET ALL Users */
// router.get("/", function (req, res, next) {
//   Register.find(function (err, register) {
//     if (err) return next(err);
//     res.json(register);
//   });
// });

/* GET SINGLE User BY ID */
// router.get("/:id", function (req, res, next) {
//   Register.findById(req.params.id, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

const validationChecks = [
    check(
      "firstName",
      "Name must be as least 3 characters long!"
    ).isLength({ min: 3 }),
    // check(
    //     "firstName",
    //     "Name must be as least 3 characters long!"
    //   ).isLength({ min: 3 }).matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic.'),

    //     .isLength({min:3}).withMessage('Name must be of 3 characters long.')
//    .matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic.')
    check(
        "lastName",
        "Last Name must be as least 3 characters long!"
    ).isLength({ min: 3 }),
    check("email", "Invalid email address!").isEmail(),
    // check("password", "Password is not strong enough. You must include one lower case, one uppercase and one number!").isStrongPassword({ minSymbols: 0 })
    check("password", "Password is not strong enough. You must include one lower case, one uppercase and one number!").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
  ];



router.post("/", validationChecks, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            // res.json(errors);
            // res.json({ errMessage: errors });
            // res.json({ errMessage: errors.msg });
            res.json({ errMessage: "Password is not strong enough!" });
        } else {
            const email = req.body.email;
            let user = await Register.findOne({ email });
            if (user) {
                // res.json("This email already exists!");
                res.json({ errMessage: "This email already exists!" });
                return;
            } else {
                const userData = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    // password: md5(req.body.password),
                    password: bcrypt.hashSync(req.body.password, 8)
                };
                Register.create(userData, function (err, post) {
                    if (err) return err;
                    // res.json("You have been registred successfully!");
                    res.json({ successMessage: "You have been registered successfully!" });
                    return;
                });
            }
        }
    } catch (e) {
        res.sendStatus(500)
    }
});


/* DELETE User */
// router.delete("/:id", function (req, res) {
//     try {
//         Register.findByIdAndDelete(req.params.id, (err, user) => {
//             if (err) return err;
//             res.json(user);
//         });
//     } catch (e) {
//         // res.sendStatus(500)
//         res.status(500).json({errorMsg: 'User not found!'});
//     }
// });

module.exports = router;
