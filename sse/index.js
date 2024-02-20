import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3010;

app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream"); // Correct MIME type
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Cache-Control", "no-cache");

  res.write("data: welcome to server sent event \n\n");
  let interval = setInterval(() => {
    res.write(`data: Server time ${new Date().toLocaleDateString()} \n\n`);
  }, 5000);

  req.on("close", () => {
    clearInterval(interval);
  });
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.get("/getData", (req, res) => {
  res.send({
    data,
  });
});
// for browser hit we are using get but should use put or post
app.get("/updateData", (req, res) => {
  data = `Updated data ${Math.floor(Math.random() * 100)}`;
  res.send({
    data,
  });
});
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
