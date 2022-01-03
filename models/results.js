const mongoose = require("mongoose");

const resultsSchema = new mongoose.Schema({
    student: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Student",
        required: true
    },
    interview: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Interview",
        required: true
    },
    result: {
        type: ["Pass", "Fail", "On hold", "Not attempted"],
        required: true
    }
});

const resultsModel = mongoose.model("Result", resultsSchema);
module.exports = resultsModel;