const express = require('express')
const router = express.Router()
const Campground = require('../models/camp');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError')
const { campgroundSchema } = require('../schemas.js');
const { isLoggedin,validateCampground,isValid} = require('../middleware');
const campgrounds = require('../controllers/campgrounds');
const multer = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({storage});

router.route('/')
.get(catchAsync(campgrounds.index))
.post(isLoggedin, upload.array('image'),validateCampground,catchAsync(campgrounds.postGround));
// .post(,(req,res) => {
//     console.log(req.files);
//     res.send('It worked')
// })

router.get('/new', isLoggedin ,catchAsync(campgrounds.renderNew));

router.route('/:id')
.get(catchAsync(campgrounds.renderShow))
.put(isLoggedin, isValid,upload.array("image"),validateCampground, catchAsync(campgrounds.postEdittedForm))
.delete(isLoggedin, isValid, catchAsync(campgrounds.deleteRoutes))

router.get('/:id/edit', isLoggedin, isValid, catchAsync(campgrounds.renderEditForm))

module.exports = router;
