export default class InningsForm {
    id: String
    total: Number
    extras: Number
    totalDescription: String
    extrasDescription: String
    wickets: Number

    constructor(total = 0, extras = 0, wickets = 0, totalDescription = '', extrasDescription = '') {
        this.total = total;
        this.extras = extras;
        this.wickets = wickets;
        this.totalDescription = totalDescription;
        this.extrasDescription = extrasDescription;
    }
}