export type PlaceholderKeys = 'name' | 'age';

export interface Person {
    name: string | null;
    age: string | null;
}

export interface Child extends Person {
    errorName: boolean;
    errorAge: boolean;
    placeholderName: string;
    placeholderAge: string;
}

export interface Placeholder {
    name: string;
    age: string;
    required: string;
    error?: string;
}

export interface Props {
    isChildrenErrors: number[];
    isChildOlder: number[];
}

export interface FormData {
    personInfo: Person,
    children: Child[]
}

export interface Validator {
    name: string | null;
    age: string | null;
}
export interface Declension {
    age: string;
}
