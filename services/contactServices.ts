import contacts from '../public/Contact.json' 
import { ContactInterface } from '../interfaces/ContactInterface'

export class ContactService {

    private contactList : ContactInterface[] = contacts;
    
    createContact(contact: ContactInterface){
        this.contactList.push(contact)
        return contact;
    }

    updateContact(id: number, edit: Partial<ContactInterface>){
        this.contactList = this.contactList.map(row => row.ID === id ? {...row, ...edit} : row)
    }

    fetchAll(){
        return this.contactList;
    }

    deleteContact(id: number){
        return this.contactList = this.contactList.filter(Contact => Contact.ID !== id)
    }
}