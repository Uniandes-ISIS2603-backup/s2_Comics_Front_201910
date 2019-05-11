import { Component, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { CompradorService } from "../../Comprador/comprador.service";
import { Comprador } from "../../Comprador/comprador";
import { Router } from "@angular/router";
import { VendedorService } from "../../vendedor/vendedor.service";
import { Vendedor } from "../../vendedor/vendedor";
import {TweenMax} from "gsap/TweenMax";
import {Expo} from "gsap/all";
import $ from "jquery";
import {AuthService} from "../../auth/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: 'logIn.component.html',
    styleUrls: ['logIn.component.css']
})

export class LogInComponent implements OnInit {
    logInForm: FormGroup;
    isSubmitted: boolean = false;

    vendedor: Vendedor;
    comprador: Comprador;

    constructor(private formBuilder: FormBuilder,
                private compradorService: CompradorService,
                private vendedorService: VendedorService,
                private router: Router,
                private auth: AuthService) {
        this.logInForm = this.formBuilder.group({
            alias: new FormControl('', [
                Validators.required
            ]),
            password: new FormControl('', [
                Validators.required
            ])
        });
    }
    //Golda Percival
    onLogIngSubmit() {
        this.isSubmitted = true;

        if (this.logInForm.valid) {
            var alias: string = this.logInForm.get('alias').value;
            var password: string = this.logInForm.get('password').value;

            this.compradorService.getCompradorByAlias(alias).subscribe(cadena => {
                if (cadena != null) {
                    this.comprador = cadena;
                    if (this.comprador.password == password) {
                        this.router.navigate(['/comprador/' + this.comprador.id]);
                        this.logInForm.reset();
                    }
                    else {
                        console.log("Error!");
                    }
                }
                else
                {
                    this.vendedorService.getVendedorByAlias(alias).subscribe( user =>
                    {
                        if(user != null)
                        {
                            this.vendedor = user;
                            if(this.vendedor.password == password)
                            {
                                this.router.navigate(['/vendedores/' + this.vendedor.id]);
                                this.logInForm.reset();
                            }
                            else
                            {
                                console.log("Error");
                            }
                        }
                    });
                }
            });

        }
        else {
            this.logInForm.reset();
        }
    }

    background(): void
    {
        var $layer_0 = $('.layer-0'),
            $layer_1 = $('.layer-1'),
            $layer_2 = $('.layer-2'),
            $container = $('body'),
            container_w = $container.width(),
            container_h = $container.height();

        $(window).on('mousemove.parallax', function(event)
        {
            var pos_x = event.pageX,
                pos_y = event.pageY,
                left = 0,
                top = 0;
            left = container_w / 2 - pos_x;
            top  = container_h / 2 - pos_y;

            TweenMax.to(
                $layer_2,
                1,
                {
                    css: {
                        transform: 'translateX(' + left / 12 + 'px) translateY(' + top/4 + 'px)'
                    },
                    ease: Expo.easeOut,
                    overwrite: 'all'
                });

            TweenMax.to(
                $layer_1,
                1,
                {
                    css: {
                        transform: 'translateX(' + left / 4 + 'px)translateY(' + top/4 + 'px)'
                    },
                    ease: Expo.easeOut,
                    overwrite: 'all'
                });

            TweenMax.to(
                $layer_0,
                10,
                {
                    css: {
                        transform: 'rotate(' + left / 200 + 'deg)'
                    },
                    ease: Expo.easeOut,
                    overwrite: 'none'
                });
        });
    }

    ngOnInit() {
        this.background();
    }
}