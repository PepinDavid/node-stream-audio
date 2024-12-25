import { Request, Response } from "express";
import { BaseController } from "./base.controller";

export class TestController extends BaseController {
    name = 'TestController';
    path: string = '';

    constructor(path = 'test') {
        super();
        this.path = path;

        this.getAll = this.getAll.bind(this);
    }

    getPath(): string {
        return this.path;
    }

    getAll(request: Request, response: Response): void {
        response.json({status: 200, data: { path: '/test' }, message: 'you request on server node'});
    }
}