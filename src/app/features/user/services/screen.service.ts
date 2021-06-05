import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/shared/base-data.services';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor(private apiService: BaseDataService) { }
  
  public getScreenList(){
    return this.apiService.get(`screenCapture`);
  }

  public saveScreen(params) {
    return this.apiService.request('POST', `hr/jobTitle`, params);
  }

  public updateScreen(params) {
    return this.apiService.request("PUT", 'hr/jobTitle', params)
  }

  public deleteScreen(id) {
    return this.apiService.request("DELETE", `hr/jobTitle/${id}`);
  }
}
