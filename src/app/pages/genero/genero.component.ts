import { GeneroDialogoComponent } from "./genero-dialogo/genero-dialogo.component";
import { GeneroService } from "./../../_service/genero.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from "@angular/material";
import { Genero } from "src/app/_model/genero";

@Component({
  selector: "app-genero",
  templateUrl: "./genero.component.html",
  styleUrls: ["./genero.component.css"]
})
export class GeneroComponent implements OnInit {
  dataSource: MatTableDataSource<Genero>;
  displayedColumns: string[] = ["idGenero", "nombre", "acciones"];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _generoService: GeneroService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this._generoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource<Genero>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this._generoService.generoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource<Genero>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    //me subscribo para poder obtener la informacion
    this._generoService.mensajeCambio.subscribe(data =>{
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

  openDialog(genero?: Genero) {
    //si viene una instancia vacia le doy una nueva instacia, sino es vacia le doy el objeto
    let gen = genero != null ? genero : new Genero();
    this.dialog.open(GeneroDialogoComponent, {
      data: gen,
      width: "250px"
    });
  }

  eliminar(genero: Genero) {
    this._generoService.eliminar(genero).subscribe(
      ()=> {
        this._generoService.listar().subscribe(data =>{
          this._generoService.generoCambio.next(data);         
          this._generoService.mensajeCambio.next('Se Elimino');
        });
      });

  }
}
