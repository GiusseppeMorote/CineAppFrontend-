import { HttpClient } from "@angular/common/http";
import { Configuracion } from "./../_model/configuracion";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ConfiguracionService {
  configuracionCambio = new Subject<Configuracion[]>();
  url: string = `${environment.HOST_URL}/configuraciones`;
  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Configuracion[]>(this.url);
  }
  listarPorId(configuracion: Configuracion){
    return this.http.get<Configuracion>(`${this.url}/${configuracion.idConfig}`);
  }
  registrar(configuracion: Configuracion) {
    return this.http.post(this.url, configuracion);
  }
  modificar(configuracion: Configuracion) {
    return this.http.put(this.url, configuracion);
  }
  eliminar(configuracion: Configuracion) {
    return this.http.delete(`${this.url}/${configuracion.idConfig}`);
  }
}
