import { Component, OnInit, Output } from "@angular/core";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import { CompradorService } from "../../Comprador/comprador.service";
import { Comprador } from "../../Comprador/comprador";
import { Router } from "@angular/router";
import { VendedorService } from "../../vendedor/vendedor.service";
import { Vendedor } from "../../vendedor/vendedor";
import {TweenMax} from "gsap/TweenMax";
import {Expo} from "gsap/all";
import $ from "jquery";
import {AuthService} from "../../auth/auth.service";

var close = 0;

@Component({
    selector: 'app-login',
    templateUrl: 'logIn.component.html',
    styleUrls: ['logIn.component.css']
})

export class LogInComponent implements OnInit {
    /**
     *
     */
    logInForm: FormGroup;

    rolesGroup : FormGroup;

    /**
     *
     */
    isSubmitted: boolean = false;

    /**
     *
     */
    vendedor: Vendedor;

    /**
     *
     */
    comprador: Comprador;

    roles: Array<String> = ["Comprador", "Vendedor", "Administrador"];

    /**
     *
     * @param formBuilder
     * @param compradorService
     * @param vendedorService
     * @param router
     * @param auth
     */
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
            ]),
            role: new FormControl(null, [
                Validators.required
            ])
        });

        this.rolesGroup = this.formBuilder.group({
            myValues: this.addValuesControl()
        })
    }

    /**
     * Agrega los valores al grupo de control 'rolesGroup'
     */
    addValuesControl()
    {
        const arr = this.roles.map(object =>
        {
            return this.formBuilder.control(false);
        });

        return this.formBuilder.array(arr);
    }

    /**
     * Funcion que se ejecuta cuando se da click al boton 'Sign In'
     */
    onLogInSubmit()
    {
        this.isSubmitted = true;

        //Valida que el formulario no tenga errores.
        if (this.logInForm.valid)
        {
            var alias: string = this.logInForm.get('alias').value;
            var password: string = this.logInForm.get('password').value;
            var role: string = this.logInForm.get('role').value;

            if(role == "Comprador")
            {
                this.compradorService.getCompradorByAlias(alias).subscribe(cadena =>
                {
                    if(cadena != null)
                    {
                        this.comprador = cadena;
                        if(this.comprador.password == password)
                        {
                            this.auth.logIn("Comprador", this.comprador.id);
                            this.logInForm.reset();
                        }
                        else
                        {
                            alert("Error");
                        }
                    }
                    else
                    {
                        alert("Error");
                    }
                });
            }
            else if(role == "Vendedor")
            {
                this.vendedorService.getVendedorByAlias(alias).subscribe(cadena =>
                {
                    if(cadena != null)
                    {
                        this.vendedor = cadena;
                        if(this.vendedor.password == password)
                        {
                            this.auth.logIn(role, cadena.id);
                            this.logInForm.reset();
                        }
                    }
                    else {
                        alert("Error");
                    }
                });
            }
            else if(role == "Administrador")
            {
                this.auth.logIn(role, null);
            }
        }
        else
        {
            this.pop();
        }
    }

    /**
     * Funcion que me permite cerrar la ventana de dialogo de error
     */
    pop():void
    {
        if(close == 0)
        {
            $('.alert').css(
                {
                    'display':'block'
                }
            );
            close = 1;
        }
        else if(close == 1)
        {
            $('.alert').css(
                {
                    'display':'none'
                }
            );
            close = 0;
        }
    }

    /**
     * Funcion que me permite mostrar el password del usuario en el Login
     */
    showPassword():void
    {
        let password = $('#password'),
            toggle = $('#show-password');

        toggle.click(function()
        {
            toggle.is(':checked') ? password.attr('type', 'text'):password.attr('type', 'password');
        })
    }

    /**
     * La funcion del efecto mouse parallax el background, se utilizó
     * TweenMax para su logro.
     */
    background(): void
    {
        document.body.style.overflow = 'hidden';
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
                left = container_w / 2 - pos_x,
                top = container_h / 2 - pos_y;
            // left = container_w / 2 - pos_x;
            // top  = container_h / 2 - pos_y;

            TweenMax.to(
                $layer_2,
                1,
                {
                    css: {
                        transform: 'translateX(' + left / 6 + 'px) translateY(' + top/4 + 'px)'
                    },
                    ease: Expo.easeOut,
                    overwrite: 'all'
                });

            TweenMax.to(
                $layer_1,
                1,
                {
                    css: {
                        transform: 'translateX(' + left / 2 + 'px)translateY(' + top/4 + 'px)'
                    },
                    ease: Expo.easeOut,
                    overwrite: 'all'
                });

            TweenMax.to(
                $layer_0,
                10,
                {
                    css: {
                        transform: 'rotate(' + left / 150 + 'deg)'
                    },
                    ease: Expo.easeOut,
                    overwrite: 'none'
                });
        });
    }

    /**
     * Funcion que se ejecuta al iniciar el componente
     */
    ngOnInit()
    {
        this.showPassword();
        this.background();
    }
}