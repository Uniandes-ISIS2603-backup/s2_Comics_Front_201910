import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CompradorService } from "../comprador.service";
import { FormGroup, FormControl, Validators, FormBuilder, NgControl } from "@angular/forms";
import { Comprador } from "../comprador";
import { ToastrService } from "ngx-toastr";
import { CompradorDetail } from "../comprador-detail";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-comprador-edit',
    templateUrl: 'comprador-edit.component.html',
    styleUrls: ['comprador-edit.component.css']
})

export class CompradorEditComponent implements OnInit
{
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
        private router: Router)
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

    /**
     * 
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
     * 
     */
    getCompradorDetail()
    {
        this.service.getCompradorDetail(this.id).subscribe(object =>
            {
                this.compradorDetail = object;
            });
    }

    /**
     * 
     */
    ngOnInit()
    {
        this.id = +this.route.snapshot.paramMap.get('id');
        if(this.id)
        {
            this.compradorDetail = new CompradorDetail();
            this.getCompradorDetail();
        }
    }
}