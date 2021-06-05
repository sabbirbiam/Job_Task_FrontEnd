import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/shared/base-data.services';

@Injectable({
  providedIn: 'root'
})
export class UserServices {

  constructor(private apiService: BaseDataService) { }
  
  public getUsers(){
    return this.apiService.get(`User/GetApplicationUsers`);
  }
  public getUserUnderProject(params){
    return this.apiService.get(`User/GetUserUnderProject/${params}`);
  }

  // public saveProject(params) {
  //   return this.apiService.request('POST', `Project/CreateProject`, params);
  // }

  // public updateProject(params) {
  //   return this.apiService.request("PUT", 'Project/CreateProject', params)
  // }

  // public deleteProject(id) {
  //   return this.apiService.request("DELETE", `Project/ArchiveProjectById/${id}`);
  // }
}
