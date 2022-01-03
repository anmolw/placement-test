const mongoose = require("mongoose");

// Student schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
        // type: mongoose.Schema.ObjectId,
        // ref: "Batch",
        // required: true
    },
    college: {
        type: String,
        required: true
    },
    scores: {
        type: new mongoose.Schema({
            dsa: {
                type: Number,
                required: true
            },
            webd: {
                type: Number,
                required: true
            },
            react: {
                type: Number,
                required: true
            }
        })
    },
    interviews: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Interview"
    }
});

const studentModel = mongoose.model("Student", studentSchema);
module.exports = studentModel;