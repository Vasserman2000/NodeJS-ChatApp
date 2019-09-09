const generateMessage = (text, username) => {
    return {
        text,
        createdAt: new Date().getTime(),
        username
    }
}

const generatLocationMessage = (url) => {
    return {
        url,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generatLocationMessage
}