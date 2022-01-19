const Student = require('../models/student');
const Interview = require('../models/interview');
const Result = require('../models/result');

// Students page route handler
exports.studentsPage = async (req, res) => {
    const students = await Student.find({});
    res.render("students", {
        title: "Students",
        students: students
    });
}

// Route handler for creating a student
exports.create = async (req, res) => {
    // Ensure that the batch string is in the format yyyy-mm
    const batchRegex = /^[0-9]{4}-[0-9]{2}$/;
    if (!batchRegex.test(req.body.batch)) {
        req.flash("error", "Invalid batch");
        return res.redirect("back");
    }
    try {
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
        req.flash("success", "Student created");
    } catch (error) {
        req.flash("error", "An error occurred");
    }
    res.redirect("back");
}

// Route handler used to delete a specific student
exports.delete = async (req, res) => {
    const student = await Student.findById(req.params.id);
    try {
        if (!student) {
            req.flash("error", "Student not found");
            return res.redirect("back");
        }
        // Remove all results referencing the student
        await Result.deleteMany({
            student: student,
        });
        student.remove();
        req.flash("success", "Student deleted");
    } catch (error) {
        req.flash("error", "An error occurred");
    }
    res.redirect("back");
}

// Route handler used to set the status of a student
// This is intended to be accessed via an AJAX request
exports.setStatus = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!req.body.status || (req.body.status !== "Placed" && req.body.status !== "Not placed")) {
            return res.status(403).json({
                status: "error",
                message: "Invalid status provided"
            });
        }
        if (!student) {
            return res.status(404).json({
                status: "error",
                message: "Student not found"
            });
        }
        student.status = req.body.status;
        await student.save();
        res.status(200).json({
            status: "success",
            message: "Student updated successfully"
        });

    } catch (error) {
        console.error("Error while updating student status");
        console.error(error);
        res.status(401).json({
            status: "error",
            message: "Unknown error occured"
        });
    }

}