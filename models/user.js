var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
    
var userSchema = new Schema({
    username    : { type: String, unique: true, required: true },
    fullName    : { type: String },
    email       : { type: String, unique: true, required: true },
    password    : { type: String, require: true },
    avatar      : { type: String, default: "https://avatars1.githubusercontent.com/u/17153402?v=3&s=96" },
    admin       : { type: Boolean, default: false },
    register_at : { type: Date, default: Date.now },
    score       : { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);