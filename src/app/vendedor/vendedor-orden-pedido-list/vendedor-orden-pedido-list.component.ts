import { Component, OnInit } from '@angular/core';
import { OrdenPedidoService } from '../../orden-pedido/orden-pedido.service';
import { Vendedor } from '../vendedor';
import { Comprador } from '../../Comprador/comprador';
import { CompradorService } from '../../Comprador/comprador.service';
import { VendedorService } from '../vendedor.service';
import { ActivatedRoute } from '@angular/router';
import {OrdenPedido} from "../../orden-pedido/OrdenPedido";


@Component({
    selector: 'vendedor-orden-pedido-list',
    templateUrl: './vendedor-orden-pedido-list.component.html',
    styleUrls: ['./vendedor-orden-pedido-list.component.css']
})
export class VendedorOrdenPedidoListComponent implements OnInit {


    /**
     * Constructor for the component
     * @param OrdenPedidoService The author's services provider
     */
    constructor(private ordenPedidoService: OrdenPedidoService ,
                private compradorService: CompradorService,
                private vendedorService: VendedorService ,
                private route: ActivatedRoute  ){
    }

    /**
     * The list of ordenesPedido which belong to the ComicStore
     */

    ordenesPedido: OrdenPedido[];

    ordenPedido: OrdenPedido;
    rol: String =localStorage.getItem("role");
    idComprador:Number;
    comprador: Comprador;
    aliasComprador: String;
    idVendedor:Number;
    vendedor: Vendedor;
    aliasVendedor: String;

    /**
     * Asks the service to update the list of ordenesPedido
     */
    getOrdenesPedido(): void {
        this.ordenPedidoService.getOrdenesPedido().subscribe(ordenesPedido => this.ordenesPedido = ordenesPedido);
    }

    /**
     * Creates a new book
     */
    createOrdenPedido(): OrdenPedido {
        this.ordenPedidoService.createOrdenPedido(this.ordenPedido)
            .subscribe(OrdenPedido => {
                this.ordenPedido.id = OrdenPedido.id;
            });
        return this.ordenPedido;
    }

    getOrdenesPedidoComprador():void{
        if(localStorage.getItem("role")=='ADMIN'){
            this.compradorService.getCompradorByAlias(this.aliasComprador).subscribe(comprador => this.comprador= comprador );
            this.idComprador=this.comprador.id;}
        this.ordenPedidoService.getOrdenesPedidoComprador(this.idComprador).subscribe(ordenesPedido => this.ordenesPedido = ordenesPedido)
    }
    getOrdenesPedidoVendedor():void{
        this.ordenPedidoService.getOrdenesPedidoVendedor(this.idVendedor).subscribe(ordenesPedido=>this.ordenesPedido=ordenesPedido)

    }
    updateOrdenPedido(): void {
        for(let i:number=0;i<this.ordenesPedido.length;i++){
            this.ordenPedidoService.updateOrdenPedido(this.ordenesPedido[i])
                .subscribe(() => {

                });
        }
    }
    /**
     * This will initialize the component by retrieving the list of ordenesPedido from the service
     * This method will be called when the component is created
     */
    ngOnInit() {
        this.idVendedor = +this.route.snapshot.paramMap.get('id');
        this.getOrdenesPedidoVendedor();



    }

}
