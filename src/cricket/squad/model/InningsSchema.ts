import * as mongoose from 'mongoose';
import * as autopopulate from 'mongoose-autopopulate';

export const InningsSchema = new mongoose.Schema({
    total: Number,
    wickets: Number,
    extras: Number,
    totalDescription: String,
    extrasDescription: String
});
InningsSchema.plugin(autopopulate);


