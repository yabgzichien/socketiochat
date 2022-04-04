const socket = io()

const chatForm = document.getElementById('chatForm')
const chatContainer = document.querySelector('.chat')
const usersList = document.getElementById('usersContainer')
const roomID = document.getElementById('roomID')

const {profilePic, username, roomid} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

console.log(profilePic)

socket.emit('joinRoom', {profilePic, username, roomid})
socket.on('message', msg =>{
    outputMsg(msg)
})

socket.on('userJoin', ({roomid, users})=>{
    outputRoomName(roomid)
    outputUsers(users)
})

chatForm.addEventListener('submit', e=>{
    e.preventDefault()

    const msg = e.target.elements.chatMsg.value
    e.target.elements.chatMsg.value = ''
    e.target.elements.chatMsg.focus()

    socket.emit('chatMessage', msg)
    console.log(chatContainer.scrollHeight)

})

function outputMsg(msg){
    const mainDiv = document.createElement('div')
    mainDiv.classList.add('messageContainer')

    mainDiv.innerHTML = `
    <div class="img-container">
        <img src="${msg.profilePic}" class="profilePic">
    </div>

    <div class="message">
        <p> <strong>${msg.username}</strong> <span>${msg.time}</span> </p>
        <p class="chat-messages"> ${msg.text} </p>
    </div>`

    chatContainer.appendChild(mainDiv)
    chatContainer.scrollTop = chatContainer.scrollHeight

}

function outputRoomName(roomid){
    roomID.textContent = roomid
}

function outputUsers(users){
    usersList.innerHTML = `
        ${users.map(user=> `<p> 🟢${user.username} </p>` ).join('')}
        `
}   