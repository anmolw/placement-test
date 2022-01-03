const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const batchModel = mongoose.model("Batch", batchSchema);
module.exports = batchModel;