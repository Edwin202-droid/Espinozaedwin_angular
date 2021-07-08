import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HijoModel, Hijos } from '../interfaces/hijos.interface';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HijoService {

  apiURL = environment.apiURL + 'hijos';

  constructor(private http:HttpClient) { }

  
  public ObtenerHijos(id:string){
    let url = this.apiURL + '/' + id;
    return this.http.get<Hijos[]>(url)
  }

  public crearHijos(hijo:HijoModel){

    if(hijo.DerHabId){
      let url = this.apiURL + '/'+hijo.DerHabId;
      return this.http.put(url,hijo).pipe(
        map((resp:any)=>{
          Swal.fire('Datos actualizados', 'Los datos de '+ hijo.Nombre1 + ' fueron actualizados con exito','success');
          return resp.hijo;
        })
      );
    }else{
      return this.http.post(this.apiURL, hijo).pipe(
        map((resp:any)=>{
          Swal.fire('Registro creado', hijo.Nombre1 + ' agregado a la base de datos con exito','success');
          return resp.hijo;
        })
      )
    }
  }
  
  public eliminarHijo(id:string){
    let url = this.apiURL + '/' + id;
    return this.http.delete(url)
  }

  public ObtenerHijo(id:string):Observable<Hijos>{
    let url = this.apiURL + '/mostrar/' + id;
    return this.http.get<Hijos>(url)
  }
}
