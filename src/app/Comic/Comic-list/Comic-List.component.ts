import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';

import { Comic } from '../Comic';
import { ComicService } from '../comic.service';
import {CompradorService} from "../../Comprador/comprador.service";
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import {ModalDialogService, SimpleModalComponent} from "ngx-modal-dialog";

@Component({
    selector: 'app-comic-list',
    templateUrl: './Comic-list.component.html',
    styleUrls: ['./Comic-list.component.css']
})
export class ComicListComponent implements OnInit {

  cRoute: string = "C";
  pRoute: string = "P";
  sRoute: string = "S";

  comics: Comic[] = new Array();
  query: string;
  busq: string[] = new Array();
  searchQ: string = "";

  categoriasNombre: string[] = ['AVENTURA_ACCION','ARTE_ILUSTRACION','COMEDIA','ENCICLOPEDIA_DOCUMENTAL','DRAMA','EROTIQUE',
                                'FANTASTICO','NOVELA_GRAFICA','HEROICO_FANTASIA_MAGIA','HISTORICO','HUMOR','DRAMA','AMOR_AMISTAD',
                                'POLAR_THRILLER','CIENCIA_FICCION','DEPORTE','VIEJO_OESTE'];
  categoriasElegidas: boolean[] = [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true];
  minPrice: number = 0;
  maxPrice: number = 500;

  options: Options = {
    floor: this.minPrice,
    ceil: this.maxPrice,
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
              private modalDialogService: ModalDialogService,
              private route: ActivatedRoute) {}

  getComics(): void {
    this.comicService.getComics()
      .subscribe(comicArr => {
        let temp: Comic[] = comicArr;
        temp.forEach(c => {
          if(c.precio <= this.maxPrice && c.precio >= this.minPrice){
            for(let i = 0 ; i < this.categoriasNombre.length ; ++i){
              if(c.tema == this.categoriasNombre[i] && this.categoriasElegidas[i]){
                for(let j:number = 0 ; j < this.busq.length ; ++j){
                  if(c.nombre.toLowerCase().search(this.busq[j]) != -1 || c.autor.toLowerCase().search(this.busq[j]) != -1 || c.informacion.toLowerCase().search(this.busq[j]) != -1 ||
                     c.vendedor.nombre.toLowerCase().search(this.busq[j]) != -1 || c.vendedor.alias.toLowerCase().search(this.busq[j]) != -1){
                       this.comics.push(c);
                       break;
                     }
                }
                if(this.busq.length == 0)
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
        // console.log("In");
        if(localStorage.getItem('user') == null)
        {
          // console.log("In2");
            this.router.navigateByUrl('/form');
        }
        else
        {
          // console.log("In3");
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

  search(s:string){
    this.searchQ = s.replace("_"," ");
    this.busq = s.split("_");
    // console.log(this.busq);
  }

  filterCat(c:string){
    // console.log(c);
    for(let i:number = 0 ; i < c.length ; ++i)
      if(c.charAt(i) == '0')
        this.categoriasElegidas[i] = false;
  }

  changeCat(i:number){
    // console.log("changing cat");
    this.categoriasElegidas[i] = !this.categoriasElegidas[i];
  }

  goQuery(){
    let ans:string = "";
    if(this.searchQ.length > 0){
      this.searchQ = this.searchQ.replace(" ", "_").toLowerCase();
      ans += this.sRoute + this.searchQ;
    }
    if(this.minPrice != 0 || this.maxPrice != 500)
      ans += this.pRoute+this.minPrice+"_"+this.maxPrice;
    for(let i:number = 0 ; i < this.categoriasElegidas.length ; ++i){
      if(!this.categoriasElegidas[i]){
        ans += this.cRoute;
        for(let j = 0 ; j < this.categoriasElegidas.length ; ++j){
          // console.log("cat in " + j + this.categoriasElegidas[j]);
          if(this.categoriasElegidas[j])
            ans += "1";
          else
            ans += "0";
        }
        break;
      }
    }

    if(ans.length > 0){
      //this.router.navigateByUrl('/comic/list/' + ans);
      this.router.navigateByUrl('/comic/list', {skipLocationChange: true}).then(()=>
      this.router.navigate(["/comic/list/"+ans])); 
    }
    else{
      this.router.navigateByUrl('/comic/list', {skipLocationChange: true}).then(()=>
      this.router.navigate(["/comic/list/1"])); 
    }
  }


  ngOnInit() {
    this.query = this.route.snapshot.paramMap.get('query');
    let i: number = this.query.search(""+this.sRoute);
    let r: number;
    if(i != -1){
      r = ++i;
      while(r < this.query.length && this.query.charAt(r) != this.cRoute && this.query.charAt(r) != this.pRoute)
        r++;
      this.search(this.query.substring(i,r));
    }
    i = this.query.search(""+this.cRoute);
    if(i != -1){
      this.filterCat(this.query.substr(i+1,this.categoriasElegidas.length));
    }
    i = this.query.search(""+this.pRoute);
    if(i != -1){
      r = ++i;
      while(r < this.query.length && this.query.charAt(r) != this.cRoute && this.query.charAt(r) != this.sRoute)
        r++;
      let s:string[] = this.query.substring(i,r).split("_");
      this.minPrice = +s[0];
      this.maxPrice = +s[1];
      // console.log(i + " - - " + r);
      // console.log("update price " + this.maxPrice);
    }
    // console.log(i);
    this.getComics();
  }
}