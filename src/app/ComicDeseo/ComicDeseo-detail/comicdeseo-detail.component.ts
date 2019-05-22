import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {ComicDeseoService} from '../comicDeseo.service';
import {ComicDeseo} from '../ComicDeseo';
import { ComicDeseoDetail } from '../ComicDeseoDetail';


@Component({
    selector: 'app-comicdeseo-detail',
    templateUrl: './comicdeseo-detail.component.html',
    styleUrls: ['./comicdeseo-detail.component.css']
  })

  export class ComicDeseoDetailComponent implements OnInit {

    constructor(
        private comicDeseoService: ComicDeseoService,
        private route: ActivatedRoute
      ) { }

      comicDeseoDetail: ComicDeseoDetail;

    @Input() comicDeseo_id: number;


    loader: any;
    
    getComicDeseoDetail(): void {

        this.comicDeseoService.getComicDeseoDetail(this.comicDeseo_id)
          .subscribe(o => {
            this.comicDeseoDetail = o
          });
      }

      onLoad(params) {

        this.comicDeseo_id = parseInt(params['id']);
        console.log(" en detail " + this.comicDeseo_id);
        this.comicDeseoDetail = new ComicDeseoDetail();
        this.getComicDeseoDetail();
      }


    ngOnInit() {
        this.loader = this.route.params.subscribe((params: Params) => this.onLoad(params));
      }

      ngOnDestroy() {
        this.loader.unsubscribe();
      }

  }