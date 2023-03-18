import mongoose from "mongoose";

const historyModel = new mongoose.Schema({
	startTime: {
		type: Date,
		default: Date.now(),
	},
	endTime: {
		type: Date,
		default: null,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
	key: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "key",
		required: true,
	},
});

historyModel.virtual("id").get(function () {
	return this._id.toHexString();
});

historyModel.set("toJSON", {
	virtuals: true,
	versionKey: false,
});

historyModel.pre(/^find/, function (next) {
	this.populate({
		path: "user",
		select: "name surname number",
	});

	this.populate({
		path: "key",
		select: "room",
	});

	next();
});
