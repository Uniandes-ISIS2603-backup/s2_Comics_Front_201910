import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Comic } from "./Comic";
import { ComicDetail } from "./ComicDetail";

const API_URL = '../../assets';
const comics = '/comics.json';

@Injectable()
export class ComicService {

  constructor(private http: HttpClient) { }

  getComics(): Observable<Comic[]> {
    return this.http.get<Comic[]>(API_URL + comics);
  }
  
  getComicDetail(): Observable<ComicDetail> {
    //cambiar
    return this.http.get<ComicDetail>(API_URL + comics);
  }

}