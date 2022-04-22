import * as mongoose from 'mongoose';

import { ConfigService } from '@nestjs/config';

const connection = new ConfigService().get<string>('MONGO_URI');
console.log(connection);

if (connection === undefined) {
  throw new Error('MONGO_URI is not defined');
}

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => mongoose.connect(connection),
  },
];
