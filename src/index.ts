import express, { Application } from "express";
import cors from "cors";
import fileUploads from "express-fileupload";

import { createApp } from './app';
import { PublicController } from "./controllers/public.controller";
import { TestController } from "./controllers/test.controller";
import { FilesController } from "./controllers/files.controller";
import { AudioStreamController } from "./controllers/audioStream.controller";
import { FilesService } from "./services/files.service";
import { IApplication } from "./interface/IApp.interface";
import { StreamService } from "./services/stream.service";
import { registerService } from "./services";
import { registerController } from "./controllers";

const port = process.env.POST || 3000;
const corsOptions = {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Range', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
};

const app: Application = express();

const application: IApplication = {
    app: {
        middlewares: [
            cors(corsOptions),
            express.json({limit: '16mb'}),
            express.urlencoded({limit: '16mb', extended: true, parameterLimit: 5000}),
            fileUploads(),
        ],
        rootRoute: {
            path: 'api',
            routes: [
                {
                    path: 'public',
                    controller: PublicController.name,
                    middlewares: [],
                    services: [],
                },
                {
                    path: 'test',
                    controller: TestController.name,
                    middlewares: [],
                    services: [],
                },
                {
                    path: 'files',
                    controller: FilesController.name,
                    middlewares: [],
                    services: [],
                },
                {
                    path: 'audios',
                    controller: AudioStreamController.name,
                    middlewares: [],
                    services: [FilesService.name, StreamService.name],
                },
            ]
        },
    }
}

Promise.resolve(registerService())
.then(registerController)
.then(() => createApp(app, application))
.then(app => app.listen(port));
