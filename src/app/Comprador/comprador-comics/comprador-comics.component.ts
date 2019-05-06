import {Component, Input, OnInit, ViewContainerRef} from "@angular/core";
import {CompradorService} from "../comprador.service";
import {ActivatedRoute} from "@angular/router";
import {Comic} from "../../Comic/Comic";
import {log} from "util";
import {ModalDialogService, SimpleModalComponent} from "ngx-modal-dialog";
import { Comprador } from "../comprador";
import { Observable } from "rxjs";
import { CompradorDetail } from "../comprador-detail";
import { OrdenPedido } from "../../orden-pedido/OrdenPedido";
import { Vendedor } from "../../vendedor/vendedor";
import {VendedorService} from "../../vendedor/vendedor.service";
import {OrdenPedidoService} from "../../orden-pedido/orden-pedido.service";

@Component({
    selector: 'app-comprador-comics',
    templateUrl: 'comprador-comics.component.html',
    styleUrls: ['comprador-comics.component.css']
})

export class CompradorComicsListComponent implements  OnInit
{
    /**
     *
     * @param compradorService
     * @param route
     * @param viewRef
     * @param modalDialogService
     */
    constructor(private compradorService: CompradorService,
        private vendedorService: VendedorService,
        private ordenPedidoService:OrdenPedidoService,
      
                private route: ActivatedRoute,
                private viewRef: ViewContainerRef,
                private modalDialogService: ModalDialogService)
    {

    }

    /**
     *
     */
    @Input() compradorComics: Comic[];

    ordenPedido:OrdenPedido;
    @Input() vendedorComics: Comic[];
    @Input() comprador:Comprador;
    @Input() vendedor:Vendedor;

    /**
     *
     */
    getComics(): void
    {
        this.compradorService.getCarro(this.compradorId).subscribe(lista=>
        {
            this.compradorComics = lista;
        });
    }


    getComprador():void
    {
        this.compradorService.getCompradorDetail(this.compradorId).subscribe(comprador=>
            {
                this.comprador = comprador;
            });
          
    }

    getComicsComprador(): void
    {
        
        

            this.vendedorService.getComicsVendedor(this.compradorId).subscribe(lista=>
            {
                this.vendedorComics = lista;
            });
    }

    createOrdenPedido():void
    {
        alert("almenos llego al metodo");
        for (let i in this.compradorComics) {
           
           this.ordenPedido = new OrdenPedido();
          this.ordenPedido.comic=this.compradorComics[i];
          alert( "comic" + this.ordenPedido.comic.autor);
          
          this.ordenPedido.comprador=this.comprador;
         
          this.ordenPedido.estado='EN_ESPERA';
         
          this.ordenPedido.vendedor= this.compradorComics[i].vendedor;
          alert("ojala"+ this.compradorComics[i].vendedor.alias);
          
          alert("se intentara crear una orden");
        this.ordenPedidoService.createOrdenPedido(this.ordenPedido).subscribe(ordenPedido=>
            {
                this.ordenPedido = ordenPedido;
            });
        }

    }

    /**
     *
     * @param comicId
     */
    deleteComic(comicId): void
    {
        this.modalDialogService.openDialog(this.viewRef,
            {
                title: 'Eliminar un comic',
                childComponent: SimpleModalComponent,
                data: {text: 'Está seguro de querer eliminar el comic de su carrito?'},
                actionButtons: [
                    {
                        text: 'Si',
                        buttonClass: 'btn btn-danger',
                        onAction: () =>
                        {
                            this.compradorService.deleteComic(this.compradorId, comicId).subscribe(() =>
                            {
                                this.ngOnInit();
                            }, err =>
                            {
                                alert("Error eliminado el comic del carrito");
                            });
                            return true;
                        }
                    },
                    {text: 'No', onAction: () => true}
                ]
            });
    }

     

    /**
     *
     */
    compradorId : number;

    /**
     *
     */
    ngOnInit(): void
    {
        this.compradorId = +this.route.snapshot.paramMap.get('id');
        // console.log("Este es el id del comprador: " + this.compradorId);
       this.getComprador();
        this.getComics();
        this.getComicsComprador();
    }
}