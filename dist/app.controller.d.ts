import { User } from './user/interface/user.interface';
import { AuthService } from './auth/auth.service';
export declare class AppController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<User>;
    getProfile(req: any): any;
}
