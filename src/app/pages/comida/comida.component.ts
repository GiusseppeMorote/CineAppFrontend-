import { Comida } from './../../_model/comida';
import { MatSort } from '@angular/material';
import { ComidaService } from './../../_service/comida.service';
import { MatPaginator, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ComidaDialogoComponent } from './comida-dialogo/comida-dialogo.component';

@Component({
  selector: 'app-comida',
  templateUrl: './comida.component.html',
  styleUrls: ['./comida.component.css']
})
export class ComidaComponent implements OnInit {
  cantidad: number;
  dataSource: MatTableDataSource<Comida>;
  displayedColumns: string[] = ["idComida", "nombre","precio", "acciones"];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private _comidaService: ComidaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this._comidaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource<Comida>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this._comidaService.comidaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource<Comida>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    //me subscribo para poder obtener la informacion
    this._comidaService.mensajeCambio.subscribe(data =>{
      this.snackBar.open(data,'INFO',{
        duration: 2000
      })
    })
  }

  filter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(comida?: Comida) {
    //si viene una instancia vacia le doy una nueva instacia, sino es vacia le doy el objeto
    let com = comida != null ? comida : new Comida();
    this.dialog.open(ComidaDialogoComponent, {
      data: com,
      width: "250px"
    });
  }

  eliminar(comida: Comida) {
    this._comidaService.eliminar(comida).subscribe(
      ()=> {
        this._comidaService.listar().subscribe(data =>{
          this._comidaService.comidaCambio.next(data);         
          this._comidaService.mensajeCambio.next('Se Elimino');
        });
      });

  }

}
