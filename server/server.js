import express from "express";
import cors from "cors";
import "dotenv/config";
import http from "http";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoute.js";
import messageRouter from "./routes/messageRoute.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// connect database
await connectDB();

// initialise socket.io server
export const io = new Server(server, {
  cors: { origin: "*" },
});

// store online users
export const userSocketMap = {}; // {userId:socketId}

// socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User Connected", userId);

  if (userId) userSocketMap[userId] = socket.id;

  // Emit online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User Disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// middlewares
app.use(express.json({ limit: "4mb" }));
app.use(cors());

app.get("/", (req, res) => {
  res.send(
    "Welcome to Chat App API 🚀. Use /api/status, /api/auth, /api/messages"
  );
});

app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  server.listen(port, () => console.log("server is running on port:", port));
}

// export for vercel
export default server;
