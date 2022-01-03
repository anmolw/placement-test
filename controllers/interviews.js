const Interview = require('../models/interview');
const Student = require('../models/student');

exports.interviewsPage = async (req, res) => {
    const interviews = await Interview.find({});
    res.render("interviews", {
        title: "Interviews",
        interviews: interviews
    });
}

exports.create = async (req, res) => {
    const interview = await Interview.create({
        company: req.body.company,
        date: req.body.date
    });
    res.redirect("back");
}

exports.assignStudents = async (req, res) => {
}