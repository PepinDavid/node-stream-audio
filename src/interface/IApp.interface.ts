import { RequestHandler } from "express";

interface IRoute {
    path: string;
    controller: string;
    middlewares?: RequestHandler[];
    services?: string[];
}

interface IApplication {
    app: {
        middlewares: RequestHandler[];
        rootRoute: {
            path: string;
            routes: IRoute[]
        };
    }
}

export {
    IRoute,
    IApplication,
}