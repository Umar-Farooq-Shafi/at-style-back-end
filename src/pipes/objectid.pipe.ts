import { Types } from 'mongoose';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseObjectPipe implements PipeTransform {
  transform(value: string): Types.ObjectId {
    // check if the given id is a valid ObjectId
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid use id');
    }

    return new Types.ObjectId(value);
  }
}
