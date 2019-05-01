import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Comic } from "./Comic";
import { ComicDetail } from "./ComicDetail";

const API_URL = "http://localhost:8080/s2_comics-api/api";
const comics = '/comic';

@Injectable()
export class ComicService {

  constructor(private http: HttpClient) { }

  getComics(): Observable<Comic[]> {
    return this.http.get<Comic[]>(API_URL + comics);
  }
  
  getComicDetail(comicId): Observable<ComicDetail> {
    //cambiar
    return this.http.get<ComicDetail>(API_URL + comics + '/' + comicId);
  }

  updateComic(comicId,comic){      
    return this.http.put<ComicDetail>(API_URL + comics +'/'+comicId ,comic);
  }
}