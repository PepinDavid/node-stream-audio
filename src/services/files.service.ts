import fs, { Stats } from 'fs';
import * as path from 'path';
import { IFileService, TFileWithStat } from '../interface/IService.interface';
import { config } from '../config/config';

export class FilesService implements IFileService {
    name = 'FilesService';
    directory: string;

    constructor(directory: string = config.musicFolder) {
        this.directory = directory;
    }

    async getFiles(): Promise<string[]> {
        let files: string[] = [];

        function listFiles(directory: string): Promise<string[]> {
            return new Promise((resolve, reject) => {
                fs.readdir(directory, (err, files) => {
                    if (err)
                        reject(`list files error: ${err}`);

                    resolve(files);
                });
            });
        }

        try {
            files = await listFiles(this.directory)
        } catch(err) {
            console.error(err);
        }

        return files;
    }

    async getFilesStat(files: string | string[]): Promise<TFileWithStat[]> {
        if (typeof files === 'string')
            files = [files];
        
        let filesWithStat: Promise<TFileWithStat[]> = Promise.resolve([]);

        try {
            const promises = await files.map(async (file) => {
                const filePath = path.join(this.directory, file);
                const stats = await fsStat(filePath);
                
                return {filename: `${this.directory}/${file}`, stats } as TFileWithStat;
            });

            filesWithStat = Promise.all(promises);
        } catch(err) {
            console.error(err);
        }

        return filesWithStat;

        async function fsStat(filePath: string): Promise<Stats> {
            return await new Promise((resolve, reject) => {
                fs.stat(filePath, (err: NodeJS.ErrnoException | null, stats: Stats) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(stats);
                })
            });
        }
    }
}