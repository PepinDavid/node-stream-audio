import { TFileService, TStreamService } from "../interface/IService.interface";
import { FilesService } from "./files.service";
import { ServiceFactoryRegistry } from "./serviceFactory";
import { StreamService } from "./stream.service";

registerService();

export function registerService() {
    ServiceFactoryRegistry.registerService<TFileService, [string]>(FilesService);
    ServiceFactoryRegistry.registerService<TStreamService, []>(StreamService);
}