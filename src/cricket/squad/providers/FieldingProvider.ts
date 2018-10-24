import { Connection } from 'mongoose';
import { FieldingSchema } from '../model/FieldingSchema';

export const FieldingProvider = [
    {
        provide: 'FieldingModelToken',
        useFactory: (connection: Connection) => connection.model('Fielding', FieldingSchema),
        inject: ['DbConnectionToken'],
    },
];