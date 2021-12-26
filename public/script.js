const socket = io();

//todo: obtener hora
const Hours = () => {
    let Hora = new Date()
    let hora = Hora.getHours() + ":"+ Hora.getMinutes() + ":" + Hora.getSeconds()
    return hora
}

//todo: DOM elements
let message = document.getElementById("message");
let username = document.getElementById("username");
let btn = document.getElementById("send");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

btn.addEventListener("click", () => {
  const datos = {
    username: username.value,
    message: message.value,
  };
  socket.emit("chat:message", datos)
});

message.addEventListener("keypress", () => {
    socket.emit("chat:typing", username.value)
})

socket.on("chat:message", (data) => {
    actions.innerHTML = "";
    output.innerHTML += `<p>
                            <strong>${data.username}</strong>
                            (${Hours()}):
                            ${data.message.toString()}
                        </p>`
})

socket.on("chat:typing", (data) => {
    actions.innerHTML = `<p><strong>${data} esta escribiendo...</strong></p>`
})

message.addEventListener("keypress", (e) => {
    if(e.which === 13){
        const datos = {
            username: username.value,
            message: message.value,
          };
          socket.emit("chat:message", datos)
    }
})