import { Connection } from 'mongoose';
import { SeriesSchema } from '../model/SeriesSchema';

export const SeriesProvider = [
    {
        provide: 'SeriesModelToken',
        useFactory: (connection: Connection) => connection.model('Series', SeriesSchema),
        inject: ['DbConnectionToken'],
    },
];