import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CalificacionListComponent } from './calificacion-list/calificacion-list.component';

import { CalificacionService } from './calificacion.service';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [       
        CommonModule,
        FormsModule
    ],
    declarations: [CalificacionListComponent],
    providers: [CalificacionService],
    exports:[CalificacionListComponent]
})
export class CalificacionModule {}
