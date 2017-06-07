var mongoose = require("mongoose");

var sportSchema = new mongoose.Schema({
    title: String,
    image: String,
    edition: String,
    etape: String,
    description: String,
    classement:{
        premier: String,
        deuxieme: String,
        troisieme: String,
        quatrieme: String,
        cinquieme: String,
        sixieme: String,
        septieme: String
    },
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

module.exports = mongoose.model("Sport", sportSchema);