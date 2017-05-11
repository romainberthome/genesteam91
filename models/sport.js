var mongoose = require("mongoose");

var sportSchema = new mongoose.Schema({
    title: String,
    image: String,
    edition: String,
    etape: String,
    description: String
});

module.exports = mongoose.model("Sport", sportSchema);