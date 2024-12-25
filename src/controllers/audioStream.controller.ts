import { Request, Response } from "express";
import { IFileService, IStreamService } from "../interface/IService.interface";
import * as fs from 'fs';
import { BaseController } from "./base.controller";

export class AudioStreamController extends BaseController {
    name = 'AudioStreamController';
    path: string;

    constructor(
        private readonly serviceFile: IFileService,
        private readonly serviceStream: IStreamService,
        path = '/audios',
    ) {
        super();
        this.path = path;

        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
    }

    async getAll(_: Request, response: Response): Promise<void> {
        try {
            const files = await this.serviceFile.getFiles();

            response.status(200).json({files, message: 'getAll songs'});
        } catch(error: unknown) {
            throw new Error(`Error: ${error}`);
        }
    }

    async getOne(request: Request, response: Response): Promise<void> {
        console.log('audioStream GetOne')
        const fileQueryParam = request.query.file;
        const title = request.params.id;
        const range = request.headers.range;

        try {
            const [file] = await this.serviceFile.getFilesStat(title);
            const sizeFile = file.stats.size.toString();
            console.log(`fileQueryParam: ${fileQueryParam}`)
            if (fileQueryParam === 'stream') {
                if (!range || range == undefined) {
                    const headers = {
                        'Content-Length': sizeFile,
                        'Content-Type': "audio/mpeg",
                    };

                    response.writeHead(200, headers);
                    fs.createReadStream(file.filename).pipe(response);
                } else {
                    const [headers, audioStream] = this.serviceStream.getHeadersAndReadStream(
                        file.filename,
                        range,
                        sizeFile,
                    );

                    response.writeHead(206, headers);
                    audioStream.pipe(response, {end: true});
                }
            } else {
                const headers = this.serviceStream.headersForDownload(title, sizeFile);
                
                response.writeHead(200, headers);
                fs.createReadStream(file.filename).pipe(response);
            }
        } catch(error: unknown) {
            console.log(error)
            throw new Error(`Error: ${error}`);
        }
    }
}