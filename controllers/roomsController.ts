import { RoomModel } from "../models/roomModel"
import factory from "./handleFactory"

export default {
    getAllRooms: factory.getAll(RoomModel),
    createRoom: factory.createOne(RoomModel),
    getRoom: factory.getOne(RoomModel),
    deleteRoom: factory.deleteOne(RoomModel),
    patchRoom: factory.patchOne(RoomModel),
};
