import { UserModel } from "../models/userModel";
import factory from "./handleFactory";

export default {
	getAllUsers: factory.getAll(UserModel),
	createUser: factory.createOne(UserModel),
	getUser: factory.getOne(UserModel),
	deleteUser: factory.deleteOne(UserModel),
	patchUser: factory.patchOne(UserModel),
};
