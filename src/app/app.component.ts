import {Component, OnInit} from '@angular/core';
import { AuthService } from './auth/auth.service';
import {Router} from "@angular/router";
import {CompradorService} from "./Comprador/comprador.service";

/**
 * The app component. This component is the base of s2_comics-Front
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    /**
     * The title that appears on the NavBar and the web browser
     */
    title: String;

    /**
     * El rol del usuario activo
     */
    rol: String = "";

    /**
     * El id del usuario activo
     */
    id: number = 0;

    /**
     * @ignore
     */
    constructor(private authService: AuthService,
                private router: Router,
                private compradorService: CompradorService) { }

    /**
     * Assigns a title to the web page
     */
    ngOnInit()
    {
        this.rol = localStorage.getItem("role");
        this.id = +localStorage.getItem("user");
        document.body.style.overflowY = 'show';
        this.title = "Tienda de Comics";
        this.authService.start();
    }

    /**
     * Funcion que permite navegar hasta el perfil del comprador
     */
    compradorProfile()
    {
        this.router.navigateByUrl('/comprador/' + localStorage.getItem('user'));
    }

    compradorNombre():string
    {
        let nombre = "";
        this.compradorService.getCompradorDetail(localStorage.getItem('user')).subscribe(object =>
        {
            nombre = object.nombre;
        });
        return nombre;
    }

    /**
     * Funcion que permite navegar hasta el carrito de compras.
     */
    carritoCompras()
    {
        this.router.navigateByUrl("/comprador/" + localStorage.getItem('user') + '/comics');
    }

    /**
     * Funcion que permite cerrar la sesión activa.
     */
    logout(): void
    {
        this.authService.logout()
    }
}