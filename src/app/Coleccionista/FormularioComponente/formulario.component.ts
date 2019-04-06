import { Component, OnInit } from "@angular/core";
import { listener } from "@angular/core/src/render3/instructions";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ColeccionistaModule } from "../coleccionista.module";


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
    coleccionista: ColeccionistaModule;

    constructor(protected formBuilder: FormBuilder)
    {
        this.registrationForm = this.formBuilder.group({
            firstName : new FormControl('',[
                Validators.required,
                Validators.minLength(3),  
                Validators.maxLength(30),  
                Validators.pattern('^[a-zA-Z ]*$')
            ]),
            lastName: new FormControl('',[
                Validators.required
            ]),
            alias: new FormControl('',[
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(30)
            ]),
            email:new FormControl('', [
                Validators.required,
                Validators.pattern(/^([\w\-\.]+)@((\[([0-9]{1,3}\.){3}[0-9]{1,3}\])|(([\w\-]+\.)+)([a-zA-Z]{2,4}))$/)
            ]),
            password: new FormControl('',[
                Validators.required,
                Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,10}$/)
            ])
        });
    }

    onRegistrationFormSubmit()
    {  
        this.isSubmitted = true;  
        if(this.registrationForm.valid)
        {      
            this.coleccionista.nombre =  this.registrationForm.value.firstName.toString() + " " + this.registrationForm.value.lastName.toString();
            this.coleccionista.correoElectronico = this.registrationForm.value.email;
            console.log("El correo: " + this.coleccionista.correoElectronico);
          //console.log("User Registration Form Submit", this.registrationForm.value.firstName);  
        }
    }

    ngOnInit()
    {
        
    }
}