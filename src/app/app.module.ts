import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpErrorInterceptor} from './interceptors/httperrorinterceptor.service';
import {NgxPermissionsModule} from 'ngx-permissions';
import { ModalDialogModule } from 'ngx-modal-dialog';
import {ComicDeseoModule} from './ComicDeseo/comicDeseo.module';
import {CommonModule} from '@angular/common';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {AuthModule} from './auth/auth.module';
import { ComicModule } from './comic/comic.module';
import { CompradorModule } from './Comprador/comprador.module';
import { VendedorModule } from './vendedor/vendedor.module';
import { FormularioComponent } from './Coleccionista/FormularioComponente/formulario.component';
import { LogInComponent } from '../app/Coleccionista/LogInComponente/logIn.component';
import {OrdenPedidoModule} from './orden-pedido/orden-pedido.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [
        AppComponent,
        FormularioComponent,
        LogInComponent
    ],
    imports: [
        FlexLayoutModule,
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        VendedorModule,
        BrowserAnimationsModule,
        ModalDialogModule.forRoot(),
        AuthModule,
        ComicDeseoModule,
        FormsModule,
        CommonModule,
        ToastrModule.forRoot({
            timeOut: 10000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
        }),
        NgxPaginationModule,
        NgxPermissionsModule.forRoot(),
        NgbModule,
        CompradorModule,
        OrdenPedidoModule,
        ComicModule
    ],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        }
    ]
})
export class AppModule {}