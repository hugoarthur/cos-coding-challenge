
export enum UserType {
    UNAUTHORIZED = 0,
    BUYER = 1,
}

export enum UserRole {
    BUYERS = "buyers",
    SELLERS = "sellers",
    SELLERS_SUPERVISORS = "sellersSupervisors",
    INTERNAL_USERS = "internalUsers",
    SYSADMINS = "sysadmins",
    TRANSPORTATION_PROVIDERS = "transportationProviders",
    CARGO_CUSTOMERS = "cargoCustomers",
    CLIENT_APPLICATION = "clientApplication"
}
