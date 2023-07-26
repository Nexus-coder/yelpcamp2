const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');

router.route('/register')
.get(catchAsync(users.renderRegisterForm))
.post(catchAsync(users.postRegisteredForm));

router.route('/login')
.get(catchAsync(users.renderLoginForm))
.post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),catchAsync(users.postLoginForm))

router.get("/logout",users.logout);

module.exports = router;