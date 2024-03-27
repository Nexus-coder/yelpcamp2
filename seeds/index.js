require('dotenv').config();

const mongoose = require('mongoose');
const camps = require('./cities');
const { descriptors, places } = require('./seedHelpers')
const Campground = require('../models/camp')

mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://andrew:Andrew@cluster0.hbs3wtk.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("Server opened!!");
    })
    .catch((err) => {
        console.log(err);
    })

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connecton error:"));
db.once("open", () => {
    console.log("Database connected")
})

const sample = (array) => {
    const arr = array[Math.floor(Math.random() * array.length)]
    return arr;
}
const seedDB = async () => {

    await Campground.deleteMany({}).exec();

    // for (let i = 0; i < 50; i++) {
    //     const rand1000 = Math.floor(Math.random() * 1000)
    //     const price = Math.floor(Math.random() * 20) + 10;
    //     const camp = new Campground({
    //         author: '63ffa5bc48c567008827878b',
    //         title: `${sample(descriptors)} ${sample(places)}`,
    //         location: `${camps[rand1000].city},${camps[rand1000].state}`,
    //         price,
    //         geometry: { type: 'Point', coordinates: [camps[rand1000].longitude, camps[rand1000].latitude] },
    //         images: [
    //             {
    //                 url: 'https://res.cloudinary.com/dy3zfo9y8/image/upload/v1678251319/Yelpcamp/z1gotabytuo8vsua2uq6.jpg',
    //                 filename: 'Yelpcamp/z1gotabytuo8vsua2uq6',
    //             },
    //             {
    //                 url: 'https://res.cloudinary.com/dy3zfo9y8/image/upload/v1678251348/Yelpcamp/bj6m9wscfgjuvavd7bkm.jpg',
    //                 filename: 'Yelpcamp/bj6m9wscfgjuvavd7bkm',
    //             }
    //         ],
    //         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident voluptatem soluta quae perferendis blanditiis mollitia consequuntur. Voluptas cum atque rem a, suscipit aspernatur libero quis sed, ipsum error assumenda velit."

    //     })

    //     await camp.save();
    // }
}

seedDB();