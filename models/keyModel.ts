import { Schema, model, Document } from "mongoose";
import { UserDocument } from "./userModel";

export interface Key {
	id?: string;
	cardIds: number[];
	currentOwner: null | UserDocument["_id"];
}

export interface KeyDocument extends Key, Document {
	id: string;
}

const keySchema = new Schema<KeyDocument>(
	{
		cardIds: {
			type: [Number],
			required: true,
		},
		currentOwner: {
			type: Schema.Types.ObjectId,
			ref: "User",
			default: null,
		},
	},
	{
		versionKey: false,
	}
);

keySchema.pre(/^find/, function (next) {
	this.populate({
		path: "currentOwner",
		select: "-__v",
	});

	next();
});


keySchema.set("toJSON", {
	transform: function (doc, ret) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
	},
});

export const KeyModel = model<KeyDocument>("Key", keySchema);
