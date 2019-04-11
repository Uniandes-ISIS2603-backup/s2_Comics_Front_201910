import {Vendedor} from "../vendedor/vendedor";
import {Comic} from "../comic/comic";
import {Comprador} from "../Comprador/comprador";
    
export class OrdenPedido {

    /**
     * identificacdor de la orden de pedido
     */
    id: Number ;
      /**
     * comentario de rechazo
     */
    comentario: String;


    tarjetaCredito: String ;
    
    /**
     * estado de la orden, es una enumeracion, puede estar 
     * 1. en espera: se genero la orden y esta esperando la confirmacion del vendedor
     * 2. aceptado: el vendedor acepto la orden 
     * 3. rechazado: el vendedor rechazo la orden
     * 4. en proceso: el vendedor  ya envio el comic fisico y se espera ña confirmacion del comprador
     * 5. compelatado: se termino la transaccion, se entrego el producto
     */
    estado: String ;
    /**
     * Alias del comprador que expide la orden de pedido
     */
    comprador: Comprador;
    /**
     * Alias del vendedor al cual esta dirigida la orden
     */
    vendedor: Vendedor;
    
    /**
     * Nombre del comic que se va a comprar o intercambiar
     */
     comic: Comic;
     /**
     * fecha estimada de enrega
     */
    fechaEstimadaEntrega: String ;
    
    
    /**
     * Nombre comic que se va a intercambiar
     */
     trueque: Comic;
    
/**
 * numero de compras realizadas por el comprador asociado a la orden
 */
    numeroCompras: Number;
    
     /**
     * Cambia el esatdo de una ordenPedido
     * @param estado El estado que será renovado
     */
    public setEstado(estado2:string):void
    {
        this.estado = estado2;
    }

    public setTarjeta(tarjeta:string):void
    {
        this.tarjetaCredito = tarjeta;
    }


    public getId():Number
    {
        return this.id;
    }

  
      
  
}