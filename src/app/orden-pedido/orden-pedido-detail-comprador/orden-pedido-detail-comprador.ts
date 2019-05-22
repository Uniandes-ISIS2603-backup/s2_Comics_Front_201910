import { Component, OnInit, Input, ViewContainerRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrdenPedidoService } from "../orden-pedido.service";
import {  OrdenPedido} from "../OrdenPedido";
import {ToastrService} from 'ngx-toastr';
import {CompradorService} from '../../Comprador/comprador.service'
import { Comprador } from "../../Comprador/comprador";

import {ModalDialogService, SimpleModalComponent} from "ngx-modal-dialog";

/// <reference path="smoke.js"/>

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
     *  @param modalDialogService
     *@param viewRef

     * @param route
     * @param service
     *  @param toastrService The toastr to show messages to the user

     */
    constructor(
        private route:ActivatedRoute,
        private service: OrdenPedidoService,
        private toastrService: ToastrService,
        private viewRef: ViewContainerRef,
        private modalDialogService: ModalDialogService

    )
    {

    }

    /**
     * La ordenPedido.
     */
    ordenPedidoId:OrdenPedido;

    compradorService:CompradorService;

    comprador :Comprador;
    /**
     * El  id de la ordenPedido que viene de la ruta de acceso.
     */

    idComprador:String;
    err:String;
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


        this.service.updateOrdenPedido(this.ordenPedidoId)
            .subscribe(ordenPedido =>{} , err => {
                this.toastrService.error(err, 'Error');
                alert(err);

            });

    }

    deleteOrdenPedido(): void {
        this.modalDialogService.openDialog(this.viewRef,
            {
                title: 'Eliminar un ordenPedido',
                childComponent: SimpleModalComponent,
                data: {text: 'Está seguro de querer eliminar la ordenPedido?'},
                actionButtons: [
                    {
                        text: 'Si',
                        buttonClass: 'btn btn-danger',
                        onAction: () =>
                        {
                            this.service.deleteOrdenPedido(this.ordenPedidoId.id).subscribe(() => {
                                    alert('se elimino la OrdenPedido')},
                                err =>
                                {
                                    alert("Error eliminado la ordenPedido" + err);
                                });
                            return true;
                        }
                    },
                    {text: 'No', onAction: () => true}
                ]
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
            this.getOrdenPedidoId();


        }

    }

}
