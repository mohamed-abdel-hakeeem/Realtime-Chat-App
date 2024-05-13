
  const app = document.querySelector(".app");
  var socket = io('http://localhost:3000/');
  let uname
  let chat = app.querySelector(".join-screen #join-user");
  chat.addEventListener("click", ()=> {
    let username = app.querySelector(".join-screen #username").value;
    if (username.length == 0) {
      return alert("Please enter a username");
    }
    socket.emit("newuser", username);
     uname = username;
    app.querySelector(".join-screen").classList.remove("active");
    app.querySelector(".chat-screen").classList.add("active");
  })
app.querySelector(".chat-screen #send-message").addEventListener("click", () => {
  let message = app.querySelector(".chat-screen #message-input").value
  if (message.length == 0) {
    return alert("Please enter a message");
  }
  rendermessage('my', {
    username: uname,
    text: message
  })
  socket.emit("chat", {
    username: uname,
    text: message
  })
  app.querySelector(".chat-screen #message-input").value = " ";
})
app.querySelector(".chat-screen #exit").addEventListener("click", () => {
  socket.emit("exituser", uname)
  window.location.href=  window.location.href
})

socket.on("update",function(update){
  rendermessage('update', update)
})
socket.on("chat", function(message){
  rendermessage('other', message)
})
function rendermessage(type, message) {
  let messageContainer = app.querySelector(".chat-screen .messages");
  if (type == 'my') {
    let el = document.createElement('div');
    el.setAttribute('class', 'message my-message');
    el.innerHTML = `
    <div>
      <div class="name">you</div>
      <div class="text">${message.text}</div>
    </div>`
    messageContainer.appendChild(el);
  } else if (type =='other') {
    let el = document.createElement('div');
    el.setAttribute('class','message other-message');
    el.innerHTML = `<div>
      <div class="name">${message.username}</div>
      <div class="text">${message.text}</div>
    </div>
    `
    messageContainer.appendChild(el);
  } else if (type == 'update') { 
    let el = document.createElement('div');
    el.setAttribute('class', 'update');
    el.innerText = message
    messageContainer.appendChild(el);
  }

  messageContainer.scrollTop = messageContainer.scrollHeight-messageContainer.clientHeight
}


  