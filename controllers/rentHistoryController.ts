import { RentHistoryModel } from "../models/rentHistoryModel";
import factory from "./handleFactory";

export default {
	getAllRentHistories: factory.getAll(RentHistoryModel),
	createRentHistory: factory.createOne(RentHistoryModel),
	getRentHistory: factory.getOne(RentHistoryModel),
	deleteRentHistory: factory.deleteOne(RentHistoryModel),
	patchRentHistory: factory.patchOne(RentHistoryModel),
};
