import * as mongoose from 'mongoose';

const connection: string = process.env.MONGO_URI || '';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => mongoose.connect(connection),
  },
];
