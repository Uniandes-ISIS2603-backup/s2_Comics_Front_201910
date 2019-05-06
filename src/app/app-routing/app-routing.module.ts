import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import {HomePage} from '../Home/home';

import { AuthLoginComponent } from '../auth/auth-login/auth-login.component';
import { AuthSignUpComponent } from '../auth/auth-sign-up/auth-sign-up.component';
import { CompradorListComponent } from '../Comprador/comprador-list/comprador-list.component';
import { CompradorDetailComponent } from '../Comprador/comprador-detail/comprador-detail.component';

import { VendedorListComponent } from '../vendedor/vendedor-list/vendedor-list.component';
import { VendedorDetailComponent } from '../vendedor/vendedor-detail/vendedor-detail.component';
import { VendedorEditComponent } from '../vendedor/vendedor-edit/vendedor-edit.component';

import { ComicListComponent } from '../comic/comic-list/comic-list.component';
import { ComicDetailComponent } from '../comic/comic-detail/comic-detail.component';
import { ComicUpdateComponent } from '../comic/comic-update/comic-update.component';

import { ComicDeseoListComponent } from '../ComicDeseo/ComicDeseo-List/comicDeseo-list.component';
import { ComicDeseoDetailComponent } from '../ComicDeseo/comicDeseo-detail/comicdeseo-detail.component';
import { FormularioComponent } from '../Coleccionista/FormularioComponente/formulario.component';
import { CompradorEditComponent } from '../Comprador/comprador-edit/comprador-edit.component';
import {OrdenPedidoListComponent} from '../orden-pedido/orden-pedido-list/orden-pedido-list.component';
import {OrdenPedidoDetailComponent} from '../orden-pedido/orden-pedido-detail/orden-pedido-detail.component';
import {LogInComponent} from "../Coleccionista/LogInComponente/logIn.component";


const routes: Routes = [
    {
        path: 'comicsdeseo',
        children:[
            {path:'list', component: ComicDeseoListComponent},
            {path: ':id', component: ComicDeseoDetailComponent, outlet:'detail'}
        ]
    },
    {
        path: 'auth',
        children: [
            {
                path: 'login',
                component: AuthLoginComponent,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['GUEST']
                    }
                }
            },
            {
                path: ':sign-up',
                component: AuthSignUpComponent,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['GUEST']
                    }
                }
            }
        ]
    },
    {
        path: 'form',
        component: FormularioComponent
    },
    {
        path: 'login',
        component: LogInComponent
    },
    {
        path: 'comprador',
        children: [
            {
                path: 'list',
                component: CompradorListComponent
            },
            {
                path: ':id',
                component: CompradorDetailComponent
            },
            {
                path: ':id/edit',
                component: CompradorEditComponent
            },
        ]
    },{
        path: 'orden',
        children: [
            {
                path: 'list',
                component: OrdenPedidoListComponent,
                children: [
                    {   path :'compra',
                        component:OrdenPedidoListComponent
                    },
                    {   path :'venta',
                        component:OrdenPedidoListComponent
                    }
                ]
            },
            {
                path: ':id',
                component: OrdenPedidoDetailComponent,
            }
        ]
    }, {
        path: 'vendedores',
        children: [{
            path: 'list',
            component: VendedorListComponent
        }, {
            path: ':id',
            component: VendedorDetailComponent,
        },
            {
                path: ':id/edit',
                component: VendedorEditComponent



            }

        ]
    },
    {
        path: 'comic',
        children: [{
            path: 'list',
            component: ComicListComponent
        },
            {
                path: ':id',
                component: ComicDetailComponent
            },
            {
                path: 'update/:id',
                component: ComicUpdateComponent
            }
        ]
    },
    {
        path:'AuthLC',
        component: AuthLoginComponent
        
    },
    {
       path: 'home',
        component: HomePage
    },
    {
        path: '**',
        redirectTo: 'home',
    }


];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule {

}