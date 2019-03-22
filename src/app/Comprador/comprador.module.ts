import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompradorListComponent } from './comprador-list/comprador-list.component';
import { CompradorDetail } from './comprador-detail';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CompradorService } from './comprador.service';

@NgModule({
    declarations: [CompradorListComponent,
    CompradorDetail],
    imports: [ 
        BrowserModule, 
        AppRoutingModule,
        HttpClientModule,
        CommonModule,
        FormsModule],
    providers: [CompradorService],
    bootstrap: [CompradorListComponent]
})
export class CompradorModule 
{
    OnInit()
    {
        
    }
}