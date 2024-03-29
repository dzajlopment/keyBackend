import { Schema, model, Document } from "mongoose";
import { UserDocument, UserModel } from "./userModel";
import { KeyDocument } from "./keyModel";

export interface RentHistory {
	id?: string;
	startTime: Date;
	endTime: Date | null;
	user?: UserDocument["_id"];
	key?: KeyDocument["_id"];
}

export interface RentHistoryDocument extends RentHistory, Document {
	id: string;
}

const rentHistorySchema = new Schema<RentHistoryDocument>(
	{
		startTime: {
			type: Date,
			default: Date.now,
		},
		endTime: {
			type: Date,
			default: null,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		key: {
			type: Schema.Types.ObjectId,
			ref: "Key",
			required: true,
		},
	},
	{
		versionKey: false,
	}
);

rentHistorySchema.set("toJSON", {
	transform: function (doc, ret) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
	},
});

rentHistorySchema.pre(/^find/, function (next) {
	this.populate({
		path: "user",
		select: "-__v",
	});

	this.populate({
		path: "key",
		select: "-__v -currentOwner",
	});
	next();
});

rentHistorySchema.set("toObject", { virtuals: true });

export const RentHistoryModel = model<RentHistoryDocument>(
	"RentHistory",
	rentHistorySchema
);
