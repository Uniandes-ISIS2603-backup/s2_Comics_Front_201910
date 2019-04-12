import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Comic } from '../Comic';
import { ComicService } from '../comic.service';

@Component({
  selector: 'app-comic-update',
  templateUrl: './comic-update.component.html',
  styleUrls: ['./comic-update.component.css']
})

export class ComicUpdateComponent implements OnInit {

  comic: Comic;

  id: number;
  
  submitted = false;

  
  
  constructor(
    private comicService: ComicService,
    private route: ActivatedRoute
    ) { }

    getComicDetail(): void {
      //this.comicService.getComicDetail(this.id).subscribe(det => { this.comic = det; });
    this.comicService.getComics().subscribe(
      com => {
        com.forEach((c) => {
          if(c.id === this.id){
            this.comic = c;
          }
        })
      });
    }
    
    ngOnInit() {
      this.id = +this.route.snapshot.paramMap.get('id');
      this.comic = new Comic();
      this.getComicDetail();
    }
    
    onSubmit(){this.submitted = true;}

}