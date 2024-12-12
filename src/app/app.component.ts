import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from './shared/service.service';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})


export class AppComponent implements OnInit {

 
  
  displayedColumns: string[] = [
    'id',
    'firstname',
    'lastname',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'exp',
    'package',
    'action'
  ];
  
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private service: ServiceService) {}

  
  ngOnInit(): void {
    this.getEmployeeList();
  }

  Openeditform(): void {
    this.dialog.open(EditComponent);
  }
  editEmp(data:any){
    this.dialog.open(EditComponent,{
      data,
    })
  }

  getEmployeeList(): void {
    this.service.getallemploye().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: () => {
        alert('Error fetching employee data.');
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  deletEmp(id:number){
    this.service.deleteEmployee(id).subscribe({
      next:(res)=>{
        alert("Employee deleted")
        this.getEmployeeList();
      },
      error:console.log,
      
    })
  }

  
}
