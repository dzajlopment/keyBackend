import { Schema, model, Document } from "mongoose";
import { UserDocument } from "./userModel";

export interface Key {
	id?: string;
	cardIds: number[];
	currentOwner: null | {
		id: UserDocument["_id"];
		name: string;
		surname: string;
	};
}

export interface KeyDocument extends Key, Document {
	id: string;
}

const keySchema = new Schema<KeyDocument>({
	cardIds: {
		type: [Number],
		required: true,
	},
	currentOwner: {
		id: {
			type: Schema.Types.ObjectId,
			ref: "User",
			default: null,
		},
		name: String,
		surname: String,
	},
});

keySchema.virtual("room", {
	ref: "Room",
	localField: "_id",
	foreignField: "keyIDs",
	justOne: true,
});

keySchema.set("toJSON", {
	transform: function (doc, ret) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
	},
});

export const KeyModel = model<KeyDocument>("Key", keySchema);
