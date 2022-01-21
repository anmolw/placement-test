const mongoose = require("mongoose");

// Interview schema
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

// Virtual property that aids in displaying human-readable dates
interviewSchema.virtual("friendlyDate").get(function () {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[this.date.getMonth()];
    const day = this.date.getDate();
    const year = this.date.getFullYear();
    return `${day} ${month} ${year}`;
})

const interviewModel = mongoose.model("Interview", interviewSchema);
module.exports = interviewModel;