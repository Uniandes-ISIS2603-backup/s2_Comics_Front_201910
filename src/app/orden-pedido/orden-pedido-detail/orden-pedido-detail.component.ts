import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrdenPedidoService } from "../orden-pedido.service";
import {  OrdenPedidoDetail} from "../OrdenPedidoDetail";

@Component({
    selector: 'app-orden-pedido-detail',
    templateUrl: './orden-pedido-detail.component.html',
    styleUrls: ['./orden-pedido-detail.component.css']
  })
  /**
 * Clase que representa la ordenPedidoDetail.
 */
  export class OrdenPedidoDetailComponent implements OnInit {
  
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
    ordenPedidoDetail:OrdenPedidoDetail;

    /**
     * El  id de la ordenPedido que viene de la ruta de acceso.
     */
    id:number;

    /**
     * Método que obtiene la ordenPedido cuyos detalles queremos mostrar.
     */
    getOrdenPedidoDetail():void
    {
        this.service.getOrdenPedidoDetail(this.id)
        .subscribe(ordenPedidoDetail => 
            {
                this.ordenPedidoDetail = ordenPedidoDetail;
            });
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
            this.ordenPedidoDetail = new OrdenPedidoDetail();
            this.getOrdenPedidoDetail();
        }
    }
}
