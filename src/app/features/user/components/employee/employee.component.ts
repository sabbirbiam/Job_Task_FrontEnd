import { Component, OnInit } from '@angular/core';
import { Employee } from '../../model/employee-model';
import { EmployeeService } from '../../services/employee.services';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public employeeList = [];

  constructor(
    private employeeService: EmployeeService,
  ) {

   }

  ngOnInit(): void {

    this.getAllEmployee();
  }

  private getAllEmployee(): void {

    this.employeeList.length = 0;
    this.employeeService.getEmployeeist().subscribe(result => {
      console.log("Result ", result);
      // debugger;
      if(result['success']) {
        result['data'].map(e => {
          this.employeeList.push(new Employee(e))
        });
      } 
     
      console.log("this.employeeList", this.employeeList);
      
    })
  }

}
