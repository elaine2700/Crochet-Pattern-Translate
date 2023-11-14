const express = require('express');
const {PORT, mongoDbUri} = require('./config.js');
const cors = require('cors');
const moongoose = require('mongoose')
const stitchRoute = require('./routes/stitchRoute.js')

const app = express();
console.log('Hello');

app.use(cors());

app.get('/', (request, response)=>{
    response.send('Crochet Spacecraft');
    console.log(mongoDbUri);
})

app.use('/stitches', stitchRoute);

app.listen(PORT,()=>{
    console.log(`App is listening to port: ${PORT} `);
})

moongoose
    .connect(mongoDbUri)
    .then(()=>{
        console.log('Connected to database')
    })
    .catch((error)=>{
        console.log(error)
    })