import * as mongoose from 'mongoose';
export declare const databaseProvider: {
    provider: string;
    useFactory: () => Promise<typeof mongoose>;
}[];
