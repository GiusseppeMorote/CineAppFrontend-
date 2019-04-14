import { Genero } from "src/app/_model/genero";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { GeneroService } from "src/app/_service/genero.service";

@Component({
  selector: "app-genero-dialogo",
  templateUrl: "./genero-dialogo.component.html",
  styleUrls: ["./genero-dialogo.component.css"]
})
export class GeneroDialogoComponent implements OnInit {
  genero: Genero;

  constructor(
    public dialogRef: MatDialogRef<GeneroDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Genero,
    private _generoService: GeneroService
  ) {}

  ngOnInit() {
    this.genero = new Genero();
    this.genero.idGenero = this.data.idGenero;
    this.genero.nombre = this.data.nombre;
  }

  operar() {
    if (this.genero.idGenero > 0) {
      //Modificar
      this._generoService.modificar(this.genero).subscribe(() => {
        this._generoService.listar().subscribe(data => {
          this._generoService.generoCambio.next(data);
          this._generoService.mensajeCambio.next("Se modifico correctamente");
        });
      });
    } else {
      //Registrar
      this._generoService.registrar(this.genero).subscribe(() => {
        this._generoService.listar().subscribe(data => {
          this._generoService.generoCambio.next(data);
          this._generoService.mensajeCambio.next("Se agrego correctamente");
        });
      });
    }
    this.closePopup();
  }
  cancelar() {
    this.closePopup();
  }

  closePopup() {
    this.dialogRef.close();
  }
}
