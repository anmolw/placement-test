const mongoose = require("mongoose");
const AutoIncrementID = require('@typegoose/auto-increment').AutoIncrementID;

// Student schema
const studentSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Placed", "Not placed"],
        default: "Not placed"
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
    }
});

studentSchema.plugin(AutoIncrementID, {
    startAt: 1
});

// Convert the batch string from YYYY-MM to a more user friendly format
studentSchema.virtual('batchString').get(function () {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = this.batch.substring(2, 4);
    const monthId = parseInt(this.batch.substring(5)) - 1;
    return `${months[monthId]} '${year}`;
});

const studentModel = mongoose.model("Student", studentSchema);
module.exports = studentModel;