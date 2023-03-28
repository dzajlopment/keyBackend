import { Schema, model, Document, Types } from "mongoose";
import { UserDocument } from "./userModel";
import { KeyDocument } from "./keyModel";

export interface RentHistory {
	id?: string;
	startTime: Date;
	endTime: Date | null;
	user?: {
		id: UserDocument["_id"];
		name: string;
		surname: string;
	};
	key?: KeyDocument["_id"];
}

export interface RentHistoryDocument extends RentHistory, Document {
	id: string;
}

const rentHistorySchema = new Schema<RentHistoryDocument>({
	startTime: {
		type: Date,
		default: Date.now,
	},
	endTime: {
		type: Date,
		default: null,
	},
	user: {
		id: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		name: String,
		surname: String,
	},
	key: {
		type: Schema.Types.ObjectId,
		ref: "Key",
		required: true,
	},
});

rentHistorySchema.set("toJSON", {
	transform: function (doc, ret) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
	},
});

rentHistorySchema.virtual("userDetails", {
	ref: "User",
	localField: "user.id",
	foreignField: "_id",
	justOne: true,
	options: { select: "name surname" },
});

rentHistorySchema.virtual("keyDetails", {
	ref: "Key",
	localField: "key",
	foreignField: "_id",
	justOne: true,
});

rentHistorySchema.set("toObject", { virtuals: true });

export const RentHistoryModel = model<RentHistoryDocument>(
	"RentHistory",
	rentHistorySchema
);