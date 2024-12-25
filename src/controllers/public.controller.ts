import { Request, Response } from "express";
import { BaseController } from "./base.controller";

export class PublicController extends BaseController {
    name = 'PublicController';
    path: string = '';

    constructor(path = 'public') {
        super();
        this.path = path;

        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.delete = this.delete.bind(this);
    }

    public getAll(_: Request, response: Response) {
        response.json({status: 200, data: { path: '/public' }, message: 'you request on server node'});
    }

    public getOne(request: Request, response: Response): void {
        response.json({
            status: 200,
            data: {
                reqId: request.params.id,
            },
            message: 'you request on server node',
        });
    }

    public delete(request: Request, response: Response): void {
        response.json({
            status: 200,
            data: {
                reqId: request.params.id,
            },
            message: 'you request on server node',
        });
    }

    public getPath(): string {
        return this.path;
    }
}