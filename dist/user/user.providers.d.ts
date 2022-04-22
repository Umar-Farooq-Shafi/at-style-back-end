import { Connection } from 'mongoose';
export declare const userProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("mongoose").Model<any, any, any, any>;
    inject: string[];
}[];
