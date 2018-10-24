import BattingForm from "./BattingForm";
import BowlingForm from "./BowlingForm";
import FieldingForm from "./FieldingForm";

export default class PlayerInningsForm {
    id: String
    batting: String
    bowling: String
    fielding: String

    constructor(battingId: String, bowlingId: String, fieldingId: String) {
        this.batting = battingId;
        this.bowling = bowlingId;
        this.fielding = fieldingId;
    }
}