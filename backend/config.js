require('dotenv').config();

const PORT = 3030;
const mongoDbUri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_KEY}@cluster0.emdprjk.mongodb.net/?retryWrites=true&w=majority`;


module.exports = {PORT, mongoDbUri};