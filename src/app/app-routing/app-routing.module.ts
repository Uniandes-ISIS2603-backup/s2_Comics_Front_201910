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
import { VendedorOrdenPedidoListComponent } from '../vendedor/vendedor-orden-pedido-list/vendedor-orden-pedido-list.component';



import { ComicDeseoListComponent } from '../ComicDeseo/ComicDeseo-List/comicDeseo-list.component';
import { FormularioComponent } from '../Coleccionista/FormularioComponente/formulario.component';
import { CompradorEditComponent } from '../Comprador/comprador-edit/comprador-edit.component';

import {OrdenPedidoListComponent} from '../orden-pedido/orden-pedido-list/orden-pedido-list.component';
import {OrdenPedidoListComVenComponent}  from '../orden-pedido/orden-pedido-list-com-ven/orden-pedido-list-com-ven.component'
import {OrdenPedidoDetailComponent} from '../orden-pedido/orden-pedido-detail/orden-pedido-detail.component';
import {OrdenPedidoDetailComprador} from '../orden-pedido/orden-pedido-detail-comprador/orden-pedido-detail-comprador'
import {OrdenPedidoDetailVendedor} from '../orden-pedido/orden-pedido-detail-vendedor/orden-pedido-detail-vendedor'

import {LogInComponent} from "../Coleccionista/LogInComponente/logIn.component";
import {CompradorComicsListComponent} from "../Comprador/comprador-comics/comprador-comics.component";
import {ComicDeseoDetailComponent} from "../ComicDeseo/ComicDeseo-detail/comicdeseo-detail.component";
import {ComicListComponent} from "../Comic/Comic-list/Comic-list.component";
import {ComicCreateComponent} from "../Comic/comic-create/comic-create.component";
import {ComicDetailComponent} from "../Comic/comic-detail/comic-detail.component";
import {ComicUpdateComponent} from "../Comic/comic-update/comic-update.component";


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
        component: FormularioComponent,
        canActivate: [NgxPermissionsGuard],
        data:
            {
                permissions:
                    {
                        only: ['GUEST']
                    }
            }
    },
    {
        path: 'login',
        component: LogInComponent,
        canActivate: [NgxPermissionsGuard],
        data:
            {
                permissions:
                    {
                        only: ['GUEST']
                    }
            }
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
            {
                path: ':id/comics',
                component: CompradorComicsListComponent
            }
        ]
    },{
        path: 'orden',
        children: [
            {
                path: 'list',
                children: [
                    {   path :'Comprador',
                        component:OrdenPedidoListComVenComponent
                    },
                    {   path :'Vendedor',
                        component:OrdenPedidoListComVenComponent
                    },
                    {
                        path :'ADMIN',
                        component:OrdenPedidoListComponent

                    }

                ]
            },
            {
                path: ':id',
                children: [
                    {   path :'Comprador',
                        component:OrdenPedidoDetailComprador
                    },
                    {   path :'Vendedor',
                        component:OrdenPedidoDetailVendedor
                    },
                    {
                        path :'ADMIN',
                        component:OrdenPedidoDetailComponent

                    }
                ]},
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
            ,
            {
                path: ':id/pedidos',
                component: VendedorOrdenPedidoListComponent



            }
        ]
    },
    {
        path: 'comic',
        children: [{
            path: 'list/:query',
            component: ComicListComponent
        },
        {
            path: 'create',
            component: ComicCreateComponent
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