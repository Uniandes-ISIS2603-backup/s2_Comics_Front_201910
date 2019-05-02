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

  comics: Comic[];

  minPrice: number = 100;
  maxPrice: number = 400;
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
    this.comicService.getComics()
      .subscribe(c => {
        this.comics = c;
      });
  }

  ngOnInit() {
    this.getComics();
  }
}