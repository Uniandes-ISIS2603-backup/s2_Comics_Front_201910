import { Vendedor } from "../vendedor/vendedor";

export class Comic{
 
    id: number;

    nombre: string;

    autor: string;

    anoSalida: number;

    perteneceColeccion: boolean;

    perteneceSerie: boolean;

    precio: number;

    temaGlobal: String;

    venta: boolean;

    informacion: string;

    vendedor: Vendedor;
}