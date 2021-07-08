import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Personal, PersonalModel } from '../interfaces/personal.interface';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  apiURL = environment.apiURL + 'personal';
  trabajador: PersonalModel;

  constructor(private http: HttpClient) { }

  //Obtener todos los personales
  public ObtenerPersonal(){
    return this.http.get<Personal[]>(this.apiURL);
  }


  public ObtenerPersonalUnico(id:string):Observable<Personal>{
    let url = this.apiURL + '/' + id;
    return this.http.get<Personal>(url)
  }
  
  public Eliminar(id:string){
    let url = this.apiURL + '/' + id;
    return this.http.delete(url).pipe(
      map(resp =>{
        Swal.fire('Trabajador borrado', 'El trabajdor fue borrado con exito', 'success' );
        return true;
      })
    )
  }

  public guardar(trabajador:PersonalModel){
    if(trabajador.PersonalId !== 'nuevo'){
      let url = this.apiURL + '/'+trabajador.PersonalId
      return this.http.put(url,trabajador).pipe(
        map((resp:any)=>{
          Swal.fire('Datos actualizados', 'Los datos de '+ trabajador.Nombre1 + ' fueron actualizados con exito','success');
          return resp.trabajador;
        })
      );
    }
    else{
      return this.http.post(this.apiURL, trabajador).pipe(
        map((resp:any)=>{
          Swal.fire('Registro creado', trabajador.Nombre1 + ' agregado a la base de datos con exito','success');
          return resp.trabajador;
        })
      )
    }
  }

}
