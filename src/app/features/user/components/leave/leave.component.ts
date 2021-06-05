import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { DataComService } from 'src/app/shared/services/data-com.service';
import { Leave } from '../../model/leave-model';
import { LeaveService } from '../../services/leave.services';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

  leaveList = [];
  constructor(
    private leaveService: LeaveService,
    private dataCom: DataComService,
    private router: Router,
    private confirmationService: NgxBootstrapConfirmService

  ) { }

  ngOnInit(): void {
    this.getAllLeave();
  }

  private getAllLeave(): void {

    this.leaveList.length = 0;
    this.leaveService.getLeaveList().subscribe(result => {
      console.log("Result ", result);
      // debugger;
      if(result['success']) {
        result['data'].map(e => {
          this.leaveList.push(new Leave(e))
        });
      } 
      
    })
  }

  /**
   * onClickEdit
   */
  public onClickEdit(row): void {
    
    console.log("leave row", row);
    this.dataCom.setPassedItemData(row);
    this.router.navigate(['/leave/update']);
  }

   /**
   * onClickDelete
   */
    public onClickDelete(id, i): void {

      let options = {
        title: 'Sure you want to delete this Emloyee?',
        confirmLabel: 'Yes',
        declineLabel: 'No'
      }
      // this.confirmationService.confirm("dd")
      this.confirmationService.confirm(options).then(res => {
        if (res) {
          this.leaveService.deleteLeave(id).subscribe(res => {
  
            // debugger;
            if (res["success"]) {
              this.leaveList = this.leaveList.filter(item => item.id !== id);
            }
          })
        }
  
      })
    }

}
