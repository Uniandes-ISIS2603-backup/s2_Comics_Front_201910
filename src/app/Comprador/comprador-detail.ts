import {Comprador} from './comprador';
import { OrdenPedidoModuleModule } from '../OrdenPedido/orden-pedido-module/orden-pedido-module.module';
import { ComicDeseoModule } from '../ComicDeseo/comicDeseo.module';

/**
 * Clase que representa el DetailDTO de comprador
 */
export class CompradorDetail extends Comprador
{
    /**
     * Objeto que reresenta las ordenes del comprador.
     */
    ordenes: OrdenPedidoModuleModule[];

    /**
     * Objeto que representa los comics deseo del comprador
     */
    comicsDeseo: ComicDeseoModule[];
}