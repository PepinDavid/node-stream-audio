import { ReadStream, Stats } from "fs";
import { OutgoingHttpHeaders } from "http2";

export interface IServiceInstance {
    name: string;
}

export type TFileWithStat = {
    filename: string,
    stats: Stats,
};

export interface IFileService extends IServiceInstance {
    directory: string;
    getFiles(): Promise<string[]>;
    getFilesStat(files: string | string[]): Promise<TFileWithStat[]>; 
}

export interface IStreamService {
    headersForDownload(
        title: string,
        sizeFile: string,
    ): Partial<OutgoingHttpHeaders>

    getHeadersAndReadStream(
        filename: string,
        headerRange: string,
        sizeFile: string,
        contentType?: string,
    ): [Partial<OutgoingHttpHeaders>, ReadStream] 
}

export type TFileService = IFileService;
export type TStreamService = IStreamService;

export interface IMemoService {
    [name: string]: IServiceInstance;
}
