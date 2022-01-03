const Student = require("../models/student");
const Interview = require("../models/interview");

exports.resultsPage = async (req, res) => {
    const results = await Result.find({}).populate("student").populate("interview");
    res.render("results", {
        title: "Results",
        results: results
    });
}