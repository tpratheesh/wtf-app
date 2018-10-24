import { Connection } from 'mongoose';
import { InningsSchema } from '../model/InningsSchema';

export const InningsProvider = [
    {
        provide: 'InningsModelToken',
        useFactory: (connection: Connection) => connection.model('Innings', InningsSchema),
        inject: ['DbConnectionToken'],
    },
];