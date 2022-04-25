import { ObjectSchema } from '@hapi/joi';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: ObjectSchema) {}

  transform(value: any) {
    const { error } = this.schema.validate(value);

    if (error) {
      throw new BadRequestException(error.message);
    }

    return value;
  }
}
