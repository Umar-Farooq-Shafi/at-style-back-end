import { Request } from 'express';
import { Observable } from 'rxjs';
export declare class UserController {
    create(): string;
    findAll(request: Request): Observable<string>;
    findOne(id: string): string;
}
