import { Request, RequestHandler, Response } from "express";
import { IControllerInstance } from "../interface/IController.interface";

export abstract class BaseController implements IControllerInstance {
    abstract path: string;
    middlewares: RequestHandler [] = [];
    name = 'BaseController';

    abstract getAll(request: Request, response: Response): void;
}