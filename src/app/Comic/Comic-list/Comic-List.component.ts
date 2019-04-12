import { Component, OnInit } from '@angular/core';

import { Comic } from '../Comic';
import { ComicService } from '../comic.service';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.css']
})
export class ComicListComponent implements OnInit {

  comics: Comic[];

  constructor(private comicService: ComicService) { }

  getComics(): void {
    this.comicService.getComics()
      .subscribe(c => {
        this.comics = c;
        console.log(this.comics[0].imagen);
      });
  }

  ngOnInit() {
    this.getComics();
  }
}