"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserSchema_1 = require("../models/UserSchema");
class UserService {
    async createUser(user) {
        const newUser = new UserSchema_1.UserSchema(user);
        return await newUser.save();
    }
    async updateUser(id, edit) {
        return await UserSchema_1.UserSchema.findOneAndUpdate({ ID: id }, edit, {
            new: true,
            runValidators: true,
        });
    }
    async fetchAll() {
        return await UserSchema_1.UserSchema.find();
    }
    async deleteUser(id) {
        return await UserSchema_1.UserSchema.deleteOne({ ID: id });
    }
    async getUserById(id) {
        return await UserSchema_1.UserSchema.findOne({ ID: id });
    }
}
exports.UserService = UserService;
