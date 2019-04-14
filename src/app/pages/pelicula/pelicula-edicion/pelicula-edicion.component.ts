import { GeneroService } from 'src/app/_service/genero.service';
import { PeliculaService } from 'src/app/_service/pelicula.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Genero } from "src/app/_model/genero";
import { FormGroup, FormControl } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Pelicula } from "src/app/_model/pelicula";
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: "app-pelicula-edicion",
  templateUrl: "./pelicula-edicion.component.html",
  styleUrls: ["./pelicula-edicion.component.css"]
})
export class PeliculaEdicionComponent implements OnInit {
  id: number;
  form: FormGroup; // aqui se enlaza la vista con el html
  edicion: boolean = false;
  pelicula: Pelicula;
  generos: Genero[];
  idGeneroSeleccionado: number;
  urlImagen: string;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private _peliculaService: PeliculaService,
    private _generoService: GeneroService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      idPelicula: new FormControl(0),
      nombre: new FormControl(""),
      resena: new FormControl(""),
      duracion: new FormControl(0),
      fechaPublicacion: new FormControl(new Date()),
      urlPortada: new FormControl(""),
      genero: new FormControl("")
    });

    //con esto capturo los parametros de la url
    this.route.params.subscribe((params: Params) =>{
      this.id = params['id']; // esto es del router
      this.edicion = this.id != null;
      this.initForm(); // inicializa el formulario
    })

  }

  initForm(){
    this.listarGenero();
    if(this.edicion){
      this._peliculaService.listarPorId(this.id).subscribe(data=>{
        console.log(data);
        this.form = new FormGroup({
          idPelicula: new FormControl(data.idPelicula),
          nombre: new FormControl(data.nombre),
          resena: new FormControl(data.resena),
          duracion: new FormControl(data.duracion),
          fechaPublicacion: new FormControl(new Date(data.fechaPublicacion)),
          urlPortada: new FormControl(data.urlPortada),
          genero: new FormControl(data.genero)
        });
        this.urlImagen = data.urlPortada;
        this.idGeneroSeleccionado = data.genero.idGenero
      })

    }
  }

  listarGenero(){
    this._generoService.listar().subscribe(data =>{
      this.generos = data;
    })
  }

  operar() {
    let pelicula = new Pelicula();
    pelicula.idPelicula = this.form.value['idPelicula'];
    pelicula.urlPortada = this.form.value['urlPortada'];
    pelicula.resena = this.form.value['resena'];
    pelicula.nombre = this.form.value['nombre'];
    pelicula.duracion = this.form.value['duracion'];
    let genero = new Genero();
    genero.idGenero = this.idGeneroSeleccionado;
    pelicula.genero = genero;
    pelicula.fechaPublicacion = moment(this.form.value['fechaPublicacion']).format('YYYY-MM-DDTHH:mm:ss');

    if (this.edicion) {
      this._peliculaService.modificar(pelicula).subscribe(() => {
        this._peliculaService.listar().subscribe(data => {
          this._peliculaService.peliculaCambio.next(data);
          this._peliculaService.mensajeCambio.next('SE MODIFICO');
        });
      });
    } else {
      this._peliculaService.registrar(pelicula).subscribe(() => {
        this._peliculaService.listar().subscribe(data => {
          this._peliculaService.peliculaCambio.next(data);
          this._peliculaService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }
 
    this.router.navigate(['pelicula']);
  }
}
