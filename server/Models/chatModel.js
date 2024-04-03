const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
	{
		members: Array,
		nameChat: String,
		avatarChat: Buffer,
	},
	{
		timestamps: true,
	},
);

const chatModel = mongoose.model("Chat", chatSchema);

module.exports = chatModel;
