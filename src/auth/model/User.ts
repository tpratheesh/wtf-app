export class User {
    name: String
    mobileNo: String
    email: String
    userName: String
    gender: String
    userType: String

    constructor(name: String, mobileNo: String, userType: String) {
        this.name = name
        this.mobileNo = mobileNo
        this.userType = userType
    }
}