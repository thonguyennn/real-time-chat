const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const morgan = require('morgan');

const io = require('socket.io')(server);

// HTTP log
app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, 'public')));

io.on("connection", socket => {
    socket.on("newuser", (username) => {
        socket.broadcast.emit("update", username + " đã tham gia nhóm chat.");
    });
    socket.on("exituser", (username) => {
        socket.broadcast.emit("update", username + " đã dời khỏi nhóm chat.");
    });
    socket.on("chat", (message) => {
        socket.broadcast.emit("chat", message);
    });
});

server.listen(3000);

