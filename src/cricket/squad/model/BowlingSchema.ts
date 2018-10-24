import * as mongoose from 'mongoose';
import * as autopopulate from 'mongoose-autopopulate';

export const BowlingSchema = new mongoose.Schema({
    runs: Number,
    balls: Number,
    ER: Number,
    wickets: Number,
    maiden: Number,
    points: Number
});
BowlingSchema.plugin(autopopulate);