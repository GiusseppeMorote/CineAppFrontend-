import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Comida } from './../_model/comida';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {
  comidaCambio = new Subject<Comida[]>();
  mensajeCambio = new Subject<string>(); // para mis mensajes del CREATE,UPDATE,DELETE
  url: string = `${environment.HOST_URL}/comidas`;
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Comida[]>(this.url);
  }
  listarPorId(id: number) { //comida: Comida
    return this.http.get(`${this.url}/${id}`, {
      responseType: 'blob'
    });
    // return this.http.get<Comida>(`${this.url}/${comida.idComida}`);
  }
  registrar(comida: Comida, file?: File) {
    let formdata: FormData = new FormData();
    formdata.append('file', file);

    const comidaBlob = new Blob([JSON.stringify(comida)], { type: "application/json" });
    formdata.append('comida', comidaBlob);
    console.log(comidaBlob);
    console.log(formdata);
    
    return this.http.post(`${this.url}`, formdata, {
      responseType: 'text'
    });
    // return this.http.post(this.url, comida);
  }
  modificar(comida: Comida, file?: File) {
    let formdata: FormData = new FormData();
    formdata.append('file', file);

    const comidaBlob = new Blob([JSON.stringify(comida)], { type: "application/json" });
    formdata.append('comida', comidaBlob);

    return this.http.put(`${this.url}`, formdata, {
      responseType: 'text'
    });
    // return this.http.put(this.url, comida);
  }
  eliminar(comida: Comida) {
    return this.http.delete(`${this.url}/${comida.idComida}`);
  }
}
