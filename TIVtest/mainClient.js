const chatForm = document.getElementById();
const chatMessages = document.querySelector('.chat-messages');
const socket = io();

const uname = document.querySelector('username').value;
const room = document.querySelector('room').value;

socket.emit('joinRoom', {uname, room})

// opening socket

socket.on('message', message => {
    sendMessage(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Creating a message

chatForm.addEventListener('Send' , (e) => {
    // Cancelable
    e.preventDefault()

    // Declares message
    const mess = e.target.elements.mess.value;

    // Sends message to server 
    socket.emit('chatMessage' , mess);

    // Clear textbox
    e.target.elements.mess.value = '';
    e.target.elements.mess.focus();

})

// Send message function by making new div in HTML and adding message
// Passes in formatMess message object

function sendMessage(mess){
    // Makes div
    const div = document.creatElement('div');

    // Add message
    div.classList.add('message');
    div.innerHTML = `<p class = "meta"> ${mess.name} <span>${mess.time}</span></p> 
    <p class="text">
    ${mess.text}
    </p>`;
    document.querySelector('.chat-form').appendChild(div);


}

// Delete message

function deleteMessage(){

}