import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Configuracion } from 'src/app/_model/configuracion';
import { ConfiguracionService } from 'src/app/_service/configuracion.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-configuracion-dialogo',
  templateUrl: './configuracion-dialogo.component.html',
  styleUrls: ['./configuracion-dialogo.component.css']
})
export class ConfiguracionDialogoComponent implements OnInit {
  configuracion:Configuracion;
  constructor(
    public dialogRef: MatDialogRef<ConfiguracionDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Configuracion,
    private _configuracionService: ConfiguracionService
  ) { }

  ngOnInit() {
    this.configuracion = new Configuracion();
    this.configuracion.idConfig = this.data.idConfig;
    this.configuracion.parametro = this.data.parametro;
  }

  operar(){
    if(this.configuracion.idConfig>0){
      //modificar
      this._configuracionService.modificar(this.configuracion).subscribe(()=>{
        this._configuracionService.listar().subscribe(data=>{
          //le paso la lista que esta en data a mi Subject
          this._configuracionService.configuracionCambio.next(data);
        })
      });
    }else{
      //registrar
      this._configuracionService.registrar(this.configuracion).subscribe(()=>{
        this._configuracionService.listar().subscribe(data=>{
          //le paso la lista que esta en data a mi Subject
          this._configuracionService.configuracionCambio.next(data);
        })
      });
    }
    this.closePopup();
  }
  cancelar(){
    this.closePopup();
  }
  closePopup(){
  this.dialogRef.close();
  }
}
