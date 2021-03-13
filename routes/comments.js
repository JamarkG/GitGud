const express = require("express");
const db = require("../db/models");
const router = express.Router();
const { csrfProtection, asyncHandler } = require("./utils");
const { check, validationResult } = require("express-validator");
const { loginUser, logoutUser, requireAuth } = require("../auth");

// route to delete a comment
router.delete(
  "/comments/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const commentId = parseInt(req.params.id, 10);
    const comment = await db.Comment.findByPk(commentId);
    await comment.destroy();
    res.json({ success: "Success!" });
  })
);

const commentValidator = [
  check("body")
    .exists({ checkFalsy: true })
    .withMessage("Comment cannot be empty."),
];

// make it so that when this route is hit then we create a comment with a postId for the page that we are on
// and the userId for the person in the current session
router.post(
  "/posts/:id/comments",
  requireAuth,
  commentValidator,
  asyncHandler(async (req, res) => {
    const validationErrors = validationResult(req).array();

    if (!validationErrors.length) {
      const postId = parseInt(req.params.id, 10);
      const { userId } = req.session.auth;
      const comment = await db.Comment.create({
        body: req.body.body,
        postId,
        userId,
      });
      res.json({
        success: true,
        comment,
      });
    } else {
      const { msg } = validationErrors[0];
      res.json({
        success: false,
        msg,
      });
    }
  })
);

router.patch(
  "/comments/:id(\\d+)",
  requireAuth,
  commentValidator,
  asyncHandler(async (req, res) => {
    const validationErrors = validationResult(req).array();

    if (!validationErrors.length) {
      const { body } = req.body;
      const commentId = parseInt(req.params.id, 10);
      const comment = await db.Comment.findByPk(commentId);
      await comment.update({
        body,
      });
      res.json({ success: true });
    } else {
      const { msg } = validationErrors[0];
      res.json({
        success: false,
        msg,
      });
    }
  })
);

module.exports = router;
