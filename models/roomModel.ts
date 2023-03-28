import { Schema, model, Document } from "mongoose";
import { KeyDocument } from "./keyModel";

export interface Room {
	id: string;
	number: number;
	keyIDs: KeyDocument["_id"][];
}

export interface RoomDocument extends Room, Document {
	id: string;
}

const roomSchema = new Schema<RoomDocument>({
	number: {
		type: Number,
	},
	keyIDs: [
		{
			type: Schema.Types.ObjectId,
			ref: "Key",
		},
	],
});

roomSchema.set("toJSON", {
	transform: function (doc, ret) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
	},
});

export const RoomModel = model<RoomDocument>("Room", roomSchema);
