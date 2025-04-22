import { UsersInterface } from "../interfaces/UsersInterface";

export class UserValidator{
    static validateUser(user: any, allUser: UsersInterface[]) : UsersInterface | Boolean | string {
            const {FullName, Status, ID} = user;
            if (FullName !== '') {
                return 'el nombre no puede contener numeros'
            } else if (Status !== 'ACTIVE' || Status !== 'INACTIVE') {
                return 'Status solo puede ser ACTIVE o INACTIVE'
            } else if (allUser.some(userId => userId.ID === user.ID)) {
                return 'el id tiene que ser un numero'
            }


        return user;
    }
}