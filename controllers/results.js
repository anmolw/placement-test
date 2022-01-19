const Result = require('../models/result');
const Interview = require('../models/interview');
const Student = require('../models/student');
const json2csv = require('json2csv');

exports.exportToCSV = async (req, res) => {
    const results = await Result.find().populate("student company");
}

// Route handler used to delete a result entry
exports.deleteResult = async (req, res) => {
    try {
        const result = await Result.findById(req.params.id);
        if (!result) {
            req.flash("error", "Result not found");
            return res.redirect("back");
        }
        result.remove();
        req.flash("success", "Result deleted");
        res.redirect("back");
    } catch (error) {
        console.error("Error while deleting result");
        console.error(error);
    }

}

// Route handler that fetches all results for a given interview
exports.resultsForInterview = async (req, res) => {
    try {
        const interview = await Interview.findById(req.params.id);
        const results = await Result.find({ interview: req.params.id }).populate("interview").populate("student");
        const students = await Student.find({});
        res.render("interview-results", {
            title: "Interview Results",
            interview: interview,
            students: students,
            results: results
        });
    } catch (error) {
        console.error("Error while fetching interview results");
        console.error(error);
    }

}

// Route handler used to set the status of a result
exports.setStatus = async (req, res) => {
    try {
        const result = await Result.findById(req.params.id);
        if (!result) {
            return res.status(404).json({
                status: "error",
                message: "Result not found"
            });
        }
        if (!req.body.status) {
            return res.status(400).json({
                status: "error",
                message: "Invalid status provided"
            });
        }
        result.result = req.body.status;
        await result.save();
        res.status(200).json({
            status: "success",
            message: "Result updated"
        });
    } catch (error) {
        console.error("Error while updating result status");
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Unknown error occured"
        });
    }
}