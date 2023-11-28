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

// Route for saving a new Stitch
router.post('/', async(request, response)=>{
    console.log('Request here');
    try{
        
        if(!request.body.stitchName){
            return response.status(400).send(
                {message: 'Send all required fields'}
            )
        }

        const newStitch = {
            stitchName: request.body.stitchName,
            abbreviation: request.body.abbreviation,
            contributionBy: request.body.contributionBy,
            difficulty:  request.body.difficulty,
            picture:{
                src: request.body.src,
                picAuthor: request.body.src
            },
            stitchesCombination: request.body.stitchesCombination,
            textTutorial: request.body.textTutorial,
            videoTutorial: request.body.videoTutorial,
            meta:{
                votes: 0,
                favs: 0
            }
        };

        const stitch = await Stitch.create(newStitch);
        
        return response.status(201).send(stitch);
    }
    catch(error){
        console.log('Back Error');
        console.log(error);
        response.status(500).send({
            message: error.message
        })
    }
})

// Route for getting a stich by id
router.get('/:id', async(request, response)=>{
    try{
        const {id} = request.params;
        const stitch = await Stitch.findById(id);
        return response.status(200).json(stitch);
    }
    catch (error){
        console.log(error.message)
        response.status(500).send({message: error.message})
    }
})

module.exports = router;