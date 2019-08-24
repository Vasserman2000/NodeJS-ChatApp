const socket = io();


document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const message = e.target.elements.message.value;
    
    socket.emit('sendMessage', message);
});

socket.on('message', (message) => {
    console.log(message);
});

socket.on('welcome', (message) => {
    console.log(message);
});


document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition((position ,error) => {
        if (!error) {
            socket.emit('sendLocation', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        } else {
            console.log(error.message);
        }
    });
})
