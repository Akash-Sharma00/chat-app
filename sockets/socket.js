import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: ["http://localhost:3000"], methods: ["GET", "POST"] },
});

const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("New connection", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;

  io.emit("getOnlineUSers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("USER Disconnect", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUSers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
