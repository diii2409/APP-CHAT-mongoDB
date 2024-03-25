const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute.js");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
	res.send("Welcome hello World!");
});

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.listen(port, (req, res) => {
	console.log("Server running on port: " + port);
});

mongoose
	.connect(uri)
	.then(() => {
		console.log(" \n MongoDB connection established \n");
	})
	.catch((error) => {
		console.log("\nMongoDB connection failed: " + error);
	});
