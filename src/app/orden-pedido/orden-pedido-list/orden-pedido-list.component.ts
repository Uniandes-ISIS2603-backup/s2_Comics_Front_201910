import { Component, OnInit } from '@angular/core';
import { OrdenPedidoService } from '../orden-pedido.service';
import { OrdenPedido } from '../ordenPedido';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Vendedor } from '../../vendedor/vendedor';
import { Comprador } from '../../Comprador/comprador';
import { CompradorService } from '../../Comprador/comprador.service';
import { VendedorService } from '../../vendedor/vendedor.service';
import { Alert } from 'selenium-webdriver';



@Component({
  selector: 'app-orden-pedido-list',
  templateUrl: './orden-pedido-list.component.html',
  styleUrls: ['./orden-pedido-list.component.css']
})
export class OrdenPedidoListComponent implements OnInit {

   
  /**
     * Constructor for the component
     * @param OrdenPedidoService The author's services provider
     */
    constructor(private ordenPedidoService: OrdenPedidoService ,
      private compradorService: CompradorService,
      private vendedorService: VendedorService   ){
        }
    
    /**
     * The list of ordenesPedido which belong to the ComicStore
     */
  
    estados: String[]= ['EN_ESPERA' ,'ACEPTADO','RECHAZADO','ENVIADO' ,'FINALIZADO'];
    categoriasElegidas: boolean[] = [true,true,true,true,true];
 
    ordenesPedido: OrdenPedido[];

    ordenPedido: OrdenPedido;
    rol: String =localStorage.getItem("role");
    idComprador:Number;
    comprador: Comprador;
    aliasComprador: String;
    idVendedor:Number;
    vendedor: Vendedor;
    aliasVendedor: String;
    ADMI:Boolean;
    

    /**
     * Asks the service to update the list of ordenesPedido
     */
    getOrdenesPedido(): void {
        this.ordenPedidoService.getOrdenesPedido().subscribe(ordenesPedido => this.ordenesPedido = ordenesPedido);
    }

    getOrdenesPedidoEstado(estado): void {
      this.ordenPedidoService.getOrdenesPedidoEstado(estado).subscribe(ordenesPedido => this.ordenesPedido = ordenesPedido)
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
  if(localStorage.getItem("role")=='ADMIN'){
    this.vendedorService.getVendedorByAlias(this.aliasVendedor).subscribe(vendedor => this.vendedor= vendedor );
    this.idVendedor=this.vendedor.id;}
  this.ordenPedidoService.getOrdenesPedidoVendedor(this.idVendedor).subscribe(ordenesPedido => this.ordenesPedido = ordenesPedido)
  }
    /**
     * This will initialize the component by retrieving the list of ordenesPedido from the service
     * This method will be called when the component is created
     */
    ngOnInit() {
      this.idComprador=parseInt(localStorage.getItem("user"));
     this.idVendedor=parseInt(localStorage.getItem("user"));
      
      if(localStorage.getItem("role")=='Comprador'){
      this.getOrdenesPedidoComprador();
       
      }
     if(localStorage.getItem("role")=='Vendedor') {
        this.getOrdenesPedidoVendedor(); 
      }
      if(localStorage.getItem("role")=='ADMIN') {
        this.getOrdenesPedido(); 
      }
    }

}
