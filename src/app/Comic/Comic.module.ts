import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComicService } from './comic.service';
import { ComicListComponent } from './comic-list/comic-list.component';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    BrowserModule, 
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  declarations: [ComicListComponent, ComicDetailComponent],
  providers: [ComicService],
})
export class ComicModule { }