import * as mongoose from 'mongoose';
import * as autopopulate from 'mongoose-autopopulate';

export const FieldingSchema = new mongoose.Schema({
    catches: Number,
    stumping: Number,
    runOuts: Number,
    points: Number
});
FieldingSchema.plugin(autopopulate);