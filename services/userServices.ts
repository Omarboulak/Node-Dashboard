import users from '../public/users.json' 
import { UsersInterface } from '../interfaces/UsersInterface'

export class UserService {

    private userList : UsersInterface[] = users;
    
    createUser(user: UsersInterface){
        this.userList.push(user)
        return user;
    }

    updateUser(id: number, edit: Partial<UsersInterface>){
        this.userList = this.userList.map(row => row.ID === id ? {...row, ...edit} : row)
    }

    fetchAll(){
        return this.userList;
    }

    deleteUser(id: number){
        return this.userList = this.userList.filter(user => user.ID !== id)
    }
}