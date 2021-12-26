const express = require("express")
const path = require("path")
const app = express()

//todo: settings
app.set("port", process.env.PORT || 3000)

//todo: static files
app.use(express.static(path.join(__dirname, "public")))

//todo: start server
const server = app.listen(app.get("port"), () => {
    console.log("server on port", app.get("port"))
})

//todo: websocket
const socketIo = require("socket.io")
const io = socketIo(server)

io.on("connection", (socket) => {
    console.log("new connection!")

    socket.on("chat:message", (data) => {
        io.sockets.emit("chat:message", data)
    })

    socket.on("chat:typing", (data) => {
        socket.broadcast.emit("chat:typing", data)
    })
})