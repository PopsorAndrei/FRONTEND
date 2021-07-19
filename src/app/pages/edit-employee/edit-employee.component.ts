import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Optional } from '@angular/core';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../service/employee.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-employee',
 templateUrl: `./edit-employee.component.html`,
  styles: [
  ]
})
export class EditEmployeeComponent implements OnInit {
  
  title = 'FINAL';
  public employees!:Employee[];
  closeResult!: string;
  public editEmployee!: Employee;
  public deleteEmployee!: Employee;
  public idForUpdate!: number;



  constructor(private employeeService : EmployeeService,
              private route:ActivatedRoute) { }

  ngOnInit(){

    this.getEmployees();

    this.route.params.subscribe(params =>{
      this.idForUpdate = params['id'];
    });
    this.getEmployeeById();

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


  public getEmployeeById():void {
    this.employeeService.getEmployeeById(this.idForUpdate).subscribe(
      (response :Employee) => {
        this.editEmployee = response;
        console.log("AJUNGE AICI  GET EMPLOYYE BY ID");
      },
      (error :HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }




  public onOpenModal(employee: Employee|null, mode: string) :void{

    console.log(employee);
    console.log(mode);
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal')

    if(employee !== null){
    if(mode === 'add'){
      button.setAttribute('data-target','#addEmployeeModal')
    }

    if(mode === 'delete'){
      this.deleteEmployee = employee;
      button.setAttribute('data-target','#deleteEmployeeModal')
    }

    if(mode === 'edit'){
      this.editEmployee = employee;
      button.setAttribute('data-target','#updateEmployeeModal')
      
    }
                          }


    if(mode === 'add'){
      button.setAttribute('data-target','#addEmployeeModal')
    }
    container?.appendChild(button);
    button.click();}

  
  




  public onUpdateEmloyee(employee : any): void {

    console.log("sadasdas");
    console.log(this.idForUpdate);
    console.log(employee);
    this.employeeService.updateEmployee(this.idForUpdate,employee).subscribe(
      (response: Employee) => {
        console.log(response);
        console.log("AICI0");
        this.getEmployees();
      
      },
      (error: HttpErrorResponse) => {
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
  
  public onDeleteEmloyee(employeeId: number ): void {

    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


}