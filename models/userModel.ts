import mongoose from "mongoose";

const userModel = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: [true, "Please tell us your name"],
	},
	surname: {
		type: String,
		trim: true,
		required: [true, "Please tell us your surname"],
	},
	number: {
		type: Number,
	},
	cardIds: [
		{
			type: Number,
		},
	],
});

const User = mongoose.model("User", userModel);

export default User;
