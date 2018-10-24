
import { Connection } from 'mongoose';
import { BattingSchema } from '../model/BattingSchema';

export const BattingProvider = [
    {
        provide: 'BattingModelToken',
        useFactory: (connection: Connection) => connection.model('Batting', BattingSchema),
        inject: ['DbConnectionToken'],
    },
];