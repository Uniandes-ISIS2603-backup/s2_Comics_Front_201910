import { Component, OnInit } from '@angular/core';
import {ComicDeseo} from '../ComicDeseo/ComicDeseo';
import {ComicDeseoService} from '../ComicDeseo/comicDeseo.service';
import {Router} from "@angular/router";

@Component({
    selector: 'homePage',
    templateUrl: './home.html',
    styleUrls: ['./home.css']
})
export class HomePage implements OnInit{

    constructor(private comicsDeseoService:ComicDeseoService, private router: Router){


    }

    comicsDeseo: ComicDeseo[]=new Array();
    sear: string = "";
    
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
    
    search(){
      if(this.sear.length > 0){
        this.sear = this.sear.replace(" ", "_").toLowerCase();
        this.router.navigateByUrl('/comic/list/S'+this.sear);
      }
    }

    ngOnInit(){

      this.getComicsDeseo();

    }
}