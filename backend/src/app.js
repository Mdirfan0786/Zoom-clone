import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socket.manager.js";

import cors from "cors";
import userRoute from "./routers/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.get("/home", (req, res) => {
  return res.json({ hello: "world" });
});

const start = async () => {
  app.set("mongo_user");

  const connectionDb = await mongoose.connect(
    "mongodb+srv://ApnaVideoCall:7DM06nkKocQtzGed@apnavideocall.lyv9onm.mongodb.net/"
  );
  console.log(`mongo connected DB to Host: ${connectionDb.connection.host}`);

  server.listen(app.get("port"), () => {
    console.log("listening on port: 8000");
  });
};

start();
