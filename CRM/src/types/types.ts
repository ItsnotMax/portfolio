import { GetPerson } from "./classes/Person";

export type Id = { id: string }
export type Name = { name: string }
export type Email = { email: string }
export type filteringType = {
    bool: boolean,
    type?: string
}
export type queryPerson = {
    query: string,
    type: string
}

export type Contact = { type: string, value: string }
export type Contacts = Contact[];
export type DataContact = {
    contact: string,
    tel: { case: string, value: string },
    adttel: { case: string, value: string },
    email: { case: string, value: string },
    vk: { case: string, value: string },
    facebook: { case: string, value: string }
};
export type MatchCoef = {
    matchCoef: number;
    person: GetPerson;
}