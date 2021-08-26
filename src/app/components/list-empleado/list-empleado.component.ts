import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/models/empleado';
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-list-empleado',
  styleUrls: ['list-empleado.component.css'],
  templateUrl: 'list-empleado.component.html',
})
export class ListEmpleadoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'nombreCompleto',
    'correo',
    'estadoCivil',
    'fechaIngreso',
    'genero',
    'telefono',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Empleado>();
  listEmpleados: Empleado[] = [];

  constructor(
    private empleadoService: EmpleadoService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar    
  ) {}

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.listEmpleados = this.empleadoService.getEmpleados();
    this.dataSource = new MatTableDataSource(this.listEmpleados);
    this.ngAfterViewInit();
  }

  eliminarEmpleado(index: number) {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: { mensaje: '¿Esta seguro que desea eliminar el empleado?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'aceptar') {
        this.empleadoService.eliminarEmpleado(index);
        this.cargarEmpleados();
        this.snackBar.open('El empleado se ha eliminado correctamente', '',{ 
          duration: 2000
        });
      }
    });
  }
}
