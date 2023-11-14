const express = require('express');
const Stitch = require('../models/stitchModel.js');

const router = express.Router();

// Route for getting all Stitches
router.get('/', async(request, response)=>{
    try{
        const stitches = await Stitch.find({});
        return response.status(200).json({
            count: stitches.length,
            data: stitches
        })
    }
    catch(error){
        console.log(error)
    }
});

// Route for creating a new Stitch
router.post('/', async(request, response)=>{
    try{
        if(!request.body.stitchName){
            return response.status(400).send(
                {message: 'Send all required fields'}
            )
        }

        const newStitch = {
            stitchName: request.body.stitchName,
            contributionBy: request.body.contributionBy,
            difficulty:  request.body.difficulty,
            picture:{
                src: request.body.src,
                picAuthor: request.body.src
            },
            textTutorial: request.body.textTutorial,
            videoTutorial: request.body.videoTutorial,
            meta:{
                votes: 0,
                favs: 0
            }
        }

        const stitch = await Stitch.create(newStitch);
        return response.status(201).send(stitch);
    }
    catch(error){
        console.log(error);
        response.status(500).send({
            message: error.message
        })
    }
})

module.exports = router;