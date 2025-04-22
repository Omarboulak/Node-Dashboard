import { UsersInterface } from "../interfaces/UsersInterface";

export class UserValidator{
    static validateUser(user: any, allUser: UsersInterface[]) : UsersInterface | Boolean | string {

            const regex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)/
            const {FullName, Status, ID, Photo, Email, StartDate, JobDescription, Contact} = user;
            if (!FullName) {
                return 'Tienes que introducir tu nombre completo'
            } else if (Status !== 'ACTIVE' && Status !== 'INACTIVE') {
                return 'Status solo puede ser ACTIVE o INACTIVE'
            } else if (allUser.some(userId => userId.ID === user.ID)) {
                return 'el id no puede estar duplicado'
            } else if (Photo === '') {
                return 'tienes que poner una foto'
            } else if (!regex.test(Email)) {
                return 'El email introducido no tiene el formato valido'
            } else if (!StartDate) {
                return 'tienes que introducir una fecha'
            } else if (!JobDescription) {
                 return 'tienes que introducir una descripcion del trabajo'
            } else if (!Contact) {
                return 'tienes que introducir un numero de contacto'
            }
        return user;
    }
}