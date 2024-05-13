
const express = require('express')
const path = require('path')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: "*"
});


app.use(express.static(path.join(__dirname+'/public')))

io.on('connection', function (socket) {
    console.log("user connected");
     socket.on('newuser', function (username) {
        socket.broadcast.emit('update', username+' has joined the chat')
    })
    socket.on('exituser', function (username) {
        socket.broadcast.emit('update', username+' has left the chat')
    })
     socket.on('chat', function (message) {
         socket.broadcast.emit('chat',message)
     })
})

server.listen(3000, () => console.log(`Example app listening on port 5000`))
// http.listen(5000, () => console.log(`Listening on port 5000`));