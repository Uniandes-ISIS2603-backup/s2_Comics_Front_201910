import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrdenPedidoService } from "../orden-pedido.service";
import {  OrdenPedido} from "../OrdenPedido";

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

    enviado1:boolean;
   id:number;

    /**
     * Método que obtiene la ordenPedido cuyos detalles queremos mostrar.
     */
    getOrdenPedidoId():void
    {
        this.service.getOrdenPedidoId(this.id)
            .subscribe(ordenPedidoId =>
            {
                this.ordenPedidoId = ordenPedidoId;this.enviado(ordenPedidoId.estado);
            });
    }

    /**
     * This function updates the ordenPedido
     */
    updateOrdenPedido(): void {

    this.service.updateOrdenPedido(this.ordenPedidoId)
        .subscribe(() => {
            
            });
}
enviado(estado):void{
if(estado=="ENVIADO"){
this.enviado1=true;
}else{
this.enviado1=false;
}
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
