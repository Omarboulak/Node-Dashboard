"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
class UserValidator {
    static validateUser(user, allUsers) {
        const error = [];
        const regex = /^[\w-+.']+(\.[\w-+']+)*@[\w-]+(\.[\w-]+)*(\.[a-z]{2,})$/i;
        const { FullName, Status, ID, Photo, Email, StartDate, JobDescription, Contact } = user;
        if (!FullName) {
            error.push('Tienes que introducir tu nombre completo');
        }
        else if (Status !== 'ACTIVE' && Status !== 'INACTIVE') {
            error.push('Status solo puede ser ACTIVE o INACTIVE');
        }
        else if (Photo === '') {
            error.push('tienes que poner una foto');
        }
        else if (!regex.test(Email)) {
            error.push('El email introducido no tiene el formato valido');
        }
        else if (!StartDate) {
            error.push('tienes que introducir una fecha');
        }
        else if (!JobDescription) {
            error.push('tienes que introducir una descripcion del trabajo');
        }
        else if (!Contact) {
            error.push('tienes que introducir un numero de contacto');
        }
        return error.length === 0 ? true : error.join(', ');
    }
}
exports.UserValidator = UserValidator;
