import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComicService } from './comic.service';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { ComicUpdateComponent } from './comic-update/comic-update.component';
import {ComicListComponent} from "./Comic-list/Comic-List.component";

@NgModule({
  imports: [
    ReactiveFormsModule,
    BrowserModule, 
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  declarations: [ComicListComponent, ComicDetailComponent, ComicUpdateComponent],
  providers: [ComicService],
})
export class ComicModule { }