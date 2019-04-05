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
                Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/)
            ])
        });
    }

    onRegistrationFormSubmit():void
    {  
        this.isSubmitted = true;  
        if(this.registrationForm.valid)
        {        
          console.log("User Registration Form Submit", this.registrationForm.value);  
        }
    }

    ngOnInit()
    {
        
    }
}