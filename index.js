/*Individuell inlämning 2 Javascript 
  Christer Klasson SYNED21JON
  ##CK 

  Gjort enligt tutorialen och lagt till en av "homework"-grejerna, 
  "Broadcast a message to connected users when someone connects or disconnects."
*/

// skapar en server på det vanliga sättet
const express = require("express");
const app = express();
const http = require("http");
const { isObject } = require("util");
const server = http.createServer(app);
const { Server } = require("socket.io"); // nytt här med socket!
const io = new Server(server);

// presenterar html-fil
app.get ("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// route för jquery
app.get ("/script", (req, res) => {
    res.sendFile(__dirname + '/jquery-3.3.1.min.js');
});

// route for connection som presenterar allt för klienten
io.on('connection', (socket) => {
    socket.on("hello", (arg) => {
        io.emit('chat message', arg);
        console.log(arg); // world
      });
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

server.listen(3000, () => {
    console.log("lyssnar på *:3000");
});


