import { Connection } from 'mongoose';
import { SquadSchema } from '../model/SquadSchema';

export const SquadProvider = [
    {
        provide: 'SquadModelToken',
        useFactory: (connection: Connection) => connection.model('Squad', SquadSchema),
        inject: ['DbConnectionToken'],
    },
];