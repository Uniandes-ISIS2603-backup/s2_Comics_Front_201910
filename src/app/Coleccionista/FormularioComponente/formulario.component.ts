import { Component, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Coleccionista} from "../coleccionista";
import { CompradorService } from "../../Comprador/comprador.service";
import { ToastrService } from "ngx-toastr";
import { EventEmitter } from "events";
import { Comprador } from "../../Comprador/comprador";
import { Vendedor } from "../../vendedor/vendedor";


@Component({
    selector:'app-form',
    templateUrl: 'formulario.component.html',
    styleUrls: ['formulario.component.css']
})

export class FormularioComponent implements OnInit
{
    registrationForm : FormGroup;
    isSubmitted: boolean = false;

    /**
     * 
     */
    coleccionista: Coleccionista;

    comprador:Comprador;
    vendedor: Vendedor;

    constructor(private formBuilder: FormBuilder,
        private compradorService:CompradorService,
        private toastrService: ToastrService)
    {
        this.comprador = new Comprador();
        this.vendedor = new Vendedor();
        this.registrationForm = this.formBuilder.group({
            id: new FormControl(0),
            nombre : new FormControl('',[
                Validators.required,
                Validators.minLength(3),  
                Validators.maxLength(30),  
                Validators.pattern('^[a-zA-Z ]*$')
            ]),
            alias: new FormControl('',[
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(30)
            ]),
            correoElectronico:new FormControl('', [
                Validators.required,
                Validators.pattern(/^([\w\-\.]+)@((\[([0-9]{1,3}\.){3}[0-9]{1,3}\])|(([\w\-]+\.)+)([a-zA-Z]{2,4}))$/)
            ]),
            password: new FormControl('',[
                Validators.required,
                Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,10}$/)
            ]),
            intereses: new FormControl(),
            foto : new FormControl()
        });
    }

    @Output() updateCompradores = new EventEmitter();

    onRegistrationFormSubmit()
    {  
        var elem1 = <HTMLInputElement>document.getElementById('defaultInline1');
        var c1 = elem1.checked;
        var elem2 = <HTMLInputElement>document.getElementById('defaultInline2');
        var c2 = elem2.checked;
        this.isSubmitted = true;  
        if (!c1 && !c2)
        {
            var error = <HTMLInputElement>document.getElementById('error');
            error.innerHTML = '<span style="color:red;">Debe seleccionar al menos un campo</span>';
        }

        if(this.registrationForm.valid)
        {      
            if(c1 && !c2)
            {
                this.comprador = Object.assign({}, this.registrationForm.value);
                console.log(this.comprador.id);
                this.compradorService.createComprador(this.comprador).subscribe(()=>{
                    this.registrationForm.reset();
                    this.updateCompradores.emit('');
                    this.toastrService.success("El comprador fue creado exitosamente", 'comprador añadido');
                }, err =>
                {
                    this.toastrService.error(err, 'Error');
                });
            }
            else if(c2 && !c1)
            {
                this.coleccionista = Object.assign({}, this.registrationForm.value);

                console.log(this.coleccionista);
            }
            else if(c1 && c2)
            {
                this.coleccionista = Object.assign({}, this.registrationForm.value);

                console.log(this.coleccionista);
            }
        }
    }

    ngOnInit()
    {
        this.comprador = new Comprador();
    }
}