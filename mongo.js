const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log('MongoDB failed', err);
})


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
    },
    favourites: [String],
})


const User = mongoose.model('User', userSchema);

module.exports = User;