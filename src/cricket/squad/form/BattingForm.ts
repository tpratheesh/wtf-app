export default class BattingForm {
    id: String
    runs: Number
    balls: Number
    SR: Number
    fours: Number
    sixes: Number
    points: Number
    description: String
    batOrder: Number

    constructor(runs = 0, balls = 0, SR = 0, fours = 0, sixes = 0, points = 0, description = '', batOrder = 0) {
        this.runs = runs;
        this.balls = balls;
        this.SR = SR;
        this.fours = fours;
        this.sixes = sixes;
        this.points = points;
        this.description = description
        this.batOrder = batOrder;
    }
}