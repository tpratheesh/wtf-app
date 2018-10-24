import { Connection } from 'mongoose';
import { BowlingSchema } from '../model/BowlingSchema';

export const BowlingProvider = [
    {
        provide: 'BowlingModelToken',
        useFactory: (connection: Connection) => connection.model('Bowling', BowlingSchema),
        inject: ['DbConnectionToken'],
    },
];