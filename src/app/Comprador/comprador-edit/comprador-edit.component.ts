import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CompradorService } from "../comprador.service";
import { FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import { Comprador } from "../comprador";
import { ToastrService } from "ngx-toastr";
import { CompradorDetail } from "../comprador-detail";
import { ActivatedRoute, Router } from "@angular/router";
import {HttpClient} from "@angular/common/http";
import $ from "jquery";

const API_URL = '../../../assets/foto_2.json';

@Component({
    selector: 'app-comprador-edit',
    templateUrl: 'comprador-edit.component.html',
    styleUrls: ['comprador-edit.component.css']
})

export class CompradorEditComponent implements OnInit
{
    myStyle: object = {};
    myParams: object = {};
    width: number = 100;
    height: number = 100;

    /**
     * Objeto que agrupa los componentes del formulario
     */
    updateForm : FormGroup;

    /**
     * Booleano que determina si el formulario se envió
     */
    isSubmitted: boolean = false;

    /**
     * El detalle del comprador que vamos a editar, se obtiene a partir de una petición GET
     */
    compradorDetail:CompradorDetail;

    /**
     * El id del comprador que vamos a editar
     */
    id:number;

    /**
     * El objeto nuevo que actualiza el viejo
     */
    @Input() comprador: Comprador;

    /**
     *
     */
    @Output() update = new EventEmitter();

    /**
     * Constructor de la clase
     * @param service Servicio de la clase que me permite hacer peticiones al servidor.
     * @param formBuilder Creador de nuestro formulario reactivo.
     * @param route enrutador que nos permite navegar entre componentes
     * @param toastrService
     * @param router
     */
    constructor(private service:CompradorService,
                private formBuilder: FormBuilder,
                private route:ActivatedRoute,
                private toastrService: ToastrService,
                private router: Router,
                private httpClient:HttpClient)
    {
        this.comprador = new Comprador();
        this.updateForm = this.formBuilder.group({
            nombre : new FormControl({value:'', disabled: true},[
                Validators.minLength(3),
                Validators.maxLength(30),
                Validators.pattern('^[a-zA-Z ]*$')
            ]),
            alias: new FormControl({value:'', disabled: true},[
                Validators.minLength(5),
                Validators.maxLength(30)
            ]),
            correoElectronico:new FormControl({value:'', disabled: true}, [
                Validators.pattern(/^([\w\-\.]+)@((\[([0-9]{1,3}\.){3}[0-9]{1,3}\])|(([\w\-]+\.)+)([a-zA-Z]{2,4}))$/)
            ]),
            password: new FormControl({value:'', disabled: true}, [
                Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,10}$/)
            ]),
            intereses: new FormControl({value:'', disabled: true}),
            foto : new FormControl({value:'', disabled: true})
        });
    }

    enableName()
    {
        this.updateForm.get('nombre').enable();
        $('.nombre').css({
            'transition':'all 1s ease-out',
            'display':'none'
        });

        $('.form-name').css({
            'transition':'all 1s ease-out',
            'border-radius':'10px 10px 10px 10px',
            'width':'70%',
            'display':'inline-block'
        });
    }

    enableAlias()
    {
        this.updateForm.get('alias').enable();
        $('.alias').css({
            'transition':'all 1s ease-out',
            'display':'none'
        });

        $('.form-alias').css({
            'transition':'all 1s ease-out',
            'border-radius':'10px 10px 10px 10px',
            'width':'70%',
            'display':'inline-block'
        });
    }

    enableIntereses()
    {
        this.updateForm.get('intereses').enable();
        $('.intereses').css({
            'transition':'all 1s ease-out',
            'display':'none'
        });

        $('.form-intereses').css({
            'transition':'all 1s ease-out',
            'border-radius':'10px 10px 10px 10px',
            'width':'70%',
            'display':'inline-block'
        });
    }

    enableEmail()
    {
        this.updateForm.get('correoElectronico').enable();
        $('.email').css({
            'transition':'all 1s ease-out',
            'display':'none'
        });

        $('.form-email').css({
            'transition':'all 1s ease-out',
            'border-radius':'10px 10px 10px 10px',
            'width':'70%',
            'display':'inline-block'
        });
    }

    enablePass()
    {
        $('#show-password').removeAttr('disabled');
        this.updateForm.get('password').enable();
        $('.pass').css({
            'transition':'all 1s ease-out',
            'display':'none'
        });

        $('.form-pass').css({
            'transition':'all 1s ease-out',
            'border-radius':'10px 10px 10px 10px',
            'width':'70%',
            'display':'inline-block'
        });
    }

    /**
     * Funcion que se activa cuando se envía el formulario.
     */
    onEditFormSubmit()
    {
        this.isSubmitted = true;
        this.comprador = Object.assign({}, this.updateForm.value);
        this.comprador.id = this.compradorDetail.id;

        if(this.updateForm.get('alias').value == "")
        {
            this.comprador.alias = this.compradorDetail.alias;
        }
        if(this.updateForm.get('nombre').value == "")
        {
            this.comprador.nombre = this.compradorDetail.nombre;
        }
        if(this.updateForm.get('correoElectronico').value == "")
        {
            this.comprador.correoElectronico = this.compradorDetail.correoElectronico;
        }
        if(this.updateForm.get('password').value == "")
        {
            this.comprador.password = this.compradorDetail.password;
        }
        if(this.updateForm.get('intereses').value == "")
        {
            this.comprador.intereses = this.compradorDetail.intereses;
        }
        if(this.updateForm.get('foto').value == "")
        {
            this.comprador.foto = this.compradorDetail.foto;
        }

        this.service.updateComprador(this.comprador).subscribe(object =>
        {
            this.updateForm.reset();
            this.toastrService.success("El comprador fue actualizado con exito");
            this.router.navigate(['/comprador/' + this.compradorDetail.id])
        });
        this.update.emit();
    }

    /**
     * Funcion que me permite mostrar el password del usuario en el Login
     */
    showPassword():void
    {
        let password = $('.form-pass'),
            toggle = $('#show-password');

        toggle.click(function()
        {
            toggle.is(':checked') ? password.attr('type', 'text'):password.attr('type', 'password');
        })
    }

    /**
     *
     */
    imagenes: string[];

    /**
     *
     */
    cargarImagenes():void
    {
        this.httpClient.get<string[]>(API_URL).subscribe(imagenes =>
        {
            this.imagenes = imagenes;
        });
    }

    /**
     *
     * @param url
     */
    funcion(url:string)
    {
        this.updateForm.get('foto').setValue(url);
    }

    /**
     * Funcion que me permite obtener el comprador que quiero editar
     */
    getCompradorDetail()
    {
        this.service.getCompradorDetail(this.id).subscribe(object =>
        {
            this.compradorDetail = object;
        });
    }

    /**
     * Funcion que se ejecuta al inicializar la pagina.
     */
    ngOnInit()
    {
        this.showPassword();
        this.id = +this.route.snapshot.paramMap.get('id');
        if(this.id)
        {
            this.compradorDetail = new CompradorDetail();
            this.getCompradorDetail();
        }

        this.cargarImagenes();

        this.myStyle = {
            'position': 'fixed',
            'width': '100%',
            'height': '100%',
            'z-index': -1,
            'top': 0,
            'left': 0,
            'right': 0,
            'bottom': 0,
            'background': 'rgb(255,255,255)'
        };

        this.myParams = {
            particles: {
                number: {
                    value: 100,
                    density:
                        {
                            enable:true,
                            value_area:800
                        }
                },
                color: {
                    value: '#34495e'
                },
                shape: {
                    type: 'triangle',
                    stroke:
                        {
                            width: 0,
                            color: '#34495e'
                        }
                },
                polygon:{
                    nb_sides: 5
                },
                line_linked:{
                    enable: false,
                    distance: 300,
                    color: '#34495e',
                    opacity: 0.4,
                    width: 2
                },
                move:{
                    enable: true,
                    speed: 12,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                },
                interactivity:{
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: false,
                            mode: 'repulse'
                        },
                        onclick:{

                        },
                        resize: true
                    },
                    modes: {
                        repulse: {
                            distance: 400,
                            duration: 0.4
                        }
                    }
                }
            }
        };
    }
}