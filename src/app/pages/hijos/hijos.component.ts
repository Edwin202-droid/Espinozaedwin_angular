import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ActualizaHijoComponent } from 'src/app/components/actualiza-hijo/actualiza-hijo.component';
import { HijoModel, Hijos } from 'src/app/interfaces/hijos.interface';
import { HijoService } from 'src/app/services/hijo.service';

@Component({
  selector: 'app-hijos',
  templateUrl: './hijos.component.html',
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
  .espacio{
    margin-right:10px;
  }
`]
})
export class HijosComponent implements OnInit {

  displayedColumns= ['NombreCompleto', 'Apellido', 'FechaNacimiento' ,'Acciones'];
  dataSource: Hijos[];
  id:string;
  hijo: Hijos;
  idPersonal:string;
  temp: Hijos;

  constructor(public formbuilder: FormBuilder,
              public router: Router,
              public hijoService:HijoService,
              public activatedRoute: ActivatedRoute,
              public dialog: MatDialog) { 

                activatedRoute.params.subscribe(params =>{
                  this.id = params['id'];
            
                })
        
              }
  
  form: FormGroup;

  ngOnInit() {
    this.form = this.formbuilder.group({
      ApPaterno: ['',[Validators.required, Validators.maxLength(10)]],
      ApMaterno: ['',[Validators.required, Validators.maxLength(10)]],
      Nombre1: ['',[Validators.required, Validators.maxLength(10)]],
      Nombre2: ['',[Validators.required, Validators.maxLength(10)]],
      FechaNacimiento: ['',[Validators.required]]
    });
    this.obtenerHijos();
    
  }

  obtenerHijos(){
    this.hijoService.ObtenerHijos(this.id).subscribe(hijos =>{
      this.dataSource= hijos;
    });
  }                                                                                                                                                                                                                         

  guardar(){
    if(this.form.invalid){return;}

    let usuario = new HijoModel(
      this.form.value.ApPaterno,
      this.form.value.ApMaterno,
      this.form.value.Nombre1,
      this.form.value.Nombre2,
      this.form.value.FechaNacimiento,
      this.id,
      this.idPersonal
    );
    
    if(this.id){
      this.hijoService.crearHijos(usuario).subscribe((resp:any)=>{
        this.obtenerHijos();
        this.router.navigate(['/hijos',this.id]);
        console.log(this.id);
        console.log(this.idPersonal);
        this.form.reset();
      });
    }
  }

  borrar(id:string){
    this.hijoService.eliminarHijo(id).subscribe(resp =>{
      this.obtenerHijos();
    })
  }

  cargarHijo(id:string){
    this.hijoService.ObtenerHijo(id).subscribe(hijo =>{
      this.hijo = hijo;
    })
  }

  idTrabajador(id:string){
    this.idPersonal = id;
  }

  openDialog(id:string){

    console.log(id);
    this.hijoService.ObtenerHijo(id).subscribe(hijo =>{
      this.temp = hijo

      const dialogRef = this.dialog.open(
        ActualizaHijoComponent,{
          width: '500px',
          data:{
            apPaterno: this.temp.apPaterno,
            apMaterno: this.temp.apMaterno,
            nombre1: this.temp.nombre1,
            nombre2: this.temp.nombre2,
            fechaNacimiento: this.temp.fechaNacimiento,
            personalId: this.temp.personalId,
            derHabId: this.temp.derHabId
          }
        })
    })
  }
}
