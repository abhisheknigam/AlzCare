var mongoose = require('mongoose');

var reminderSchema = mongoose.Schema({

    description: String,
    time: Date,
    reminded: Boolean

});

reminders = mongoose.model('reminders', reminderSchema);
module.exports = reminders;