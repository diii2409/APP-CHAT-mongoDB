const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5173" });

let onLineUsers = [];

io.on("connection", (socket) => {
	console.log("new connection ", socket.id);
	socket.on("addNewUser", (userId) => {
		!onLineUsers.some((user) => user.userId === userId) &&
			onLineUsers.push({
				userId,
				socketId: socket.id,
			});

		console.log("onLineUsers : ", onLineUsers);

		io.emit("getOnlineUsers", onLineUsers);
	});

	socket.on("sendMessage", (message) => {
		console.log("message form Client : ", message);
		const user = onLineUsers.find(
			(user) => user.userId === message.recipientId,
		);

		if (user) {
			console.log("message to Client :", message);
			io.to(user.socketId).emit("getMessage", message);
		}
	});

	socket.on("disconnect", () => {
		onLineUsers = onLineUsers.filter((user) => user.socketId !== socket.id);
		console.log("user disconnected ", socket.id);
		io.emit("getOnlineUsers", onLineUsers);
	});
});

io.listen(3000);
