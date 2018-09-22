export default class SuccessResponse {
    success: boolean
    message: String

    constructor(message: String) {
        this.success = true;
        this.message = message;
    }
}