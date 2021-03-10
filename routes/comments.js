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

// make it so that when this route is hit then we create a comment with a postId for the page that we are on
// and the userId for the person in the current session
router.post("/posts/:id/comments", requireAuth, asyncHandler(async ( req, res) => {
  console.log(req.body)
  const postId = parseInt(req.params.id, 10)
  const { userId } = req.session.auth;
  await db.Comment.create({
    body: req.body.body,
    postId,
    userId,
  })
  res.json({ success: "Success!" });
}))

module.exports = router;