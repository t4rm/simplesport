export type AppConfig = {
    server: {
        host: string;
        port: number;
        cors?: string[];
    };
    swagger: {
        title: string;
        description: string;
        version: string;
        tag: string;
        path: string;
    };
};

export type ServerConfig = {
    host: string;
    port: number;
    cors?: string[];
};