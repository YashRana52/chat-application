import express from "express";
import cors from "cors";
import "dotenv/config";
import http from "http";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoute.js";
import messageRouter from "./routes/messageRoute.js";

import { Server } from "socket.io";

const app = express();

if (process.env.NODE_ENV !== "production") {
  const port = process.env.port || 3000;
  server.listen(port, () => console.log("server is running on port:", port));
}

await connectDB();

const server = http.createServer(app);

//initialise socket.io server
export const io = new Server(server, {
  cors: { origin: "*" },
});

//store online users

export const userSocketMap = {}; // {userId:socketId}

// Socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User Connected", userId);

  if (userId) userSocketMap[userId] = socket.id;

  //Emit online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User Disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

//middlewares setup

app.use(express.json({ limit: "4mb" }));
app.use(cors());

app.use("/api/status", (req, res) => res.send("Server is live"));

app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// Export server for vercel
export default server;
