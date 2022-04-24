import { Connection } from 'mongoose';

import { UserSchema } from './schemas/user.schema';

export const userProviders = [
  {
    // mapping user schema to user model
    provide: 'UserModel',
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
