const socket = io();

socket.on('countUpdated', (count) => {
    console.log('The count has been updated: ' + count);
});

socket.on('he_is_typing', (count) => {
    console.log('He is typing......');
});

document.querySelector('#increment').addEventListener('click', () => {
    socket.emit('increment');
});


socket.on('message', (message) => {
    console.log(message);
});

document.querySelector('#send-message').addEventListener('click', () => {
    socket.emit('sending-message', document.querySelector('#textbox1').value);
});