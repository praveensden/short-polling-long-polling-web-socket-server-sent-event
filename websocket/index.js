import express from "express";
import { createServer } from "node:http";
// import { path } from "node:path";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`CONNECTION ESTABLISHED`);
  socket.on("chat message", (msg) => {
    console.log("recieved message", msg);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    io.emit("user disconnected");
  });
});

const PORT = process.env.PORT || 3010;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

server.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
