var socket = io(),
    button = document.querySelector('#btn');

button.addEventListener('click', function(event) {
    event.preventDefault();
    socket.emit('btnClick', 'User clicked button');
    return false;
});

socket.on('clicked', function(data) {
    alert('Another user clicked a button');
});
