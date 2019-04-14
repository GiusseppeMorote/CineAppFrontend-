import { ComidaService } from './../../../_service/comida.service';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Comida } from './../../../_model/comida';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-comida-dialogo',
  templateUrl: './comida-dialogo.component.html',
  styleUrls: ['./comida-dialogo.component.css']
})
export class ComidaDialogoComponent implements OnInit {
  comida: Comida;
  imagenData: any;
  imagenEstado: boolean = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  labelFile: string;
  constructor(
    public dialogRef: MatDialogRef<ComidaDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Comida,
    private _comidaService: ComidaService,
    private sanitization: DomSanitizer
  ) { }

  ngOnInit() {
    this.comida = new Comida();
    this.comida.idComida = this.data.idComida;
    this.comida.nombre = this.data.nombre;
    this.comida.precio = this.data.precio;

    //traerla
    this._comidaService.listarPorId(this.data.idComida).subscribe(data => {
      this.convertir(data);
    });
  }

  convertir(data: any) {
    let reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      let x = reader.result;
      this.setear(x);                
    }
  }

  setear(x: any) {
    this.imagenData = this.sanitization.bypassSecurityTrustResourceUrl(x);
    this.imagenEstado = true;
  }

  selectFile(e: any) {    
    this.labelFile = e.target.files[0].name;
    this.selectedFiles = e.target.files;
  }

  operar() {
    if (this.selectedFiles != null) {
      this.currentFileUpload = this.selectedFiles.item(0);
    } else {
      this.currentFileUpload = new File([""], "blanco");
    }


    if (this.comida != null && this.comida.idComida > 0) {
      //Modificar
      this._comidaService.modificar(this.comida, this.currentFileUpload).subscribe(() => {
        this._comidaService.listar().subscribe(data => {
          this._comidaService.comidaCambio.next(data);
          this._comidaService.mensajeCambio.next("Se modifico correctamente");
        });
      });
    } else {
      //Registrar
      this._comidaService.registrar(this.comida, this.currentFileUpload).subscribe(() => {
        this._comidaService.listar().subscribe(data => {
          this._comidaService.comidaCambio.next(data);
          this._comidaService.mensajeCambio.next("Se agrego correctamente");
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
