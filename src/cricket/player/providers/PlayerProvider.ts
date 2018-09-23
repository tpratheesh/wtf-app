import { Connection } from 'mongoose';
import { PlayerSchema } from '../model/PlayerSchema';

export const PlayerProvider = [
    {
        provide: 'PlayerModelToken',
        useFactory: (connection: Connection) => connection.model('Player', PlayerSchema),
        inject: ['DbConnectionToken'],
    },
];