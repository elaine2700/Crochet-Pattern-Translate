const express = require('express');
const PORT = require('./config.js');
const cors = require('cors');

const app = express();
console.log('Hello');

app.use(cors());

app.listen(PORT,()=>{
    console.log(`App is listening to port: ${PORT} `);
})