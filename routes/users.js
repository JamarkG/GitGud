const express = require("express");
const db = require("../db/models");
const router = express.Router();
const { QueryTypes, sequelize } = require('sequelize');
const { csrfProtection, asyncHandler } = require("./utils");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { loginUser, logoutUser, requireAuth } = require("../auth");

/* GET users listing. */
router.get(
  "/register",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    res.render("user-register", {
      title: "Register",
      csrfToken: req.csrfToken(),
    });
  })
);

const userValidators = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for First Name")
    .isLength({ max: 50 })
    .withMessage("First Name must not be more than 50 characters long"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Last Name")
    .isLength({ max: 50 })
    .withMessage("Last Name must not be more than 50 characters long"),
  check("emailAddress")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Email Address")
    .isLength({ max: 255 })
    .withMessage("Email Address must not be more than 255 characters long")
    .isEmail()
    .withMessage("Email Address is not a valid email")
    .custom((value) => {
      return db.User.findOne({ where: { emailAddress: value } }).then(
        (user) => {
          if (user) {
            return Promise.reject(
              "The provided Email Address is already in use by another account"
            );
          }
        }
      );
    }),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Password")
    .isLength({ max: 50 })
    .withMessage("Password must not be more than 50 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
    .withMessage(
      'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
    ),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Confirm Password")
    .isLength({ max: 50 })
    .withMessage("Confirm Password must not be more than 50 characters long")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm Password does not match Password");
      }
      return true;
    }),
];

router.post(
  "/register",
  csrfProtection,
  userValidators,
  asyncHandler(async (req, res, next) => {
    const { emailAddress, firstName, lastName, password } = req.body;

    const user = db.User.build({ emailAddress, firstName, lastName });
    // res.json(user);

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.hashedPassword = hashedPassword;
      await user.save();
      loginUser(req, res, user);
      req.session.save(() => {
        res.redirect("/");
      });
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("user-register", {
        title: "Register",
        user,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

router.get(
  "/login",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    res.render("user-login", {
      title: "Login",
      csrfToken: req.csrfToken(),
    });
  })
);

const loginValidators = [
  check("emailAddress")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an email address."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
];

router.post(
  "/login",
  csrfProtection,
  loginValidators,
  asyncHandler(async (req, res, next) => {
    const { emailAddress, password } = req.body;
    let errors = [];
    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
      const user = await db.User.findOne({ where: { emailAddress } });

      if (user) {
        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword.toString()
        );

        if (passwordMatch) {
          loginUser(req, res, user);
          return req.session.save(() => {
            res.redirect("/");
          });
        }
      }

      errors.push("Login attempt failed");
    } else {
      errors = validationErrors.array().map((error) => error.msg);
    }
    res.render("user-login", {
      title: "User Login",
      errors,
      csrfToken: req.csrfToken(),
    });
  })
);

router.get("/logout", (req, res) => {
  logoutUser(req, res);
  return req.session.save(() => {
    res.redirect("/users/login");
  });
});

router.get("/profile",
  csrfProtection,
  requireAuth,
  asyncHandler(async (req, res, next) => {
    let pK = req.session.auth.userId;
    const user = await db.User.findByPk(pK);
    res.render("profile", { user, title: "Update Profile", csrfToken: req.csrfToken() })

  })
);

router.post("/profile",
  csrfProtection,
  requireAuth,
  asyncHandler(async (req, res, next) => {
    // console.log(req);
    let pK = req.session.auth.userId;
    const user = await db.User.findByPk(pK);
    if(req.body.firstName){
      await db.User.update({ firstName: `${req.body.firstName}` }, {
        where: {
          firstName: `${user.firstName}`
        }
      });
      var welcomeTitleName = req.body.firstName;
    }
    if(req.body.lastName){
      await db.User.update({ lastName: `${req.body.lastName}` }, {
        where: {
          lastName: `${user.lastName}`
        }
      });
      if(!req.body.firstName){
        var welcomeTitleName = user.firstName;
      }
    }
    if(req.body.emailAddress){
      await db.User.update({ emailAddress: `${req.body.emailAddress}` }, {
        where: {
          emailAddress: `${user.emailAddress}`
        }
      });
      if(!req.body.firstName){
        var welcomeTitleName = user.firstName;
      }
    }

    const topics = await db.Topic.findAll();
    const posts = await db.Post.findAll({
      include: ['Topics']
    });
    if (req.session.auth) {
      const userId = req.session.auth.userId;
      const user = await db.User.findByPk(userId);
      res.render("index", { posts, topics, title: `Welcome to GitGud, ${welcomeTitleName}!` })
    }
  })
);

// comment test
// second comment test
module.exports = router;
