import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/models/empleado';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-list-empleado',
  styleUrls: ['list-empleado.component.css'],
  templateUrl: 'list-empleado.component.html',
})
export class ListEmpleadoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombreCompleto', 'correo', 'estadoCivil', 'fechaIngreso', 'sexo', 'telefono', 'acciones'];
  dataSource = new MatTableDataSource<Empleado>();
  listEmpleados: Empleado[] = [];

  constructor(private empleadoService: EmpleadoService){}

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

  cargarEmpleados(){
    this.listEmpleados = this.empleadoService.getEmpleados();
    this.dataSource = new MatTableDataSource(this.listEmpleados);
  }

}