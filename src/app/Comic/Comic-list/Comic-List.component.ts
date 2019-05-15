import {Component, OnInit, ViewContainerRef} from '@angular/core';

import { Comic } from '../Comic';
import { ComicService } from '../comic.service';
import {CompradorService} from "../../Comprador/comprador.service";
import {Router} from "@angular/router";
import {ModalDialogService, SimpleModalComponent} from "ngx-modal-dialog";

@Component({
    selector: 'app-comic-list',
    templateUrl: './Comic-list.component.html',
    styleUrls: ['./Comic-list.component.css']
})
export class ComicListComponent implements OnInit {

    comics: Comic[];

    constructor(private comicService: ComicService,
                private compradorService: CompradorService,
                private router: Router,
                private viewRef: ViewContainerRef,
                private modalDialogService: ModalDialogService) { }

    getComics(): void {
        this.comicService.getComics()
            .subscribe(c => {
                this.comics = c;
            });
    }

    addComic(idComic:number) : void
    {
        // console.log(idComic);
        if(!localStorage.getItem('user'))
        {
            this.router.navigateByUrl('/form');
        }
        else
        {
            var x = localStorage.getItem('user');
            var y = +x;
            this.compradorService.addComicCarrito(y, idComic).subscribe(comic =>
            {
                // console.log("Autor: "+comic.autor)
                this.modalDialogService.openDialog(this.viewRef,
                    {
                        title:'Comic Añadido',
                        childComponent: SimpleModalComponent,
                        data: {text: 'El comic: ' + comic.nombre + ' ha sido agregado con exito'},
                        actionButtons: [
                            {
                                text: 'Ok',
                                buttonClass: 'btn btn-info',
                                onAction: () => true
                            }
                        ]
                    });
            }, err =>
            {

            });
        }
    }

    ngOnInit()
    {
        document.body.style.opacity='visible';
        this.getComics();
    }
}