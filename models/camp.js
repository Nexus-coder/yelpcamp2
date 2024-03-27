const mongoose = require('mongoose');
const Review = require('./reviews.js');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
      url: String,
      filename: String
})

imageSchema.virtual('thumbnail').get(function () {
      return this.url.replace('/upload', '/upload/w_300');
})

const opts = { toJSON: { virtuals: true } }

const campgroundSchema = new Schema({

      title: String,
      price: Number,
      description: String,
      location: String,
      images: [imageSchema],
      geometry: {
            type: {
                  type: String,
                  enum: ['Point'],
                  required: true
            },
            coordinates: {
                  type: [Number],
                  required: true
            }
      },
      author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
      },
      review: [{

            type: Schema.Types.ObjectId,
            ref: 'Review'

      }]
}, opts);

campgroundSchema.virtual('properties.popUpMarkUp').get(function () {
      return `<a href="/makeGrounds/${this._id}\">${this.title}</a>`
})


campgroundSchema.post('findOneAndDelete', async (doc) => {
      console.log(doc)
      if (doc) {
            await Review.deleteMany({
                  _id: {
                        $in: doc.review
                  }
            })
      }
})
module.exports = mongoose.model('Campground', campgroundSchema);