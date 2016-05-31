var mongoose = require('mongoose');
var slugify = require('../utils/slugify');

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
        return res.status(200).jsonp(questions);
    });           
};

/* POST /api/questions/ - Create a question */
exports.createQuestion = function(req, res) {
    
    if(req.body.title == "" || req.body.title < 10 ){
        return res
            .status(400)
            .jsonp({ message: {"title": "Title can't be empty"}})
    }
    
    if(req.body.content == "") {
        req.body.content = null;
    }
    
    
    var question = new Question({
       title     : req.body.title,
       content   : req.body.content,
       author_id : req.user,
       slug      : slugify.slugify(req.body.title)
    });
    
    question.save(function(err, question) {
        if(err) return res.status(500).send(err.message);
        res.status(201).jsonp(question); 
    });
}