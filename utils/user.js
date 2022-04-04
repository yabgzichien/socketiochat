const users = []

console.log(users)

function userJoin(id, profilePic, username, roomid){
    const user = {id, profilePic, username, roomid}
    users.push(user)
    return user
}

function getCurrentUser(id){
    return users.find(user => user.id === id)
}

function userLeave(id){
    const index = users.findIndex(user => user.id === id)
    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

function getRoomUsers(roomid){
    return users.filter(user=> user.roomid === roomid)
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers 
}