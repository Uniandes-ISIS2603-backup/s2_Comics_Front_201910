import {Comprador} from './comprador';
import { OrdenPedidoModule } from '../orden-pedido/orden-pedido.module';
import { ComicDeseoModule } from '../ComicDeseo/comicDeseo.module';

/**
 * Clase que representa el DetailDTO de comprador
 */
export class CompradorDetail extends Comprador
{
    /**
     * Objeto que reresenta las ordenes del comprador.
     */
    ordenes: OrdenPedidoModule[];

    /**
     * Objeto que representa los comics deseo del comprador
     */
    comicsDeseo: ComicDeseoModule[];
}