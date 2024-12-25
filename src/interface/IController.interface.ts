import { NextFunction, Request, Response } from "express";
import { IMemoService } from "./IService.interface";

interface IControllerGeneric {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new <T extends any[]>(...args: T): IControllerInstance;
}

interface IController {
    new (services?: IMemoService, path?: string): IControllerInstance;
}

interface IControllerInstance {
    path: string;
    getAll(request: Request, response: Response, next?: NextFunction): void;
    getOne?(request: Request, response: Response, next?: NextFunction): void;
    post?(request: Request, response: Response, next?: NextFunction): void;
    update?(request: Request, response: Response, next?: NextFunction): void;
    delete?(request: Request, response: Response, next?: NextFunction): void;
}

export type TController = IControllerInstance;

interface IMemoController {
    [name: string]: IControllerInstance;
}

export {
    IControllerGeneric,
    IController,
    IControllerInstance,
    IMemoController,
}