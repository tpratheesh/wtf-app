export default class FieldingForm {
    id: String
    catches: Number
    stumping: Number
    runOuts: Number
    points: Number

    constructor(catches = 0, stumping = 0, runOuts = 0, points = 0) {
        this.catches = catches;
        this.stumping = stumping;
        this.runOuts = runOuts;
        this.points = points;
    }
}