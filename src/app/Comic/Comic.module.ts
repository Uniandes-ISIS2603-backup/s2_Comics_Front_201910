import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';

import { ComicService } from './comic.service';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { ComicUpdateComponent } from './comic-update/comic-update.component';
import { ComicCreateComponent } from './comic-create/comic-create.component';
import {ComicListComponent} from "./Comic-list/Comic-list.component";



@NgModule({
    imports: [
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        Ng5SliderModule
    ],
    declarations: [ComicListComponent, ComicDetailComponent, ComicUpdateComponent, ComicCreateComponent],
    providers: [ComicService],
})
export class ComicModule { }