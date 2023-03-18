import mongoose from "mongoose";

const keyModel = new mongoose.Schema({
	currentOwner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		default: null,
	},
	cardIds: [
		{
			type: Number,
		},
	],
});

keyModel.virtual("room", {
	ref: "Room",
	foreignField: "key",
	localField: "_id",
});

keyModel.virtual("id").get(function () {
	return this._id.toHexString();
});

keyModel.set("toJSON", {
	virtuals: true,
	versionKey: false,
});

const Key = mongoose.model("Key", keyModel);

export default Key;
