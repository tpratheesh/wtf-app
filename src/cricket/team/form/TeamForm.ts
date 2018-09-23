import { IsNotEmpty } from 'class-validator';

export default class TeamForm {
    id: String
    @IsNotEmpty()
    name: String
    testPlaying: boolean
    odiPlaying: boolean
    t20Playing: boolean
    createdDate: Date
    updatedDate: Date
    active: boolean

    constructor(name, testPlaying, odiPlaying, t20Playing) {
        this.name = name;
        this.testPlaying = testPlaying;
        this.odiPlaying = odiPlaying;
        this.t20Playing = t20Playing;
        this.active = true;
    }
}