import { Component, OnInit, Input, SystemJsNgModuleLoader } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrdenPedidoService } from "../orden-pedido.service";
import {  OrdenPedido} from "../OrdenPedido";
import { a } from "@angular/core/src/render3";
import { Services } from "@angular/core/src/view";

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
    ordenPedidoId:OrdenPedido;

    /**
     * El  id de la ordenPedido que viene de la ruta de acceso.
     */


 @Input()  id:number;

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

    deleteOrdenPedido(): void {
        
        buttonClass: 'btn btn-danger'
        if(this.ordenPedidoId.estado=="EN_ESPERA" ||this.ordenPedidoId.estado=="FINALIZADO" ){
          }
          else{
            alert('La ordenPedido debe estar en estado EN_ESPERA o FINALIZADO para poder ser eliminado')   
   
          }
        this.service.deleteOrdenPedido(this.id).subscribe(book => {
         
        
          alert('se borro la ordenPedido');}

);
}

actualizarEstadoOrden():void 
    {
        this.service.updateOrdenPedido(this.ordenPedidoId)
        .subscribe(() => {
              }); }


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
