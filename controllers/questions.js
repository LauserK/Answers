var mongoose = require('mongoose');

/* Import Models */
require('../models/user');
require('../models/question');
require('../models/answer');

var User     = mongoose.model('User');
var Question = mongoose.model('Question');
var Answer   = mongoose.model('Answer');

/* GET /api/questions/ - Return all questions */
exports.getAllQuestions = function(req, res) {  
    //Find all question on database   
    Question.find(function(err, questions) {
        // If exists and error return error 500
        if (err) return res.status(500).send(err.message); 
        //Return JSON data
        res.status(200).jsonp(questions);
    });           
};