import { Room, RoomModel } from "../../models/roomModel";
import { Key, KeyModel } from "../../models/keyModel";
import { User, UserModel } from "../../models/userModel";
import { RentHistory, RentHistoryModel } from "../../models/rentHistoryModel";
import { faker } from "@faker-js/faker";

type ModifiedKey = Key & { roomId: string };

export async function seedUsers() {
	// Generate 10 random users
	const users: User[] = [];
	for (let i = 0; i < 10; i++) {
		users.push({
			name: faker.name.firstName(),
			surname: faker.name.lastName(),
			number: faker.datatype.number(),
			cardIds: [
				faker.datatype.number(),
				faker.datatype.number(),
				faker.datatype.number(),
			],
		});
	}

	// Insert the users into the database
	await UserModel.insertMany(users);

	console.log("Users seeded successfully");
}

export async function seedRooms() {
	// Generate 5 random rooms
	const rooms: Room[] = [];
	for (let i = 0; i < 5; i++) {
		rooms.push({
			number: faker.datatype
				.number({
					precision: 1,
					min: 1,
					max: 308,
				})
				.toString(),
			keyIDs: [],
		});
	}

	// Insert the rooms into the database
	const insertedRooms = await RoomModel.insertMany(rooms);

	// Generate keys for each room
	for (const room of insertedRooms) {
		const keys: ModifiedKey[] = [];
		for (let i = 0; i < 3; i++) {
			keys.push({
				cardIds: [
					faker.datatype.number(),
					faker.datatype.number(),
					faker.datatype.number(),
				],
				currentOwner: null,
				roomId: room._id,
			});
		}
		const insertedKeys = await KeyModel.insertMany(keys);
		const keyIDs = insertedKeys.map((key) => key.id);
		await RoomModel.updateOne({ _id: room._id }, { $set: { keyIDs } });
	}

	console.log("Rooms seeded successfully");
}

export async function seedRentHistory() {
	// Get all users and keys from the database
	const users = await UserModel.find({});
	const keys = await KeyModel.find({});

	// Generate rent history for each key
	const rentHistories: RentHistory[] = [];
	for (const key of keys) {
		const user = users[Math.floor(Math.random() * users.length)];
		rentHistories.push({
			startTime: faker.date.past(),
			endTime: new Date(),
			user: user._id,
			key: key._id,
		});
		await KeyModel.updateOne(
			{ _id: key._id },
			{
				$set: {
					currentOwner: user._id,
				},
			}
		);
	}

	// Insert the rent history into the database
	await RentHistoryModel.insertMany(rentHistories);

	console.log("Rent history seeded successfully");
}
