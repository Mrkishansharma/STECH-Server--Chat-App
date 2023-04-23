
const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const  userList = document.getElementById("users");


const socket = io('http://localhost:3000/chat', {transports : ["websocket"] })


const userParams = new URLSearchParams(location.search);

const username = userParams.get('username');
const room = userParams.get('room');

console.log(username, room);

socket.emit('joinRoom', {username,room});



socket.on('message',(obj)=>{
    // console.log(obj);
    displayChat(obj)
})


chatForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    let msg = chatForm.msg.value
    
    msg = msg.trim()

    if(!msg){
        return 
    }

    socket.emit("sendMsg", msg);
    
    chatForm.msg.value = ''

})

socket.on('userlist', (users)=>{
    console.log('users:===>', users);
    roomName.innerText = users.room;
    displayUsers(users.users)
})


function displayChat(data){

    const htmls = `
        <div class="message">
            <p class="meta">
                ${data.username} <span> ${data.time} </span>
            </p>
            <p class="text">
                ${data.msg}
            </p>
        </div>`

    chatMessages.innerHTML += htmls;
}

function displayUsers(data){
    const htmls = data.map((ele)=>{
        return `<ul>${ele}</ul>`
    }).join('')

    userList.innerHTML = htmls

}