import mongoose from "mongoose";
import dotenv from "dotenv";
import { seedRentHistory, seedRooms, seedUsers } from "./seedData";

dotenv.config();
const DB = process.env.DATABASE?.replace(
	"<PASSWORD>",
	process.env.DATABASE_PASSWORD || ""
);

mongoose.connect(DB!).then(() => console.log("DB connection successful!"));

if (process.argv[2] === "--import") {
	if (!process.argv[3]) {
		seedUsers();
		seedRooms();
		seedRentHistory();
	} else {
		if (process.argv[3] === "users") {
			seedUsers();
		}

		if (process.argv[3] === "rooms") {
			seedRooms();
		}

		if (process.argv[3] === "history") {
			seedRentHistory();
		}
	}
} else if (process.argv[2] === "--delete") {
	console.log("Delete");
}

console.log(process.argv);
