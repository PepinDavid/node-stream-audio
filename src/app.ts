import { Router, Application } from "express";
import * as dotenv from "dotenv";
import { IApplication } from "./interface/IApp.interface";
import { ControllerFactory } from "./controllers/controllerFactory";
import { ServiceFactoryRegistry } from "./services/serviceFactory";
import { IControllerInstance } from "./interface/IController.interface";

dotenv.config();

export function createApp(app: Application, object: IApplication): Application {
    const routeMapping:  {[key: string]: 'get' | 'post' | 'put' | 'delete'} = {
        "getAll": 'get',
        "getOne": 'get',
        "post": 'post',
        "update": 'put',
        "delete": 'delete',
    };
    const EMethod: {[key: string]: string} = {
        "getAll": "/",
        "getOne": "/:id",
        "post": "/",
        "update": "/:id",
        "delete": "/:id",
    };

    if (!object.app)
        throw new Error('object not started by app key');

    const { middlewares, rootRoute } = object.app;

    if (middlewares.length)
        app.use(middlewares);
    
    const rootRouterApp = Router();

    for (const route of rootRoute.routes) {
        const router = Router();
        const { path, controller, middlewares, services } = route;

        if (middlewares?.length)
            router.use(middlewares);

        const servicesArray: unknown[] = [];

        if (services?.length) {
            for (const service of services) {
                servicesArray.push(ServiceFactoryRegistry.createInstance(service));
            }
        }

        const controllerInstance = ControllerFactory.createInstance<IControllerInstance>(
            controller,
            ...servicesArray,
        );

        const keys: string[] = Object.keys(controllerInstance);

        for(const key of keys) {
            const k = key as keyof IControllerInstance;


            if (typeof controllerInstance[k] === 'function') {
                const routeType = routeMapping[k];

                router[routeType](`${EMethod[k]}`, controllerInstance[k].bind(controllerInstance));
            }
        }

        rootRouterApp.use(`/${path}`, router);
    }

    app.use(`/${rootRoute.path}`, rootRouterApp);
    
    return app;
}