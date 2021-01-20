const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMess = require('./accessories/moments');
const { userJoin, getCurrentUser } = require('./accessories/userList');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Opening fucntions: run when client connects
io.on('connection', socket => {
    //console.log('New cleint connected');

    // Get Name and Room

    const uname = document.querySelector('username').value;
    const room = document.querySelector('room').value;

    
    // Join Room
    socket.on('joinRoom', ({uname , room}) =>
    {
        // Add user to user list
        const user = userJoin(socket.id, uname, room);
        
        socket.join();

        // Welcome message
        socket.emit('message' , formatMess(uname , ' Welcome to TIV Chat!'));

        // Broadcast new client entry
        socket.broadcast.to(user.room).emit('message' , formatMess(uname , `${uname} has joined`));
    });
    

    // Send chat message
    socket.on('chatMessage' , mess =>{
        io.to(user.room).emit('message', formatMess(uname , mess));
    })

    // Disconnect message
    socket.broadcast.to(user.room).emit('disconnect', () =>{
        io.emit('message' , formatMess(uname , `${uname} has disconnected`));
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));