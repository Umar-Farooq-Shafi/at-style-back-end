import { Types } from 'mongoose';
import { PipeTransform } from '@nestjs/common';
export declare class ParseObjectPipe implements PipeTransform {
    transform(value: string): Types.ObjectId;
}
