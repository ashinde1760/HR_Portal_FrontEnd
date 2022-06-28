import { Byte } from "@angular/compiler/src/util";

export interface Template{

    id?:number;
    file?:Byte[];
    fileUri?:string;
    filename?:string;
}