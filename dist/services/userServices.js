"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserSchema_1 = require("../models/UserSchema");
class UserService {
    async createUser(data) {
        return await new UserSchema_1.UserSchema(data).save();
    }
    async fetchAll() {
        return await UserSchema_1.UserSchema.find();
    }
    async getUserById(id) {
        return await UserSchema_1.UserSchema.findById(id);
    }
    async updateUser(id, updates) {
        return await UserSchema_1.UserSchema.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });
    }
    async deleteUser(id) {
        const doc = await UserSchema_1.UserSchema.findByIdAndDelete(id);
        return { deletedCount: doc ? 1 : 0 };
    }
}
exports.UserService = UserService;
