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
    date_of_birth: Date;
    weight: number;
    habitat: string;
}

export interface Habitat {
    hid: string;
    name: string;
    capacity: number;
    type: string;
    size: number;
    description: string;
}

export interface Ticket {
    tid: string;
    price: number;
    type: "VIP" | "Regular" | "Membership";
    date_of_issuing: string;
    recep_ssn: string;
    guide_ssn: string;
}

export interface TicketData {
    tid: string;
    date_of_issuing: string;
    type: string;
    price: number;
    recep_first_name: string;
    recep_last_name: string;
    guide_first_name: string;
    guide_last_name: string;
}

export interface Event{
    name: string;
    date: string;
    location: string;
    event_manager_ssn: string;
}

export interface EventData {
    event_name: string;
    event_date: string;
    location: string;
    event_mgr_first_name: string;
    event_mgr_last_name: string;
}
