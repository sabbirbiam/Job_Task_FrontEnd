import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/shared/base-data.services';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private apiService: BaseDataService) { }
  
  public getLeaveList(){
    return this.apiService.get(`leave/get-all-leaves`);
  }

  public saveLeave(params) {
    return this.apiService.request('POST', `leave/create-leave`, params);
  }

  public updateProject(params) {
    return this.apiService.request("PUT", 'employee/update-employee', params)
  }

  public deleteProject(id) {
    return this.apiService.request("DELETE", `Project/ArchiveProjectById/${id}`);
  }
  public assignUserToProject(params) {
    return this.apiService.request("POST", `Project/AssignUserToProject`, params);
  }
}
