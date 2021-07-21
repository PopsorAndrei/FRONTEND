import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Optional } from '@angular/core';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../service/employee.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-employee',
 templateUrl: `./edit-employee.component.html`,
  styles: [
  ]
})

export class EditEmployeeComponent implements OnInit {
  updateForm: any;
  currentEmployee!: Employee;
  
  constructor(private fb: FormBuilder,
    private EmployeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getEmployee( this.route.snapshot.paramMap.get('id'));

   this.updateForm = this.fb.group({
      name : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      jobTitle : ['', Validators.required],
      phone : ['',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10}$')
        ]
      ],
      imageURL :['', Validators.required],
    });
    
  }

  get formControls() { return this.updateForm.controls; }

  public getEmployee(id:any): void{
    this.EmployeeService.getEmployeeById(id).subscribe(data =>{
      this.currentEmployee =data;
      this.updateFormValues();
      console.log(data);
    }, error => {console.log(error);});
  }

  updateFormValues() {
    this.updateForm.patchValue({
    name: this.currentEmployee.name,
    email: this.currentEmployee.email,
    jobTitle: this.currentEmployee.jobTitle,
    phone: this.currentEmployee.phone,
    imageURL :this.currentEmployee.imageURL
    });
  }

  public onSubmit(){
    if (this.updateForm.invalid) {
      return;
    }
      
    this.updateEmployee();
  }

  goToEmployeeList(){
    this.router.navigate(['']);
  }

  updateEmployee(): void {
    this.currentEmployee.name=this.updateForm.value.name;
    this.currentEmployee.email=this.updateForm.value.email;
    this.currentEmployee.phone=this.updateForm.value.phone;
    this.currentEmployee.jobTitle=this.updateForm.value.jobTitle;
    this.currentEmployee.imageURL=this.updateForm.value.imageURL;
   
    this.EmployeeService.updateEmployee(this.currentEmployee.id, this.currentEmployee)
    .subscribe(
    response => {
    console.log(response);
    this.goToEmployeeList();
    },
    error => {
    console.log(error);
    });
  }

  /*
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


*/
}