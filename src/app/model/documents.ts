import { Byte } from "@angular/compiler/src/util";

export interface documents {
  id:number;
  file:Byte[];
  filename:string;

  fileUri:string;
}
