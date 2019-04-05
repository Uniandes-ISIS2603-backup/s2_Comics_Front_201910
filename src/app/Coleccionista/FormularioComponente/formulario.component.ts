import { Component, OnInit } from "@angular/core";
import { listener } from "@angular/core/src/render3/instructions";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";


@Component({
    selector:'app-form',
    templateUrl: 'formulario.component.html',
    styleUrls: ['formulario.component.css']
})


export class FormularioComponent implements OnInit
{
    registrationForm : FormGroup;
    isSubmitted: boolean = false;

    constructor(private formBuilder: FormBuilder)
    {
        this.registrationForm = this.formBuilder.group({
            firstName : new FormControl('',[
                Validators.required,
                Validators.minLength(3),  
                Validators.maxLength(30),  
                Validators.pattern('^[a-zA-Z ]*$')
            ])
        });
    }

    onRegistrationFormSubmit():void
    {  
        this.isSubmitted = true;  
        if(this.registrationForm.valid){        
          console.log("User Registration Form Submit", this.registrationForm.value);  
        }
    }

    ngOnInit()
    {
        
    }
}