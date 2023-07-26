const Review = require('../models/reviews');
const Campground = require('../models/camp');

module.exports.postReview = async (req, res) => {
    const id = req.params.id;
    const rev = new Review(req.body)
    rev.author = req.user._id;
    const camp = await Campground.findById(id).populate('review')
    camp.review.push(rev)
    await rev.save();
    await camp.save();
    res.redirect(`/makeGrounds/${camp._id}`)
}

module.exports.deleteReview = async(req,res,next) => {
    const {id,reviewId} = req.params;
    await Campground.findByIdAndUpdate(id,{$pull:{review:reviewId}})
    await Review.findByIdAndDelete(reviewId)
    res.redirect(`/makeGrounds/${id}`)
    }