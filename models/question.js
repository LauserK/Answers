var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/* Import User model */    
require('./user');
var User = mongoose.model('User');

var questionSchema = new Schema({
    title          : { type: String },
    slug           : { type: String },
    created_at     : { type: Date, default: Date.now },
    content        : { type: String },
    n_stars        : { type: Number, default: 0 },
    n_response     : { type: Number, default: 0 },
    author_id      : { type: Schema.ObjectId, ref: "User" },
    answer_id      : { type: Number }
});

module.exports = mongoose.model('Question', questionSchema);