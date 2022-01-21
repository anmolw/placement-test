const mongoose = require("mongoose");

// Interview results schema
const resultsSchema = new mongoose.Schema({
    student: {
        type: Number,
        ref: "Student",
        required: true
    },
    interview: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Interview",
        required: true
    },
    result: {
        type: String,
        enum: ["Pass", "Fail", "On hold", "Didn't attempt", "Pending"],
        default: "Pending",
        required: true
    }
});

const resultsModel = mongoose.model("Result", resultsSchema);
module.exports = resultsModel;