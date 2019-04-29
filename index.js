//Dependencies
const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const http = require('http')
//set up root direcrtory

app.get('/', function(req, res){
    res.sendFile(__dirname + '/src/login.html')
})//post main page (right now its login)

app.get('/profile', function(req, res){
    res.sendFile(__dirname + '/src/profile.html')
})

app.get('/signup', function(req, res){
    res.sendFile(__dirname + '/src/signup.html')
})

app.get('/class', function(req, res){
    res.sendFile(__dirname + '/src/class.html')
})


//resource pages
app.get('/res/logo', function(req, res){
    res.sendFile(__dirname + '/resources/Logo.png')
})

app.get('/styles/style', function(req, res){
    res.sendFile(__dirname + '/styles/style.css')
})

app.get('/script/login', function(req, res){
    res.sendFile(__dirname + '/scripts/login.js')
})

app.get('/script/signup', function(req, res){
    res.sendFile(__dirname + '/scripts/signup.js')
})

app.get('/script/profile', function(req, res){
    res.sendFile(__dirname + '/scripts/profile.js')
})

app.get('/script/class', function(req, res){
    res.sendFile(__dirname + '/scripts/class.js')
})

app.get('/script/firebaseInstance', function(req, res){
    res.sendFile(__dirname + '/scripts/firebaseInstance.js')
})


http.Server(app).listen((process.env.PORT || 3000),function(){
    console.log('listening on *:3000')
})


