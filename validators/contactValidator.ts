import { ContactInterface } from "../interfaces/ContactInterface";

export class ContactValidator{
    static validateContact(contact: any, allcontact: ContactInterface[]) : ContactInterface | Boolean | string {
            const error: string[] = []
            const regex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)/
            const {first_name, last_name, Status, ID, Date, Email, phone, Subject, Comment, ARCHIVE} = contact;
            if (!ID) {
               error.push('tienes que introducir el id')
            }else if (!first_name) {
               error.push('Tienes que introducir tu nombre')
            }else if (!last_name) {
               error.push('Tienes que introducir tu nombre')
            }else if (Status !== 'ACTIVE' && Status !== 'INACTIVE') {
               error.push('Status solo puede ser ACTIVE o INACTIVE')
            } else if (allcontact.some(contactId => contactId.ID === contact.ID)) {
               error.push('el id no puede estar duplicado')
            } else if (!Date) {
               error.push('tienes que poner una foto')
            } else if (!regex.test(Email)) {
               error.push('El email introducido no tiene el formato valido')
            } else if (!phone) {
               error.push('tienes que introducir una fecha')
            } else if (!Subject) {
                error.push('tienes que introducir el asunto')
            } else if (!Comment) {
               error.push('tienes que introducir un comentario')
            }else if (!ARCHIVE) {
               error.push('tienes que introducir si esta archivado')
            }
            return error.length === 0 ? true : contact;

    }
}