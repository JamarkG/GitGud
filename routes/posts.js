const express = require("express");
const db = require("../db/models");
const router = express.Router();
const { csrfProtection, asyncHandler } = require("./utils");
const { check, validationResult } = require("express-validator");
const { loginUser, logoutUser, requireAuth } = require("../auth");

router.get('/create', csrfProtection, requireAuth, asyncHandler(async (req, res) => {
    res.render('posts-create', {title: "Create Post", csrfToken: req.csrfToken()});
}))

const postValidators = [
    check('title')
        .exists({checkFalsy: true})
        .withMessage('Post must have a title')
        .isLength({max: 100})
        .withMessage('Title must be under 100 characters or less')
];

router.post('/create', csrfProtection, postValidators, asyncHandler(async (req, res) => {
    const { title, textField} = req.body;
    const { userId } = req.session.auth;
    const post = db.Post.build({ title, textField, userId});

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await post.save();
        res.redirect(`/posts/${userId}`)
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('posts-create', {
            title: 'Create Post',
            csrfToken: req.csrfToken(),
            errors,
            post
        })
    }
}))




module.exports = router
