import { Schema, model, Document } from "mongoose";

export type User = {
	id: string;
	name: string;
	surname: string;
	number: number;
	cardIds: number[];
};

export interface UserDocument extends User, Document {
	id: string;
}

const userSchema = new Schema<UserDocument>({
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
		required: true,
	},
	cardIds: {
		type: [Number],
		required: true,
	},
});

userSchema.set("toJSON", {
	transform: function (doc, ret) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
	},
});

export const UserModel = model<UserDocument>("User", userSchema);
