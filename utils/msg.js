const moment = require('moment')

function formatMsg(username, text, profilePic){

    console.log(profilePic)

    switch(profilePic){
        case 'bot1':
            profilePic = 'bot3.jpg'
            break
        case 'bot2':
            profilePic = 'bot2.png'
            break
        case 'bot3':
            profilePic = 'bot4.jpg'
            break
        case 'bot.png':
            profilePic = 'bot.png'
            break
        default:
            profilePic = 'bot1.png'
    }

    
    return{
        username,
        text,
        profilePic,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMsg