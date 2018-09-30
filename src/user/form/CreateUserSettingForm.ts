import { IsNotEmpty } from 'class-validator';

export default class CreateUserSettingForm {
    selectedUserAccount: String
    selectedTheme: String
    user: String

    constructor(selectedUserAccount: String, selectedTheme: String, user: String) {
        this.selectedUserAccount = selectedUserAccount;
        this.selectedTheme = selectedTheme;
        this.user = user;
    }
}