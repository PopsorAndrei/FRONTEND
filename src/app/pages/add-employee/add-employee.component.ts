import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Optional } from '@angular/core';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../service/employee.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, ReactiveFormsModule , } from '@angular/forms';



@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styles: [
  ]
})
export class AddEmployeeComponent implements OnInit {


  title = 'FINAL';
  public employees!:Employee[];
  closeResult!: string;
  public editEmployee!: Employee;
  public deleteEmployee!: Employee;


  constructor(private employeeService : EmployeeService,
              private modalService: NgbModal) { }

  ngOnInit(){
    this.getEmployees();
  }

  public getEmployees() :void{
    this.employeeService.getEmployees().subscribe(
      (response : Employee[]) =>{
          this.employees = response;
          console.log(this.employees);
      },(error : HttpErrorResponse) =>{
        alert(error.message); 
      }
      );
  }

  

  

  public onAddEmloyee(addForm: NgForm): void {
    document.getElementById('add-employee-form')!.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  
 

}
