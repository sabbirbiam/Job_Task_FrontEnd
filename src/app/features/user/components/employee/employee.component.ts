import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataComService } from 'src/app/shared/services/data-com.service';
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
    private dataCom: DataComService,
    private router: Router
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

  onClickEdit(row) {

    console.log("row", row);
    this.dataCom.setPassedItemData(row);
    this.router.navigate(['/employee/update']);
  }

}
