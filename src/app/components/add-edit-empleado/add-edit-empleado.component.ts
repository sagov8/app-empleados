import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';


@Component({
  selector: 'app-add-edit-empleado',
  templateUrl: './add-edit-empleado.component.html',
  styleUrls: ['./add-edit-empleado.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
}]
})
export class AddEditEmpleadoComponent implements OnInit {
  
  estadosCiviles: any[] = ['Soltero', 'Casado', 'Divorciado'];
  generos: any[] = ['Masculino', 'Femenino', 'No binario'];

  myForm: FormGroup;
  idEmpleado: any;
  accion = 'Crear';

  constructor(private fb: FormBuilder, 
    private empleadoService: EmpleadoService,
    private route: Router,
    private snackBar: MatSnackBar,
    private aRoute: ActivatedRoute) { 
    this.myForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.maxLength(30)]],
      correo: ['', [Validators.required, Validators.email]],
      fechaIngreso: ['', Validators.required],
      telefono: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      genero: ['', Validators.required],
    });
    this.idEmpleado = this.aRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    if(this.idEmpleado !== undefined){
      this.accion = 'Editar';
      this.esEmpleado();
    }
  }

  guardarEmpleado(){
    const empleado: Empleado = {
      nombreCompleto: this.myForm.get('nombreCompleto')!.value,
      correo: this.myForm.get('correo')!.value,
      fechaIngreso: this.myForm.get('fechaIngreso')!.value,
      telefono: this.myForm.get('telefono')!.value,
      estadoCivil: this.myForm.get('estadoCivil')!.value,
      genero: this.myForm.get('genero')!.value
    };
    if(this.idEmpleado !== undefined){
      this.editarEmpleado(empleado)
    }else{
      this.agregarEmpleado(empleado)
    }
    
  }

  agregarEmpleado(empleado: Empleado){
    this.empleadoService.agregarEmpleado(empleado);
    this.route.navigate(['/']);
    this.snackBar.open('El empleado se ha agregago correctamente', '',{ 
      duration: 2000
    });
  }

  editarEmpleado(empleado: Empleado){
    this.empleadoService.editEmpleado(empleado, this.idEmpleado);
    this.route.navigate(['/']);
    this.snackBar.open('El empleado se actualizó correctamente', '',{ 
      duration: 2000
    });
  }

  esEmpleado(){
    const empleado: Empleado = this.empleadoService.getEmpleado(this.idEmpleado);
    this.myForm.patchValue({
      nombreCompleto: empleado.nombreCompleto,
      correo: empleado.correo,
      fechaIngreso: empleado.fechaIngreso,
      telefono: empleado.telefono,
      estadoCivil: empleado.estadoCivil,
      genero: empleado.genero
    });
  }

}
