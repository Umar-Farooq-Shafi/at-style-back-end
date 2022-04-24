import { Provider } from '@nestjs/common';
import * as mongoose from 'mongoose';

import { ConfigService } from '../config/config.service';

export const databaseProviders: Provider[] = [
  {
    inject: [ConfigService],
    provide: 'DATABASE_CONNECTION',
    useFactory: (configService: ConfigService): Promise<typeof mongoose> =>
      mongoose.connect(configService.get('MONGO_URI')),
  },
];
