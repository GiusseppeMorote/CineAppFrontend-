import { ConfiguracionDialogoComponent } from './configuracion-dialogo/configuracion-dialogo.component';
import { ConfiguracionService } from "./../../_service/configuracion.service";
import { MatDialog } from "@angular/material";
import { MatSort } from "@angular/material";
import { MatPaginator } from "@angular/material";
import { ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { Component, OnInit } from "@angular/core";
import { Configuracion } from "src/app/_model/configuracion";

@Component({
  selector: "app-configuracion",
  templateUrl: "./configuracion.component.html",
  styleUrls: ["./configuracion.component.css"]
})
export class ConfiguracionComponent implements OnInit {
  dataSource: MatTableDataSource<Configuracion>;
  displayedColumns: string[] = ["idConfig", "parametro","acciones"];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private _configuracionService: ConfiguracionService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    //la primera vez que lista
    this._configuracionService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource<Configuracion>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    //en caso agrego/modifico/elimino
    this._configuracionService.configuracionCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource<Configuracion>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(configuracion?: Configuracion) {
    //si viene una instancia vacia le doy una nueva instacia, sino es vacia le doy el objeto
    let conf = configuracion!=null ? configuracion: new Configuracion();
    this.dialog.open(ConfiguracionDialogoComponent,{
      data: conf,
      width:"250px"
    });
  }
  eliminar(configuracion:Configuracion){

  }
}
