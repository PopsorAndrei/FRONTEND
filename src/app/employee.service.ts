import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http'
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
 
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employees/`);
  }

  public addEmployee(employee :Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServerUrl}/employees/`, employee);
  }                                                               //era employee/add

  public updateEmployee(id:number,employee :Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerUrl}/employees/${id}`, employee);
  }
  
  public deleteEmployee(employeeId:number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/employees/${employeeId}`);
  }

  public getEmployeeById(employeeId:number): Observable<Employee>{
    return this.http.get<Employee>(`${this.apiServerUrl}/employees/${employeeId}`)

  }
  

}
