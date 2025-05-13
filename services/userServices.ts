import { UsersInterface } from '../interfaces/UsersInterface';
import { UserSchema } from '../models/UserSchema';

export class UserService {
  async createUser(data: UsersInterface) {
    return await new UserSchema(data).save();
  }

  async fetchAll() {
    return await UserSchema.find();
  }

  async getUserById(id: string) {
    return await UserSchema.findById(id);
  }

  async updateUser(id: string, updates: Partial<UsersInterface>) {
    return await UserSchema.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
  }

  async deleteUser(id: string) {
    const doc = await UserSchema.findByIdAndDelete(id);
    return { deletedCount: doc ? 1 : 0 };
  }
}
