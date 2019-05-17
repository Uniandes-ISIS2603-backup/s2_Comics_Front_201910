import {Component, OnInit} from '@angular/core';
import { AuthService } from './auth/auth.service';

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

    rol: String = localStorage.getItem("role");

    /**
     * Assigns a title to the web page
     */
    ngOnInit(): void {
        this.title = "Tienda de Comics";
        this.authService.start();
    }

    /**
     * @ignore
     */
    constructor(private authService: AuthService) { }

    logout(): void {
        this.authService.logout()
    }
}