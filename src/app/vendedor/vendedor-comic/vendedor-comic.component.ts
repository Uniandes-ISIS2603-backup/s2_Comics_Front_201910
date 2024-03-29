import { Component, OnInit, Input,OnChanges ,ViewChild,ViewContainerRef} from '@angular/core';
import {VendedorService} from '../vendedor.service';
import {Calificacion} from '../calificacion';
import { ActivatedRoute } from '@angular/router';
import {Comic} from "../../Comic/Comic";
import {ComicService} from "../../Comic/comic.service";
@Component({
    selector: 'app-vendedor-comics',
    templateUrl: './vendedor-comic.component.html',
    styleUrls: ['./vendedor-comic.component.css']
})
export class VendedorComicsComponent implements OnInit,OnChanges {
    constructor(private vendedorService: VendedorService,  private route: ActivatedRoute, private viewRef: ViewContainerRef, private comicService :ComicService){}
    @Input()  vendedorCalificaciones : Calificacion [];
    comics: Comic[];
    comicsVendedor:Comic[];

    vendedorId:number;
    selected:number;
    selectedId:any;
    public isCollapsed = true;

    //metodo que llama al servicio de los comics para cargar una lista de todos los comics disponibles
    getComics(): void {
        this.comicService.getComics().subscribe(comics=>{this.comics=comics});
    }
//metodo que llama al servicio de vendedor para añadir un comic a su lista de comics
    addComic(comicId:Comic): void {
    this.comicsVendedor
      this.vendedorService.addComic(this.vendedorId,comicId).subscribe();
      window.location.reload();
    }
    //inicializa el id con el id del vendedor actual
    ngOnInit(){
        this.vendedorId = +this.route.snapshot.paramMap.get('id');
        this.getComics();
    }

    ngOnChanges(){
        this.ngOnInit();

    }
}