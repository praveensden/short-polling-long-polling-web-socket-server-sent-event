import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3010;

const waitingClientList = [];
let data = "initial data";
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.get("/getData", (req, res) => {
  if (data !== req.query.lastData) {
    res.send({
      data,
    });
  } else {
    waitingClientList.push(data);
  }
});
// for browser hit we are using get but should use put or post
app.get("/updateData", (req, res) => {
  data = req.query.data;
  while (waitingClientList.length > 0) {
    const client = waitingClientList.pop();
    client.json({
      data,
    });
  }
  res.send("Data updated successfully");
});
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
