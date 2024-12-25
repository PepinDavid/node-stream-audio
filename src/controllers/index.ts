import { AudioStreamController } from "./audioStream.controller";
import { ControllerFactory } from "./controllerFactory";
import { FilesController } from "./files.controller";
import { TestController } from "./test.controller";
import { TFileService, TStreamService } from "../interface/IService.interface"
import { PublicController } from "./public.controller";

registerController();

export function registerController() {
    ControllerFactory.registerController<PublicController, [string]>(PublicController);
    ControllerFactory.registerController<TestController, [string]>(TestController);
    ControllerFactory.registerController<FilesController, [string]>(FilesController);
    ControllerFactory.registerController<
        AudioStreamController,
        [
            TFileService,
            TStreamService,
            string,
        ]
    >(AudioStreamController);
}