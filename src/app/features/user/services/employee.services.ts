import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/shared/base-data.services';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private apiService: BaseDataService) { }
  
  public getEmployeeist(){
    return this.apiService.get(`employee/get-all-employee`);
  }

  public saveProject(params) {
    return this.apiService.request('POST', `employee/create-employee`, params);
  }

  public updateProject(params) {
    return this.apiService.request("PUT", 'Project/CreateProject', params)
  }

  public deleteProject(id) {
    return this.apiService.request("DELETE", `Project/ArchiveProjectById/${id}`);
  }
  public assignUserToProject(params) {
    return this.apiService.request("POST", `Project/AssignUserToProject`, params);
  }
}
