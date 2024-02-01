export class UserModel {
    userId: number;
    userName: string;
    firstName: string
    lastName: string
    mobileNumber: string;
    age: number;
    email: string;
    password: string;
    userRole: string
    addressId: number

    constructor() {
        this.userId = 0
        this.userName = ''
        this.firstName = ''
        this.lastName = ''
        this.mobileNumber = ''
        this.age = 0
        this.email = ''
        this.password = ''
        this.userRole = ''
        this.addressId = 0
    }
}