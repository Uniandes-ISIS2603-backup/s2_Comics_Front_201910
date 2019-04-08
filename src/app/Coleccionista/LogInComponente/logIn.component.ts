import { Component, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { CompradorService } from "../../Comprador/comprador.service";
import { Comprador } from "../../Comprador/comprador";
import { Router } from "@angular/router";
import { VendedorService } from "../../vendedor/vendedor.service";
import { Vendedor } from "../../vendedor/vendedor";

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
        private router: Router) {
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
                                    this.router.navigate(['vendedores/' + this.vendedor.id]);
                                    this.logInForm.reset();
                                }
                                else{
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

    ngOnInit() {

    }
}