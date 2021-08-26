import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  myForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private empleadoService: EmpleadoService,
    private route: Router,
    private snackBar: MatSnackBar) { 
    this.myForm = this.fb.group({
      nombreCompleto: [''],
      correo: [''],
      fechaIngreso: [''],
      telefono: [''],
      estadoCivil: [''],
      genero: [''],
    });
  }

  ngOnInit(): void {
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
    this.empleadoService.agregarEmpleado(empleado);
    this.route.navigate(['/']);
    this.snackBar.open('El empleado se ha agregago correctamente', '',{ 
      duration: 2000
    });
  }

}
