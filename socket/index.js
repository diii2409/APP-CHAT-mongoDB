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
});

io.listen(3000);
