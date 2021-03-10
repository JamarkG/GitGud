const express = require("express");
const db = require("../db/models");
const router = express.Router();
const { csrfProtection, asyncHandler } = require("./utils");
const { check, validationResult } = require("express-validator");
const { loginUser, logoutUser, requireAuth } = require("../auth");
const { names } = require("debug");


/* GET home page. */
router.get('/', asyncHandler( async (req, res, next) => {
  const topics = await db.Topic.findAll();

  res.render('index', { topics, title: 'Welcome to Gitgud' });
}));

module.exports = router;
