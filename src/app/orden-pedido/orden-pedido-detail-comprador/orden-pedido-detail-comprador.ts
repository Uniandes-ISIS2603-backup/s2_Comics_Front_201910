import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrdenPedidoService } from "../orden-pedido.service";
import {  OrdenPedido} from "../OrdenPedido";

@Component({
    selector: 'app-orden-pedido-detail-comprador',
    templateUrl: './orden-pedido-detail-comprador.html',
    styleUrls: ['./orden-pedido-detail-comprador.css']
  })
  /**
 * Clase que representa la ordenPedidoDetail.
 */
  export class OrdenPedidoDetailComprador implements OnInit {
  
    /**
     * 
     * @param route 
     * @param service 
     */
    constructor(
        private route:ActivatedRoute,
        private service: OrdenPedidoService
    )
    {

    }

    /**
     * La ordenPedido.
     */
    ordenPedidoId:OrdenPedido;

    /**
     * El  id de la ordenPedido que viene de la ruta de acceso.
     */


   id:number;

    /**
     * Método que obtiene la ordenPedido cuyos detalles queremos mostrar.
     */
    getOrdenPedidoId():void
    {
        this.service.getOrdenPedidoId(this.id)
        .subscribe(ordenPedidoId => 
            {
                this.ordenPedidoId = ordenPedidoId;
            });
    }

    /**
    * This function updates the ordenPedido
    */
   updateOrdenPedido(): void {

    alert("yeiii estoy llegando")
    this.service.updateOrdenPedido(this.ordenPedidoId)
        .subscribe(() => {
            
            });
}

deleteOrdenPedido(): void {
     this.service.deleteOrdenPedido(this.ordenPedidoId.id).subscribe(() => {                 
        alert('se elimino la OrdenPedido'); });
}

    /**
     * Se utiliza este metodo para inicialiazr el componente
     * Se necestia crear la ordenPedido con eso no se tiene como indefinido.
     */
    ngOnInit()
    {
        this.id = +this.route.snapshot.paramMap.get('id');
        if(this.id)
        {
            this.getOrdenPedidoId();
        }
    }
}
