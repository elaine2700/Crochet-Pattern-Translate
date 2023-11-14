const mongoose = require('mongoose')

const stitchSchema = mongoose.Schema(
    {
        stitchName:{
            type: String,
            required: true,
        },
        contributionBy: {
            type: String
        },
        difficulty:{
            type: String
        },
        picture:{
            src: String,
            picAuthor: String
        },
        textTutorial:{
            type: String
        },
        videoTutorial:{
            type: String
        },
        meta:{
            votes: Number,
            favs: Number
        }  
    }
)

module.exports = mongoose.model('Stitch', stitchSchema)