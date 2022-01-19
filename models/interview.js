const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    results: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Result"
    }

});

interviewSchema.virtual("friendlyDate", function () {

});

const interviewModel = mongoose.model("Interview", interviewSchema);
module.exports = interviewModel;