//import { Vendedor } from "../vendedor/vendedor";
import { Comic } from "./Comic";

export class ComicDetail{ 
  id: number;

  nombre: string;

  autor: string;

  anioSalida: number;

  perteneceColeccion: boolean;

  perteneceSerie: boolean;

  precio: number;

  tema: String;

  enVenta: boolean;

  informacion: string;

  imagen: string;

  //vendedor: Vendedor;

  comicsTrueque: Comic[];
}