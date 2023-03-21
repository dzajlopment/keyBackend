import mongoose from "mongoose";

const roomModel = new mongoose.Schema(
	{
		number: {
			type: String,
		},
		key: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Key",
		},
	},
	{
		versionKey: false,
	}
);

roomModel.virtual("id").get(function () {
	return this._id.toHexString();
});

roomModel.set("toJSON", {
	virtuals: true,
	versionKey: false,
});

roomModel.pre(/^find/, function (next) {
	this.populate({
		path: "key",
	});

	next();
});

const Room = mongoose.model("Room", roomModel);

export default Room;
