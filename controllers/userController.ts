import { UserModel } from "../models/userModel";
import factory from "./handleFactory";

export default {
	getAllUsers: factory.getAll(UserModel),
	createUser: factory.createOne(UserModel),
	getPlayer: factory.getOne(UserModel),
	deletePlayer: factory.deleteOne(UserModel),
	patchPlayer: factory.patchOne(UserModel),
};
