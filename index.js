let expressServer = require("express")();
let httpServer = require("http").createServer(expressServer);
let cors = require("cors");
const io = require("socket.io")(httpServer);

const PORT = process.env.PORT || 5000;

expressServer.use(cors());

expressServer.get("/", (req, res) => {
  res.send("<h1>Socket Server</h1>");
});

io.on("connection", (socket) => {
  console.log("connected");
  console.log(socket.id);
  // handle the event sent with socket.send()
  socket.on("message", (data) => {
    console.log(data);
    io.emit("the-data", data);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
