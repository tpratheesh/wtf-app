import * as mongoose from 'mongoose';
import * as autopopulate from 'mongoose-autopopulate';

export const BattingSchema = new mongoose.Schema({
    runs: Number,
    balls: Number,
    SR: Number,
    fours: Number,
    sixes: Number,
    points: Number,
    description: String,
    batOrder: Number
});
BattingSchema.plugin(autopopulate);