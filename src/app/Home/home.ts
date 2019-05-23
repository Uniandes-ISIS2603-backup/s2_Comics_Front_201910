import { Component, OnInit } from '@angular/core';
import {ComicDeseo} from '../ComicDeseo/ComicDeseo';
import {ComicDeseoService} from '../ComicDeseo/comicDeseo.service';

@Component({
    selector: 'homePage',
    templateUrl: './home.html',
    styleUrls: ['./home.css']
})
export class HomePage implements OnInit{

    constructor(private comicsDeseoService:ComicDeseoService){


    }

    comicsDeseo: ComicDeseo[]=new Array();
    
    
    getComicsDeseo():void{
        
        console.log("In get comics deseo");
    //this.comicsDeseoService.getComicsDeseo()
     // .subscribe(comicDArr => {
      //  let temp: ComicDeseo[] = comicDArr;
      //  temp.forEach(c => {
          
            
              
        //        this.comicDeseo.push(c);
                
              
            
          
      //  });
     // });

     this.comicsDeseoService.getComicsDeseo()
     .subscribe(comicsDeseo =>
         this.comicsDeseo = comicsDeseo);
    }
    

    ngOnInit(){

      this.getComicsDeseo();

    }
}