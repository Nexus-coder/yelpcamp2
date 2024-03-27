const Campground = require('../models/camp');
const cloudinary = require("../cloudinary");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAP_BOX_TOKEN;
const geoCoder = mbxGeocoding({accessToken:mapBoxToken})

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}

module.exports.renderNew = (req, res) => {
    res.render('campgrounds/new')
}

module.exports.renderShow = async (req, res) => {
    const { id } = req.params;
    const camp = await Campground.findById(id).populate(
        {
            path: 'review',
            populate: { path: 'author' }
        }).populate('author');
        console.log(camp)
    res.render('campgrounds/show', { camp })
}

module.exports.postGround = async (req, res) => {
    const geoData = await geoCoder.forwardGeocode({
        query: req.body.location,
        limit:1  
    }).send()
    const camp = new Campground(req.body);
    camp.geometry = geoData.body.features[0].geometry;
    camp.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    camp.author = req.user._id;
    await camp.save();
    console.log(camp);
    //This does not actually do anything important it just adds the message to the session
    req.flash('success', 'Succesfully loaded a new campground');
    res.redirect(`/makeGrounds/${camp._id}`);

 }

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
    res.render('campgrounds/edit', { campground })
}

module.exports.postEdittedForm = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const campground = await Campground.findByIdAndUpdate(id, req.body, { new: true })
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }))
    campground.images.push(...imgs);
    await campground.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename)
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
        console.log(campground);
    }
    req.flash('success', 'Successfully updated campground');
    res.redirect(`/makeGrounds/${id}`);
}

module.exports.deleteRoutes = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground');
    res.redirect('/makeGrounds');
}