import { ActivatedRoute } from '@angular/router';
import { Genero } from 'src/app/_model/genero';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/_model/pelicula';
import { MatTableDataSource } from '@angular/material';
import { PeliculaService } from 'src/app/_service/pelicula.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {
 
 
dataSource: MatTableDataSource<Pelicula>;
displayedColumns = ['idPelicula', 'nombre', 'genero', 'acciones'];
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
  constructor(
    private _peliculaService: PeliculaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._peliculaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource<Pelicula>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this._peliculaService.peliculaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this._peliculaService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'INFO', {
        duration: 2000
      });
    });
  }

  eliminar(pelicula: Pelicula) {
    this._peliculaService.eliminar(pelicula).subscribe(() => {
      this._peliculaService.listar().subscribe(data => {
        this._peliculaService.peliculaCambio.next(data);
        this._peliculaService.mensajeCambio.next('SE ELIMINO');
      });      
    });
  }
}



