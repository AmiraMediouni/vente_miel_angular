import { FileHandle } from "./file-handle.model";

export interface Produit{
    id:number,
    nom:string,
    description:string,
    quantite:number,
    prix:number,
    date_ajout:string,
    type:string,
    texture:string,
    imageProduit:FileHandle[];
}