import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { VentaComponent } from "./pages/venta/venta.component";
import { ComidaComponent } from "./pages/comida/comida.component";
import { PeliculaEdicionComponent } from "./pages/pelicula/pelicula-edicion/pelicula-edicion.component";
import { ConfiguracionComponent } from "./pages/configuracion/configuracion.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GeneroComponent } from "./pages/genero/genero.component";
import { PeliculaComponent } from "./pages/pelicula/pelicula.component";

const routes: Routes = [
  { path: "genero", component: GeneroComponent },  
  {
    path: "pelicula",
    component: PeliculaComponent,
    children: [
      { path: "nuevo", component: PeliculaEdicionComponent },
      { path: "edicion/:id", component: PeliculaEdicionComponent }
    ]
  },
  { path: "comida", component: ComidaComponent },
  { path: "venta", component: VentaComponent },
  { path: "configuracion", component: ConfiguracionComponent },
  
  { path: "consulta", component: ConsultaComponent },
  { path: "reporte", component: ReporteComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
