const app = require("./app");
const connectDatabase = require("./config/database");
const socketio = require('socket.io');

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

const io = socketio(server)

io.on('connect', (socket) => {
    console.log(`${socket.id} connected`)

    socket.on("Task updated", (data) => {
        console.log(data)
        io.emit('Task updated', data)
    })

    socket.on("Task deleted", (data) => {
        console.log(data)
        io.emit("Task deleted", data)
    })

    socket.on("Task created", (data) => {
        console.log(data)
        io.emit("Task created", data)
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`)
    })
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});