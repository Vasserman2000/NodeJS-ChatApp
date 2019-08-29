const socket = io();

const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    $messageFormButton.setAttribute('disabled', 'disabled');
    
    const message = e.target.elements.message.value;
    
    // the third parameter is an anknowledgement from the server
    socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute('disabled');
       
        if (error) {
           return console.log(error);
       }

       console.log('Message delivered!');
    });
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
            }, (ack) => {
                return console.log(ack)
            });
        } else {
            console.log(error.message);
        }
    });
});
