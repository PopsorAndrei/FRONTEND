import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Optional } from '@angular/core';
import { Employee } from './model/employee';
import { EmployeeService } from './service/employee.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, NgForm, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Reference } from '@angular/compiler/src/render3/r3_ast';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'FINAL';
  public employees!:Employee[];
  closeResult!: string;
  public editEmployee!: Employee;
  public deleteEmployee!: Employee;
  public idForUpdate!: number;

  exForm!: FormGroup;


  constructor(private employeeService : EmployeeService,
              private modalService: NgbModal,private route:ActivatedRoute,
              private fb:FormBuilder) { }

  ngOnInit(){
    this.getEmployees();
    this.route.params.subscribe(params =>{
      this.idForUpdate = params['id'];
    });

 


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

  public onOpenModal(employee: Employee|null, mode: string) :void{

    console.log(employee);
    console.log(mode);
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal')

    if(employee !== null){
  

    if(mode === 'delete'){
      this.deleteEmployee = employee;
      button.setAttribute('data-target','#deleteEmployeeModal')
    }

    
    
    }


    if(mode === 'add'){
      button.setAttribute('data-target','#addEmployeeModal')
    }
    container?.appendChild(button);
    button.click();}

  
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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

  public onUpdateEmloyee(employee : Employee): void {

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

}
