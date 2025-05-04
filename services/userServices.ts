import users from '../public/users.json' 
import { UsersInterface } from '../interfaces/UsersInterface'
import { UserSchema } from '../models/UserSchema';

export class UserService {
    async createUser(user: UsersInterface) {
        const newUser = new UserSchema(user);
        return await newUser.save();
    }

    async updateUser(id: number, edit: Partial<UsersInterface>) {
        return await UserSchema.findOneAndUpdate({ ID: id }, edit, {
            new: true,
            runValidators: true,
        });
    }

    async fetchAll() {
        return await UserSchema.find();
    }

    async deleteUser(id: number) {
        return await UserSchema.deleteOne({ ID: id });
    }

    async getUserById(id: number) {
        return await UserSchema.findOne({ ID: id });
    }
}