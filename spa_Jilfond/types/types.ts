export type Address = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    };
};

export type Company = {
    name: string;
    catchPhrase: string;
    bs: string;
};

export type EmployeeProfile = {
    address: Address;
    company: Company;
    email: string;
    id: number;
    name: string;
    phone: string;
    username: string;
    website: string;
};


export type User = {
    user: string;
}

export type userNameContext = {
    $userName: string
}
