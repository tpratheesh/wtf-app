export default class BowlingForm {
    id: String
    runs: Number
    balls: Number
    ER: Number
    wickets: Number
    maiden: Number
    points: Number

    constructor(runs = 0, balls = 0, ER = 0, wickets = 0, maiden = 0, points = 0) {
        this.runs = runs;
        this.balls = balls;
        this.ER = ER;
        this.wickets = wickets;
        this.maiden = maiden;
        this.points = points;
    }
}