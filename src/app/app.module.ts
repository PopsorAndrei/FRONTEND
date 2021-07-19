import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './service/employee.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';

import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';
import { EditEmployeeComponent } from './pages/edit-employee/edit-employee.component';
import { OverviewComponent } from './pages/overview/overview.component';


@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    AddEmployeeComponent,
    EditEmployeeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

