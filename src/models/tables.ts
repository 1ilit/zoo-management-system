export interface StaffMember {
    ssn: string;
    date_of_birth: Date;
    first_name: string;
    last_name: string;
    sex: string;
    phone_number: string;
    email: string;
    address: string;
    isvolunteer: "Y" | "N";
    isparttime: "Y" | "N";
    isfulltime: "Y" | "N";
    payperhour: string;
    paypermonth: string;
}

export interface Animal {
    aid: string;
    name: string;
    specie: string;
    date_of_birth: string;
    weight: number;
    habitat: string;
}
