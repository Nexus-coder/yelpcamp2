const Review = require('./models/reviews');
const Campground = require('./models/camp');
const ExpressError = require('./utils/ExpressError')
const { campgroundSchema,reviewSchema } = require('./schemas.js');

module.exports.isLoggedin = (req,res,next) => {
    if (!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('success','You need to be signed in');
        return res.redirect('/login');
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id,reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('success', 'Cannot update this campground');
        return res.redirect(`/makeGrounds/${id}`);
    }
    next();
}

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.isValid = async (req, res, next) => {
    const { id } = req.params;
    const camp = await Campground.findById(id);
    if (!camp.author.equals(req.user._id)) {
        req.flash('success', 'Cannot update this campground');
        return res.redirect(`/makeGrounds/${id}`);
    }
    next();
}


module.exports.validateReview = (req,res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}