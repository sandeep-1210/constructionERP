/* =======================
    LOAD THE DEPENDENCIES
==========================*/
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const authMiddleware = require('./authMiddleware/authmiddleware')

/* =======================
    LOAD THE CONFIG
==========================*/
const config = require('./config')
const port = process.env.PORT || 3000 

/* =======================
    EXPRESS CONFIGURATION
==========================*/
const app = express()
var cors = require('cors')

// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// print the request log on console
app.use(morgan('dev'))

// set the secret key variable for jwt
app.set('jwt-secret', config.secret)

// index page, just for testing
app.get('/', (req, res) => {
    res.send('Hello JWT')
})

app.use(cors())

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,X-Auth-Token'");
    res.setHeader("Access-Control-Allow-Credentials", true);
   
    next();
});

// configure api router
app.use('/api', authMiddleware , require('./src/routes/routes'))

// open the server
app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
})



/* =======================
    CONNECT TO MONGODB SERVER
==========================*/
mongoose.connect(config.mongodbUri)
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error)
db.once('open', ()=>{
    console.log('connected to mongodb server')
})