
const express = require('express');

const app = express();

const http = require('http');


const server = http.createServer(app);


const Server = require('socket.io');


const { userJoined, leaveRoom, getUser, getUsersList } = require('./controller/user');
const { formateMsg } = require('./controller/message');

const io = Server(server);




const chatNSP = io.of('/chat');

chatNSP.on("connection", (socket) => {
    
    console.log('user is joined');

    socket.on('joinRoom', ({username,room})=>{
        // console.log(username, room, socket.id);

        userJoined({username, room, id:socket.id});

        socket.join(room);

        socket.emit("message", formateMsg("Server", "Thank you for joinning"));

        socket.broadcast.to(room).emit("message", formateMsg("Server", `${username} has joined the chat`));

        chatNSP.to(room).emit("userlist", getUsersList(room))
       
    })




    socket.on('sendMsg', (msg)=>{
        // console.log(msg);
        const user = getUser(socket.id);
        // console.log(user);
        chatNSP.to(user.room).emit("message", formateMsg(user.username, msg));
    })






    socket.on('disconnect', ()=>{
        
        const user = leaveRoom(socket.id)
        
        console.log('user leave',user.username);
        // console.log(user);

        chatNSP.to(user.room).emit("userlist", getUsersList(user.room))

        socket.broadcast.to(user.room).emit("message", formateMsg("Server", `${user.username} has left the chat`));
    })
})




server.listen(3000,()=>{
    console.log(`server is running on port 3000.`);
})