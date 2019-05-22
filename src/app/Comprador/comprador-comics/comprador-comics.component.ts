import {Component, Input, OnInit, ViewContainerRef} from "@angular/core";
import {CompradorService} from "../comprador.service";
import {ActivatedRoute} from "@angular/router";
import {Comic} from "../../Comic/Comic";
import {log} from "util";
import {ModalDialogService, SimpleModalComponent} from "ngx-modal-dialog";
import { Comprador } from "../comprador";
import { OrdenPedido } from "../../orden-pedido/OrdenPedido";
import { Vendedor } from "../../vendedor/vendedor";
import {VendedorService} from "../../vendedor/vendedor.service";
import {OrdenPedidoService} from "../../orden-pedido/orden-pedido.service";
import {ComicService} from "../../Comic/comic.service";

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
                private comicService: ComicService,

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
    seleccion:any;
    tarjeta:String;

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
        for (let i in this.compradorComics) {

            this.ordenPedido = new OrdenPedido();
            this.ordenPedido.id=11;
            this.ordenPedido.comentario="comentario";
            this.ordenPedido.estado='EN_ESPERA';
           this.ordenPedido.fechaEstimadaEntrega="2018/05/01";
           this.ordenPedido.numeroComprasComprador= 0;
           this.ordenPedido.tarjetaCredito=this.tarjeta;
           this.ordenPedido.comic=this.compradorComics[i];
          
          
           if(!this.ordenPedido.comic.enVenta)
           {
            this.ordenPedido.trueque = this.vendedorComics[this.seleccion];
          }

          
          
          this.ordenPedido.comprador=this.comprador;
          
          this.ordenPedido.vendedor= this.compradorComics[i].vendedor;
          
           this.ordenPedidoService.createOrdenPedido(this.ordenPedido).subscribe(ordenPedido=>
            {
                this.ordenPedido = ordenPedido;
            });
        alert("se creo la OrdenPedido")
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