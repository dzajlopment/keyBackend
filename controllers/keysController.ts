import { KeyModel } from "../models/keyModel";
import factory from "./handleFactory";

export default {
    getAllKeys: factory.getAll(KeyModel),
    createKey: factory.createOne(KeyModel),
    getKey: factory.getOne(KeyModel),
    deleteKey: factory.deleteOne(KeyModel),
    patchKey: factory.patchOne(KeyModel),
};
