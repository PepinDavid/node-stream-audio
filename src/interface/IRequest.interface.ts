import { Request } from "express";
import { Multer } from "multer";

export interface IRequest extends Request {
    multer: Multer
}