import { Component, OnInit, Input, Output } from "@angular/core";
import { CompradorService } from "../comprador.service";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Comprador } from "../comprador";
import { EventEmitter } from "protractor";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'app-comprador-edit',
    templateUrl: 'comprador-edit.component.html',
    styleUrls: ['comprador-edit.component.css']
})

export class CompradorEditComponent implements OnInit
{
    /**
     * 
     */
    registrationForm : FormGroup;

    /**
     * 
     */
    isSubmitted: boolean = false;

    /**
     * 
     */
    @Input() comprador: Comprador;

    /**
     * 
     */
    @Output() update = new EventEmitter();

    constructor(private service:CompradorService,
        private formBuilder: FormBuilder,
        private toastrService: ToastrService)
    {
        this.comprador = new Comprador();
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

    /**
     * 
     */
    onEditFormSubmit()
    {
        this.isSubmitted = true;
        if(this.registrationForm.valid)
        {
            this.comprador = Object.assign({}, this.registrationForm.value);

            this.service.updateComprador(this.comprador).subscribe(object =>
                {
                    
                });
        }
    }

    ngOnInit()
    {

    }
}