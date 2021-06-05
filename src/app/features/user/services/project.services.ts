import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/shared/base-data.services';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private apiService: BaseDataService) { }
  
  public getProjectList(){
    return this.apiService.get(`Project/GetActiveProjects`);
  }

  public saveProject(params) {
    return this.apiService.request('POST', `Project/CreateProject`, params);
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
