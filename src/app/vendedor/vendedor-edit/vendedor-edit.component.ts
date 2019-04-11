
import { Component, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, FormControl,NgForm, Validators, FormArray } from "@angular/forms";
import { CompradorService } from "../../Comprador/comprador.service";
import { ToastrService } from "ngx-toastr";
import { EventEmitter } from "events";
import { Comprador } from "../../Comprador/comprador";
import { Vendedor } from "../../vendedor/vendedor";
import { VendedorService } from "../../vendedor/vendedor.service";
import { Router, ActivatedRoute } from "@angular/router";


@Component({
    selector:'app-vendedor-edit',
    templateUrl: 'vendedor-edit.component.html'
})

export class VendedorEditComponent implements OnInit
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
    checkboxGroup: FormGroup;

    /**
     * 
     */
    values: Array<String> = ["Comprador", "Vendedor"];

    /**
     * 
     */
    selectedRole = [];

    /**
     * 
     */
    valuesError: Boolean = true;

    /**
     * 
     */
    comprador:Comprador;

    /**
     * 
     */
    vendedor: Vendedor;

    /**
     * 
     */
    @Output() update = new EventEmitter();

    /**
     * 
     * @param formBuilder 
     * @param compradorService 
     * @param vendedorService 
     * @param toastrService 
     */
    constructor(private formBuilder: FormBuilder,
        private compradorService:CompradorService,
        private vendedorService: VendedorService,
        private toastrService: ToastrService,
        private router:Router,
        private route: ActivatedRoute,)
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

        this.checkboxGroup = this.formBuilder.group({
            myValues: this.addValuesControls()
        });
    }

    /**
     * 
     */
    addValuesControls()
    {
        const arr = this.values.map(element =>
            {
                return this.formBuilder.control(false);
            });
        return this.formBuilder.array(arr);
    }

    /**
     * 
     */
    get valuesArray()
    {
        return <FormArray>this.checkboxGroup.get('myValues');
    }

    /**
     * 
     */
    getSelectedRoleValue()
    {
        this.selectedRole = [];
        this.valuesArray.controls.forEach((control, i) =>
        {
            if(control.value)
            {
                this.selectedRole.push(this.values[i]);
            }
        });
        this.valuesError = this.selectedRole.length > 0 ? false : true;
    }

    /**
     * 
     */
    checkValuesChecked()
    {
        let flg = false;
        this.valuesArray.controls.forEach(control =>
            {
                if(control.touched)
                {
                    flg = true;
                }
            });  
        return flg;      
    }
    /**
     * 
     */
    onRegistrationFormSubmit()
    {  
        this.isSubmitted = true;  
        
        if(this.registrationForm.valid)
        {      
            this.comprador = Object.assign({}, this.registrationForm.value);
            this.vendedor = Object.assign({}, this.registrationForm.value);

            for (var i = 0; i < this.selectedRole.length; i++) {
                if (this.selectedRole[i] == "Comprador") {
                    this.compradorService.createComprador(this.comprador).subscribe(()=>
                    {
                        this.registrationForm.reset();
                        this.update.emit('');
                        this.toastrService.success("El comprador fue creado exitosamente", 'comprador añadido');
                    }, err =>
                    {
                        this.toastrService.error(err, 'Error');
                    });
                }
                else if (this.selectedRole[i] == "Vendedor") {
                    this.vendedorService.createVendedor(this.vendedor).subscribe(()=>
                    {
                        this.registrationForm.reset();
                        this.update.emit('');
                        this.toastrService.success("El vendedor fue creado exitosamente", 'vendedor añadido');
                    },
                    err =>
                    {
                        this.toastrService.error(err, "Error");
                    });
                }
            }
            this.router.navigate(['/home']);
        }
    }


     vendedorId:number;
    /**
    * The review to post
    */

    
  
    
    @Output() updateVendedores = new EventEmitter();
    
     putVendedor(vendedorForm: NgForm): Vendedor {
        
         if (this.vendedor!=null){
          
        this.vendedorService.updateVendedor(this.vendedorId,this.vendedor)
            .subscribe(() => {
                vendedorForm.resetForm();
                
                this.toastrService.success("La calificacion fue creada exitosamente", 'Calificación anadida');
            }, err => {
                this.toastrService.error(err, 'Error');
            });
         }
        return this.vendedor;
    }
   
    ngOnChanges() {
        this.ngOnInit();
    }
    starList: boolean[] = [true,true,true,true,true];       // create a list which contains status of 5 stars
    cancelEdition(): void {
        
        this.toastrService.warning('Este vendedor no fue editada', 'Edicion de vendedor');
       
    }
    ngOnInit()
    {
        this.vendedorId = +this.route.snapshot.paramMap.get('id');

        this.comprador = new Comprador();
        this.vendedor = new Vendedor();
        this.vendedorService.getVendedorDetail(this.vendedorId).subscribe(vendedor=>{this.vendedor=vendedor;});

    }
}