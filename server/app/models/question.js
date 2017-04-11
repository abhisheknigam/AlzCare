var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({

    question: String,
    sentiment: String

});

questions = mongoose.model('questions', questionSchema);
module.exports = questions;