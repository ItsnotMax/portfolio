import type { Contacts } from '@/types/types';
import { fetchPOST, fetchPATCH, fetchDELETE } from '@/ts_modules/fetchRequest';
import { isValidString, validatePhoneNumber, validateSocialWeb } from '@/ts_modules/check_txt';
import { validEmail } from '@/ts_modules/emailValidator';


export class Person {
    public name: string;
    public lastName: string;
    public surname: string;
    public contacts: Contacts | null;


    constructor(name: string, lastName: string, surname: string, contacts: Contacts | null = null) {
        this.name = name;
        this.surname = surname;
        this.lastName = lastName;
        this.contacts = contacts;
    }

    static toPost(data: Person) {
        const url = 'http://localhost:3000/api/clients';
        fetchPOST(url, data);
    }
    static toPatch(id: string, data: Person) {
        const url = 'http://localhost:3000/api/clients';
        const urlId = `${url}/${id}`
        fetchPATCH(urlId, data);
    }
    static toDelete(id: string) {
        const url = 'http://localhost:3000/api/clients';
        const urlId = `${url}/${id}`
        fetchDELETE(urlId);
    }
    static checkPersonData(name: HTMLInputElement[], contacts: Contacts): any | void {
        try {
            const mistakes: (any) = [];

            name.forEach(element => {
                if (element.dataset.empty == 'empty' && element.value.length === 0) {
                    !isValidString(element.value);
                } else {
                    !isValidString(element.value) && mistakes.push(element);
                }
            });

            contacts.forEach(contact => {
                if (contact.type === 'tel' && !validatePhoneNumber(contact.value)) {
                    mistakes.push(contact);
                } else if (contact.type === 'email' && !validEmail(contact.value)) {
                    mistakes.push(contact);
                } else if (contact.type === 'vk' && !validateSocialWeb(contact.value, 'vk.com/', 7)) {
                    mistakes.push(contact);
                } else if (contact.type === 'facebook' && !validateSocialWeb(contact.value, 'facebook.com/', 13)) {
                    mistakes.push(contact);
                }
            });

            return mistakes;
        } catch (error) {
            alert('Что-то пошло не так во время валидации, сообщите, пожалуйста, об этом');
        }
    }
}

export class GetPerson extends Person {
    public id: string;
    public updatedAt: string;
    public createdAt: string;

    constructor(name: string, lastName: string, surname: string = '', contacts: Contacts = [], id: string, updatedAt: string, createdAt: string) {
        super(name, lastName, surname, contacts);
        this.id = id;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
    }
}