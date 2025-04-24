import { ContactInterface } from "../interfaces/ContactInterface";

export class ContactValidator{
    static validateContact(user: any, allUser: ContactInterface[]) : ContactInterface | Boolean | string {

            const regex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)/
            const {first_name, last_name, Status, ID, Date, Email, phone, Subject, Comment, ARCHIVE} = user;
            if (!ID) {
                return 'tienes que introducir el id'
            }else if (!first_name) {
                return 'Tienes que introducir tu nombre'
            }else if (!last_name) {
                return 'Tienes que introducir tu nombre'
            }else if (Status !== 'ACTIVE' && Status !== 'INACTIVE') {
                return 'Status solo puede ser ACTIVE o INACTIVE'
            } else if (allUser.some(userId => userId.ID === user.ID)) {
                return 'el id no puede estar duplicado'
            } else if (!Date) {
                return 'tienes que poner una foto'
            } else if (!regex.test(Email)) {
                return 'El email introducido no tiene el formato valido'
            } else if (!phone) {
                return 'tienes que introducir una fecha'
            } else if (!Subject) {
                 return 'tienes que introducir el asunto'
            } else if (!Comment) {
                return 'tienes que introducir un comentario'
            }else if (!ARCHIVE) {
                return 'tienes que introducir si esta archivado'
            }
        return user;
    }
}