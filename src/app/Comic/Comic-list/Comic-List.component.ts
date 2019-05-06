import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';

import { Comic } from '../Comic';
import { ComicService } from '../comic.service';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.css']
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

  constructor(private comicService: ComicService) { }

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