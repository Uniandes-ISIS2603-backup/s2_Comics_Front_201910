import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';

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

  comics: Comic[] = new Array();

  categoriasNombre: string[] = ['AVENTURA_ACCION','ARTE_ILUSTRACION','COMEDIA','ENCICLOPEDIA_DOCUMENTAL','DRAMA','EROTIQUE',
                                'FANTASTICO','NOVELA_GRAFICA','HEROICO_FANTASIA_MAGIA','HISTORICO','HUMOR','DRAMA','AMOR_AMISTAD',
                                'POLAR_THRILLER','CIENCIA_FICCION','DEPORTE','VIEJO_OESTE'];
  categoriasElegidas: boolean[] = [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true];
  minPrice: number = 0;
  maxPrice: number = 500;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return 'Min: $' + value;
        case LabelType.High:
          return 'Max: $' + value;
        default:
          return '$' + value;
      }
    }
  };

  constructor(private comicService: ComicService, private compradorService: CompradorService, 
              private router: Router, private viewRef: ViewContainerRef, 
              private modalDialogService: ModalDialogService) { }

  getComics(): void {
    console.log("In get comics");
    this.comicService.getComics()
      .subscribe(comicArr => {
        let temp: Comic[] = comicArr;
        temp.forEach(c => {
          if(c.precio <= this.maxPrice && c.precio >= this.minPrice){
            for(let i = 0 ; i < this.categoriasNombre.length ; ++i){
              if(c.tema == this.categoriasNombre[i] && this.categoriasElegidas[i]){
                this.comics.push(c);
                break;
              }
            }
          }
        });
      });
  }

    addComic(idComic:number) : void
    {
        // console.log(idComic);
        if(localStorage.getItem('user') == null)
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
                                buttonClass: 'btn btn-outline-info',
                                onAction: () => true
                            }
                        ]
                    });
            }, err =>
            {
                this.modalDialogService.openDialog(this.viewRef,
                    {
                        title: 'Error',
                        childComponent: SimpleModalComponent,
                        data: {text: err},
                        actionButtons: [{
                            text: 'ok',
                            buttonClass: 'btn btn-outline-info',
                            onAction: () => true
                        }]
                    });
            });
        }
    }

  deseleccionar(){
    for(let cat of this.categoriasElegidas)
      cat = false;
  }

  search(){

  }

  ngOnInit() {
    this.getComics();
  }
}