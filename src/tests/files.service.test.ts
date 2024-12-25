import { FilesService } from "../services/files.service";

describe('FilesService', () => {
    let filesService: FilesService;

    test('can be instanciate', () => {
        filesService = new FilesService();
    
        expect(filesService).toBeTruthy();
    })
})