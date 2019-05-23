import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, NgControl } from "@angular/forms";

import { Comic } from '../Comic';
import { ComicDetail } from '../ComicDetail';
import { ComicService } from '../comic.service';

@Component({
  selector: 'app-comic-create',
  templateUrl: './comic-create.component.html',
  styleUrls: ['./comic-create.component.css']
})

export class ComicCreateComponent implements OnInit {

  updateForm: FormGroup;

  isSubmitted: boolean = false;

  comic: ComicDetail;

  idComic: number;

  @Input() nComic: Comic;

  @Output() update = new EventEmitter();

  constructor(
      private comicService: ComicService,
      private route: ActivatedRoute,
      private formBuilder: FormBuilder,
      private router: Router,
  )
  {
    this.nComic = new Comic();
    this.updateForm = this.formBuilder.group({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(90),
      ]),
      autor: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-z A-Z]*$')
      ]),
      anioSalida: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern('^[0-9]*$')
      ]),
      // perteneceColeccion: new FormControl({value: this.comic.perteneceColeccion}),
      // perteneceSerie: new FormControl({value: this.comic.perteneceSerie}),
      precio: new FormControl('', [
        Validators.required,
        Validators.maxLength(6),
        Validators.pattern('^[0-9]*.[0-9]*$')
      ]),
      // tema: new FormControl({value: this.comic.tema}),
      // enVenta: new FormControl({value: this.comic.enVenta}),
      imagen: new FormControl(''),
      informacion: new FormControl('', [
        Validators.maxLength(250),
      ]),
      // vendedor: new FormControl({value: this.comic.vendedor})
    });
  }

  submitForm(){
    this.isSubmitted = true;
    this.nComic = Object.assign({}, this.updateForm.value);
    this.nComic.id = this.comic.id;
    //this.nComic.vendedor = this.comic.vendedor;

    if(this.updateForm.get('nombre').value == ""){
      this.nComic.nombre = this.comic.nombre;
    }
    if(this.updateForm.get('autor').value == ""){
      this.nComic.autor = this.comic.autor;
    }
    if(this.updateForm.get('anioSalida').value == ""){
      this.nComic.anioSalida = this.comic.anioSalida;
    }

    this.nComic.perteneceColeccion = this.comic.perteneceColeccion;

    this.nComic.perteneceSerie = this.comic.perteneceSerie;

    if(this.updateForm.get('precio').value == ""){
      this.nComic.precio = this.comic.precio;
    }

    this.nComic.tema = this.comic.tema;

    this.nComic.enVenta = this.comic.enVenta;

    if(this.updateForm.get('informacion').value == ""){
      this.nComic.informacion = this.comic.informacion;
    }
    if(this.updateForm.get('imagen').value == ""){
      this.nComic.imagen = this.comic.imagen;
    }

    this.comicService.createComic(this.nComic).subscribe(object =>
    {
      this.updateForm.reset();
      this.router.navigate(['/comic/' + this.comic.id]);
    });
    this.update.emit();
  }

  ngOnInit() {

  }
}