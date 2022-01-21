const Interview = require('../models/interview');
const Result = require('../models/result');
const Student = require('../models/student');

// Route handler that lists all interviews
exports.interviewsPage = async (req, res) => {
    const interviews = await Interview.find({}).populate({
        path: "results",
        populate: {
            path: "student"
        }
    });
    res.render("interviews", {
        title: "Interviews",
        interviews: interviews
    });
}

// Route handler used to create a new interview
exports.create = async (req, res) => {
    try {
        const interview = await Interview.create({
            company: req.body.company,
            role: req.body.role,
            date: req.body.date
        });
        req.flash("success", "Interview created");
    } catch (error) {
        req.flash("error", "An error occurred");
    }
    res.redirect("back");
}

// Route handler used to delete an interview
exports.delete = async (req, res) => {
    try {
        const interview = await Interview.findById(req.params.id);
        if (!interview) {
            req.flash("error", "Interview not found");
            res.redirect("back");
        }
        // Delete all results referencing the interview
        await Result.deleteMany({ interview: interview });
        interview.remove();
        req.flash("success", "Interview deleted");
    } catch (error) {
        req.flash("error", "An error occurred");
    }
    res.redirect("back");
}

// Route handler used to assign a student to an interview
exports.assignStudent = async (req, res) => {
    try {
        const interview = await Interview.findById(req.params.id);
        const student = await Student.findById(req.body.student);
        const existingResult = await Result.findOne({
            interview: interview,
            student: student
        });
        if (existingResult) {
            req.flash("error", "Student already assigned");
            return res.redirect("back");
        }
        const result = await Result.create({
            interview: interview,
            student: student
        });
        req.flash("success", "Student assigned");
    }
    catch (error) {
        console.error("Error while assigning student to interview");
        req.flash("An error occurred");
    }
    res.redirect("back");
}