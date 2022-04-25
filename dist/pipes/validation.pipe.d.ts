/// <reference types="hapi__joi" />
import { ObjectSchema } from '@hapi/joi';
import { PipeTransform } from '@nestjs/common';
export declare class JoiValidationPipe implements PipeTransform {
    private readonly schema;
    constructor(schema: ObjectSchema);
    transform(value: any): any;
}
