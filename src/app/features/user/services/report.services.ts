import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/shared/base-data.services';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private apiService: BaseDataService) { }
  
  // public workSummaryReport(){
  //   return this.apiService.get(`report/WorkSummaryReport`);
  // }

  public workSummaryReport(params) {
    return this.apiService.request('POST', `report/WorkSummaryReport`, params);
  }

  // public updateProject(params) {
  //   return this.apiService.request("PUT", 'Project/CreateProject', params)
  // }

  // public deleteProject(id) {
  //   return this.apiService.request("DELETE", `Project/ArchiveProjectById/${id}`);
  // }
  // public assignUserToProject(params) {
  //   return this.apiService.request("POST", `Project/AssignUserToProject`, params);
  // }
}
