const Student = require('../models/student');

exports.studentsPage = async (req, res) => {
    const students = await Student.find({});
    res.render("students", {
        title: "Students",
        students: students
    });
}

exports.create = async (req, res) => {
    const student = await Student.create({
        name: req.body.name,
        batch: req.body.batch,
        college: req.body.college,
        scores: {
            dsa: req.body.dsa,
            webd: req.body.webd,
            react: req.body.react
        }
    });
    res.redirect("back");
}

exports.delete = async (req, res) => {
    await Student.findByIdAndDelete(req.params.student);
}

exports.delete = async (req, res) => {

}