import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide: 'DbConnectionToken',
        useFactory: async (): Promise<typeof mongoose> =>
            // await mongoose.connect('mongodb://wtfuser:wtf123@ds111623.mlab.com:11623/wtfdb', { useNewUrlParser: true }),
            await mongoose.connect('mongodb://localhost/wtfdb', { useNewUrlParser: true }),
    },
];