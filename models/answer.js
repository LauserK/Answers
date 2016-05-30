var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/* Import User and question model */    
require('./user');
require('./question');
var User = mongoose.model('User');
var Question = mongoose.model('Question');

var answerSchema = new Schema({
    created_at   : { type: Date, default: Date.now },
    content      : { type: String },
    author_id    : { type: Schema.ObjectId, ref: "User" },
    question     : { type: Schema.ObjectId, ref: "Question" },
    n_stars      : { type: Number, default: 0 },
    deep         : { type: Number, default: 0 },
    parent_id    : { type: Number }
});

module.exports = mongoose.model('Answer', answerSchema);