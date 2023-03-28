import { KeyModel } from "../../models/keyModel";
import { RentHistoryModel } from "../../models/rentHistoryModel";
import { RoomModel } from "../../models/roomModel";
import { UserModel } from "../../models/userModel";

export default async () => {
	await RoomModel.deleteMany({});
	await KeyModel.deleteMany({});
	await UserModel.deleteMany({});
	await RentHistoryModel.deleteMany({});

	console.log("All data deleted!");
};
