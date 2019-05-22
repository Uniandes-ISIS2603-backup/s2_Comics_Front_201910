import { Vendedor } from "../vendedor/vendedor";

export class Comic{ 
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

  vendedor: Vendedor;

   getVendedor(): Vendedor{
    return this.vendedor;
  }
  
}