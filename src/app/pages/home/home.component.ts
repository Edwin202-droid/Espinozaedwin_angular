
import { Component, OnInit, Output } from '@angular/core';import { EventEmitter } from 'events';
;
import { Personal, PersonalModel } from 'src/app/interfaces/personal.interface';
import { PersonalService } from 'src/app/services/personal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    table {
      width: 100%;
      margin-top:20px;
    }
    .mat-form-field {
      font-size: 14px;
      width: 100%;
    }
    .pointer{
      cursor:pointer;
    }
    .centrado{
      text-align: center;
    }
  `]
})
export class HomeComponent implements OnInit {

  dataSource: Personal[];

  displayedColumns= ['ID', 'NombreCompleto', 'FechaNacimiento', 'FechaIngreso' ,'Acciones'];

  constructor(private personalService: PersonalService) { }

  ngOnInit() {
    this.ObtenerPersonal();
  }

  ObtenerPersonal(){
    this.personalService.ObtenerPersonal().subscribe(personal=>{
      this.dataSource= personal;
    });
  }

  borrar(id:string, nombre: string){

    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Seguro de borrar a ' + nombre,
      icon: 'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      cancelButtonText:'No',
      confirmButtonText:'Si'
    }).then((result)=>{
      if(result.isConfirmed){
        this.personalService.Eliminar(id).subscribe(resp=>{
          this.ObtenerPersonal();
        });
      }
    })
  }

}
