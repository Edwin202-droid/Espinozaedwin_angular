import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { HijoModel, Hijos } from 'src/app/interfaces/hijos.interface';
import { HijosComponent } from 'src/app/pages/hijos/hijos.component';
import { HijoService } from 'src/app/services/hijo.service';

export interface DialogData{
  apPaterno:string,
  apMaterno:string,
  nombre1: string,
  nombre2: string,
  fechaNacimiento:string,
  personalId:string
  derHabId:string,
}

@Component({
  selector: 'app-actualiza-hijo',
  templateUrl: './actualiza-hijo.component.html',
  styleUrls: ['./actualiza-hijo.component.css']
})
export class ActualizaHijoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<HijosComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              public formBuilder: FormBuilder,
              public hijoService: HijoService,
              public router: Router) { }
  
  form: FormGroup;

  ngOnInit() {
    console.log(this.data);

    this.form = this.formBuilder.group({
        ApPaterno: ['',[Validators.required, Validators.maxLength(10)]],
        ApMaterno: ['',[Validators.required, Validators.maxLength(10)]],
        Nombre1: ['',[Validators.required, Validators.maxLength(10)]],
        Nombre2: ['',[Validators.required, Validators.maxLength(10)]],
        FechaNacimiento: ['',[Validators.required]]
      });
    
  }

  actualizarHijo(){
    if(this.form.invalid){return; }
    let hijo = new HijoModel(
      this.form.value.ApPaterno,
      this.form.value.ApMaterno,
      this.form.value.Nombre1,
      this.form.value.Nombre2,
      this.form.value.FechaNacimiento,
      this.data.personalId,
      this.data.derHabId
    );

    this.hijoService.crearHijos(hijo).subscribe((resp:any)=>{
      this.dialogRef.close()
      this.router.navigate(['/home'])
      /* this.form.reset(); */
    });

  }

}
