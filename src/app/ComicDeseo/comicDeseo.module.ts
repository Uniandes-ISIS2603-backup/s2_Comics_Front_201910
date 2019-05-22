import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';



import {ComicDeseoService} from './comicDeseo.service'
import { AppRoutingModule } from '../app-routing/app-routing.module';
import {ComicDeseoListComponent} from './ComicDeseo-List/comicDeseo-list.component';
import {ComicDeseoDetailComponent} from './comicDeseo-detail/comicdeseo-detail.component'; 



@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CommonModule,
        FormsModule,

    ],
    declarations: [
        ComicDeseoListComponent, ComicDeseoDetailComponent
    ],
    exports:[ComicDeseoListComponent],
    providers: [ComicDeseoService],
    bootstrap: [ComicDeseoListComponent]
})
export class ComicDeseoModule { }