
export type ENV = 'production' | 'stage' | 'development' | 'test';

export interface ApplicationOptions {
    readonly httpServerOptions: HttpServerOptions;
    readonly databaseOptions: DatabaseOptions;
}

export interface DatabaseOptions {
    readonly host: string;
    readonly port: number;
    readonly username: string;
    readonly password: string;
    readonly database: string;
}

export interface HttpServerOptions {
    readonly port: number;
    readonly host: string;
}
