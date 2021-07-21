import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Optional } from '@angular/core';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../service/employee.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, NgForm, ReactiveFormsModule , Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styles: [
  ]
})
export class AddEmployeeComponent implements OnInit {


  title = 'FINAL';
  public employees!:Employee[];
  public addForm:any;



  constructor(private employeeService : EmployeeService,
              private router :Router,
              private fb:FormBuilder) { }

  ngOnInit(){

    this.addForm = this.fb.group({
      name : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      jobTitle : ['', Validators.required],
      phone : ['',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10}$')
        ]
      ],
      ImageURL :[''],
    });
  }

  addEmployee(): void {
    this.employeeService.addEmployee(this.addForm.value)
    .subscribe(
    response => {
    console.log(response);
    this.goToEmployeeList()
    },
    error => {
    console.log(error);
    });
  }

  public goToEmployeeList(){
    this.router.navigate(['']);
  }


  get formControls() { return this.addForm.controls; }
  
  public onSubmit(){

    if (this.addForm.invalid) {
      return;
    }
    this.addEmployee();
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

  

  



 

}
