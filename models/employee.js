const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const employeeSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

employeeSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        bcrypt.hash(this.password, 10).then(hash => {
            this.password = hash;
            next();
        });
    }
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;