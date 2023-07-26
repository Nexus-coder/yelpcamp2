const express = require('express')
const router = express.Router({mergeParams:true});
const Campground = require('../models/camp');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { reviewSchema } = require('../schemas.js');
const Review = require('../models/reviews');
const { isLoggedin,validateReview,isReviewAuthor } = require('../middleware');
const reviews = require('../controllers/reviews')

router.post('/',isLoggedin,validateReview,catchAsync(reviews.postReview))

router.delete('/:reviewId',isLoggedin,isReviewAuthor,catchAsync(reviews.deleteReview))

module.exports = router;