//Dependencies
const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const http = require('http')

//set up root direcrtory
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
})//post main page

http.Server(app).listen((process.env.PORT || 3000),function(){
    console.log('listening on *:3000')
})


