var mongoose = require("mongoose");

var eventSchema = new mongoose.Schema({
    title: String,
    image: String,
    image2: String,
    image3: String,
    image4: String,
    image5: String,
    video: String,
    description: String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username : String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});

module.exports = mongoose.model("Event", eventSchema);