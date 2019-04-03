import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from '../app-routing/app-routing.module';

import { CalificacionListComponent } from './calificacion-list/calificacion-list.component';

import { CalificacionService } from './calificacion.service';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [       
        CommonModule,
        FormsModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule
    ],
    declarations: [CalificacionListComponent],
    providers: [CalificacionService],
    exports:[CalificacionListComponent]
})
export class CalificacionModule {}
