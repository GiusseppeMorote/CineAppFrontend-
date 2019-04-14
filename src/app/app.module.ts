import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeneroComponent } from './pages/genero/genero.component';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';
import { HttpClientModule } from '@angular/common/http';
import { GeneroDialogoComponent } from './pages/genero/genero-dialogo/genero-dialogo.component';

import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { ConfiguracionDialogoComponent } from './pages/configuracion/configuracion-dialogo/configuracion-dialogo.component';
import { PeliculaEdicionComponent } from './pages/pelicula/pelicula-edicion/pelicula-edicion.component';
import { ComidaComponent } from './pages/comida/comida.component';
import { ComidaDialogoComponent } from './pages/comida/comida-dialogo/comida-dialogo.component';
import { VentaComponent } from './pages/venta/venta.component';

import { FlexLayoutModule } from '@angular/flex-layout'; // para que sea responsive
import {MatGridListModule} from '@angular/material/grid-list';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { ConsultaDialogoComponent } from './pages/consulta/consulta-dialogo/consulta-dialogo.component'; // para las grillas



@NgModule({
  declarations: [
    AppComponent,
    GeneroComponent,
    PeliculaComponent,
    GeneroDialogoComponent,
    ConfiguracionComponent,
    ConfiguracionDialogoComponent,
    PeliculaEdicionComponent,
    ComidaComponent,
    ComidaDialogoComponent,
    VentaComponent,
    ConsultaComponent,
    ReporteComponent,
    ConsultaDialogoComponent,
  ],
  entryComponents:[GeneroDialogoComponent,ConfiguracionDialogoComponent,ComidaDialogoComponent,ConsultaDialogoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule, //para ngModel
    ReactiveFormsModule, // para formularios

    FlexLayoutModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
