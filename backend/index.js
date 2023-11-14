const express = require('express');
const {PORT, mongoDbUri} = require('./config.js');
const cors = require('cors');
const moongoose = require('mongoose')
const stitchRoute = require('./routes/stitchRoute.js')

const app = express();
console.log('Hello');

app.use(cors());

// Middleware for parsing request
app.use(express.json());

app.get('/', (request, response)=>{
    response.send('Crochet Spacecraft');
    console.log(mongoDbUri);
})

// Routing to different collections
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