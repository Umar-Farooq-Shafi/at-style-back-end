export declare class ConfigService {
    private readonly envConfig;
    constructor(filePath: string);
    private validate;
    get(key: string): string;
}
