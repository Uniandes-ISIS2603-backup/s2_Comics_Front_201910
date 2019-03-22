import {Comprador} from './comprador';
import { OrdenPedidoComponentComponent } from '../OrdenPedido/orden-pedido-module/orden-pedido-component/orden-pedido-component.component';

/**
 * Clase que representa el DetailDTO de comprador
 */
export class CompradorDetail extends Comprador
{
    /**
     * Objeto que reresenta las ordenes del comprador.
     */
    ordenes: OrdenPedidoComponentComponent[];
}