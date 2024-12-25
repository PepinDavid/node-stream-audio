import { Request, Response } from "express";
import { BaseController } from "./base.controller";

export class FilesController extends BaseController {
    name = 'FilesController';
    path: string = '';

    constructor(path = 'files') {
        super();
        this.path = path;

        this.getAll = this.getAll.bind(this);
        this.post = this.post.bind(this);
    }

    getPath(): string {
        return this.path;
    }

    getAll(_: Request, response: Response): void {
        response.json({status: 200, data: { path: '/files' }, message: 'you request on server node'});
    }

    async post(request: Request, response: Response): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let sampleFile: any;
        let uploadPath: string;

        if (!request.files || !Object.keys(request.files).length)
            response.status(400).json({message: 'No files were uploaded'});

        for (const k in request.files) {
            sampleFile = request.files[k];
            uploadPath = `${__dirname}/ressources/static/assets/uploads/${sampleFile?.name}`;

            try {
                await sampleFile.mv(uploadPath);
    
                response.status(201).json({message: 'File uploaded!'});
            } catch (error) {
                response.status(500).json({message: error});
            }
        }
        
    }
}