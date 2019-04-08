import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ComicListComponent } from './Comic-list/Comic-list.component';
import { ComicService } from './comic.service';
import {AppRoutingModule} from '../app-routing/app-routing.module';

@NgModule({
    imports: [       
        CommonModule,
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        NgbModule
    ],
    declarations: [ComicListComponent],
    providers: [ComicService],
    exports:[ComicListComponent]
})
export class VendedorModule {}
