"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactValidator = void 0;
class ContactValidator {
    static validateContact(contact, allcontact) {
        const error = [];
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const { first_name, last_name, Date, email, phone, Subject, Comment, ARCHIVE } = contact;
        if (!first_name) {
            error.push('Tienes que introducir tu nombre');
        }
        else if (!last_name) {
            error.push('Tienes que introducir tu nombre');
        }
        else if (!Date) {
            error.push('tienes que poner una foto');
        }
        else if (!regex.test(email)) {
            error.push('El email introducido no tiene el formato valido');
        }
        else if (!phone) {
            error.push('tienes que introducir una fecha');
        }
        else if (!Subject) {
            error.push('tienes que introducir el asunto');
        }
        else if (!Comment) {
            error.push('tienes que introducir un comentario');
        }
        else if (!ARCHIVE) {
            error.push('tienes que introducir si esta archivado');
        }
        return error;
    }
}
exports.ContactValidator = ContactValidator;
