const socket = io();

// Elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;

// Options
const {usrname, room} = Qs.parse(location.search, { ignoreQueryPrefix: true });

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    $messageFormButton.setAttribute('disabled', 'disabled');
    
    const message = e.target.elements.message.value;
    
    // the third parameter is an anknowledgement from the server
    socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();
       
        if (error) {
           return console.log(error);
       }

       console.log('***Message delivered!');
    });
});

socket.on('message', (message) => {
    console.log(message);
    const html = Mustache.render(messageTemplate, { createdAt: moment(message.createdAt).format('h:mm a'), message: message.text });
    $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('welcome', (message) => {
    console.log(message);
});


$sendLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.');
    }

    $sendLocationButton.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition((position ,error) => {
        if (!error) {
            socket.emit('sendLocation', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }, (ack) => {
                $sendLocationButton.removeAttribute('disabled');
                return console.log(ack)
            });
        } else {
            console.log(error.message);
        }
    });
});


socket.on('locationMessage', (locationMessage) => {
    console.log(locationMessage);
    const html = Mustache.render(locationTemplate, { 
        locationMessage: locationMessage.url, 
        createdAt: moment(locationMessage.createdAt).format('h:mm a') });
    $messages.insertAdjacentHTML('beforeend', html);
});


socket.emit('join', { username, room });