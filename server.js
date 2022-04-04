const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const PORT = process.env.PORT || 3000

const socketio = require('socket.io')
const io = socketio(server)

const formatMsg = require('./utils/msg')
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/user')

app.use(express.static('public'))

const bot = 'roomBot'
const botPic = 'bot.png'

io.on('connection', socket =>{
    socket.on('joinRoom', ({profilePic, username, roomid})=>{   
        const user = userJoin(socket.id, profilePic, username, roomid)
        socket.join(user.roomid)

        socket.emit('message', formatMsg(bot, `Welcome to ${user.roomid}`, botPic))
        socket.broadcast.to(user.roomid).emit('message', formatMsg(bot, `${username} has joined`, botPic))

        io.to(user.roomid).emit('userJoin', {
            roomid: user.roomid,
            users: getRoomUsers(user.roomid)
        })
    })

    socket.on('chatMessage', (msg)=>{
        const user = getCurrentUser(socket.id)

        io.to(user.roomid).emit('message', formatMsg(user.username, msg, user.profilePic))
    })

    socket.on('disconnect', ()=>{
        const user = userLeave(socket.id)

        io.emit('message', formatMsg(bot,`${user.username} has left the chat`, botPic))
        
        io.to(user.roomid).emit('userJoin', {
            roomid: user.roomid,
            users: getRoomUsers(user.roomid)
        })
    })

})


server.listen(PORT, ()=>{
    console.log(`Port running on ${PORT}`)
})