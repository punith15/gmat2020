const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useCreateIndex : true,
    useNewUrlParser : true,
    useUnifiedTopology : true
})

app.use(cors())

app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    next();
});

app.use(require('./routers/router'));

app.listen(port, ()=>{
    console.log("Server running on port "+port)
})

module.exports = app;