import mongoose from "mongoose";

const roomModel = new mongoose.Schema(
	{
		number: {
			type: String,
		},
		key: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "keys",
		},
	},
	{
		versionKey: false,
	}
);

roomModel.pre(/^find/, function (next) {
	this.populate({
		path: "keys",
		select: "currentOwner cardIds",
	});
	next();
});

roomModel.virtual("id").get(function () {
	return this._id.toHexString();
});

roomModel.set("toJSON", {
	virtuals: true,
	versionKey: false,
});

const Room = mongoose.model("Room", roomModel);

export default Room;
