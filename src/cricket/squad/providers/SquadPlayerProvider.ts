import { Connection } from 'mongoose';
import { SquadPlayerSchema } from '../model/SquadPlayerSchema';

export const SquadPlayerProvider = [
    {
        provide: 'SquadPlayerModelToken',
        useFactory: (connection: Connection) => connection.model('SquadPlayer', SquadPlayerSchema),
        inject: ['DbConnectionToken'],
    },
];