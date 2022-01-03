const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    students: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Student"
    }
});

const interviewModel = mongoose.model("Interview", interviewSchema);
module.exports = interviewModel;