import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { createServer } from "node:http";
import cors from "cors";
import { connectToSocket } from "./controllers/socket.manager.js";
import userRoute from "./routers/users.routes.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Server Running" });
});

app.use("/api/v1/users", userRoute);

const start = async () => {
  const connectiondb = await mongoose.connect(process.env.MONGO_URL);
  console.log(`MONGO connected db host : ${connectiondb.connection.host}`);

  server.listen(app.get("port"), () => {
    console.log("server listening on port 8000");
  });
};

start();
