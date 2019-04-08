import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendedorListComponent } from './vendedor-list/vendedor-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { VendedorService } from './vendedor.service';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [       
        CommonModule,
        FormsModule
],
declarations: [VendedorListComponent],
  providers: [VendedorService],

    exports:[VendedorListComponent]
})
export class VendedorModule {}
