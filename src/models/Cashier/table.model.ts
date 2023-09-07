import { Club } from "../club.model" 

export interface Table {
    id: number,
    number: number,
    estado: boolean,
    createdDate: string,
    updatedDate: string,
    club: Club
    
}
//{
//    "id": 1,
//    "numeroMesa": 10695,
//    "estado": false,
//    "createdDate": "2023-04-02T19:26:56Z",
//    "updatedDate": "2023-04-02T20:08:23Z",
//    "productoMesas": null,
//    "club": null
//}