import { OutgoingHttpHeaders } from "http2";
import * as fs from "fs";
import { IStreamService } from "../interface/IService.interface";

export class StreamService implements IStreamService {
    name = 'StreamService';
    constructor() {}

    headersForDownload(
        title: string,
        sizeFile: string,
    ): Partial<OutgoingHttpHeaders> {
        const headers = {
            'Accept-Ranges': 'bytes',
            'Content-disposition': `attachement; filename=${title}`,
            'Content-Length': sizeFile,
            'Content-Type': 'audio/mpeg',
            'Cache-Control': 'public, max-age=0',
        };

        return headers;
    }

    getHeadersAndReadStream(
        filename: string,
        headerRange: string,
        sizeFile: string,
        contentType: string = "audio/mpeg",
    ): [Partial<OutgoingHttpHeaders>, fs.ReadStream] {
        const range = headerRange;
        const [partStart, partEnd] = range.replace(/bytes=/, '').split('-');
        const headers = {
            "Accept-Ranges": 'bytes',
            "Content-Type": contentType,
            'Cache-Control': 'public, max-age=0',
        } as Partial<OutgoingHttpHeaders>;

        const start = parseInt(partStart, 10);
        let end = 0;
        
        if (partEnd && partEnd >= sizeFile)
            end = parseInt(sizeFile) - 1;
        else if (partEnd && partEnd < sizeFile)
            end = parseInt(partEnd);
        else
            end = start + 10 ** 6;
        
        const chunkSize = end - start + 1;
        const audioStream = fs.createReadStream(filename, {start, end});
        
        headers['Content-Range'] = `bytes ${start}-${end}/${sizeFile.toString()}`;
        headers['Content-Length'] = chunkSize.toString();

        return [headers, audioStream];
    }
}