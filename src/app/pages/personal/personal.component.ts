import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Personal, PersonalModel } from 'src/app/interfaces/personal.interface';
import { PersonalService } from 'src/app/services/personal.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
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
  .espacio{
    margin-right:10px;
  }
`]
})
export class PersonalComponent implements OnInit {

  trabajador: Personal;
  id:string;

  constructor(public activatedRoute: ActivatedRoute,
              public personalService: PersonalService,
              public router: Router,
              public formBuilder: FormBuilder) {

    activatedRoute.params.subscribe(params =>{
      let id = params['id'];

      if(id !== 'nuevo' ){
        this.cargarTrabajador(id);
      }
    })
    /* this.trabajador = this.personalService.trabajador; */
    
  }
  
   form: FormGroup;

  ngOnInit() {
    this.form = this.formBuilder.group({
      ApPaterno: ['',[Validators.required, Validators.maxLength(10)]],
      ApMaterno: ['',[Validators.required, Validators.maxLength(10)]],
      Nombre1: ['',[Validators.required, Validators.maxLength(10)]],
      Nombre2: ['',[Validators.required, Validators.maxLength(10)]],
      FechaNacimiento:[''],
      FechaIngreso:[''],
      Dni: ['',[Validators.required]],
    });

    this.obtenerId();
  }

  obtenerId(){
    this.activatedRoute.params.subscribe(params =>{
      this.id= params['id'];
    });
  }

  guardar(){
    if(this.form.invalid){return;}

    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      return id;
    });

    let usuario = new PersonalModel(
      this.form.value.ApPaterno,
      this.form.value.ApMaterno,
      this.form.value.Nombre1,
      this.form.value.Nombre2,
      this.form.value.Dni,
      this.id,
      this.form.value.FechaNacimiento,
      this.form.value.FechaIngreso
    );

     this.personalService.guardar(usuario).subscribe(resp =>{
      this.router.navigate(['/home']);
    }); 
  }

  cargarTrabajador(id:string){
    this.personalService.ObtenerPersonalUnico(id).subscribe(trabajador =>{
      this.trabajador = trabajador;
    });
  }

}
