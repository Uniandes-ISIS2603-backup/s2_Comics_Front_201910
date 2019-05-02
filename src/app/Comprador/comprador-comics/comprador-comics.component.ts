import {Component, Input, OnInit, ViewContainerRef} from "@angular/core";
import {CompradorService} from "../comprador.service";
import {ActivatedRoute} from "@angular/router";
import {Comic} from "../../Comic/Comic";
import {log} from "util";
import {ModalDialogService, SimpleModalComponent} from "ngx-modal-dialog";

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
                private route: ActivatedRoute,
                private viewRef: ViewContainerRef,
                private modalDialogService: ModalDialogService)
    {

    }

    /**
     *
     */
    @Input() compradorComics: Comic[];

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
        this.getComics();
    }
}