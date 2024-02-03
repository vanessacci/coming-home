// mongodb, mongoose
const mongoose = require('mongoose');
const db = mongoose.connection;
const Schema = mongoose.Schema;

// User Database
const userSchema = new Schema({
    username: String,
    phone: String,
    email: String,
    image: {type:String},
    preferedLocation: String
});
const User = mongoose.model('User', userSchema);

// Lost pets
const lostSchema = new Schema({
    petName: String,
    date: String,
    location: String,
    species: String,
    phone: String,
    email: String,
    description: String,
    image: String, // Base64 string
    found:{ type: Boolean, default: false }
});
const Lost = mongoose.model('Lost', lostSchema);

// Found pets
const foundSchema = new Schema({
    petName: String,
    date: Date,
    location: String,
    species: String,
    contact: String,
    description: String,
    image: String,
    kept: Boolean
});

const Found = mongoose.model('Found', foundSchema);

module.exports = { User, Lost, Found };