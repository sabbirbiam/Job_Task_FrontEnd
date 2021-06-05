import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common.service';
import { Project } from '../../model/project-model';
import { ProjectService } from '../../services/project.services';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { UserServices } from '../../services/user.services';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
@Component({
  selector: 'app-user-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectlistComponent implements OnInit {
  public projectList = [];
  public userList = [];
  public saveForm: FormGroup;
  public projectAssignForm: FormGroup;
  public activeTabIndex = 0;

  constructor(
    private projectService: ProjectService,
    private userService: UserServices,
    private fb: FormBuilder,
    private commonService: CommonService,
    private confirmationService: NgxBootstrapConfirmService
  ) { }

  ngOnInit(): void {
    this.getAllProject();
    this.createForm();
    this.createProjectAssignForm();
    this.getUsers();
    this.listenToChangeProject();
  }

  private createForm(): void {
    this.saveForm = this.fb.group({
      title: ['', Validators.required],
    });
  }
  private createProjectAssignForm(): void {
    this.projectAssignForm = this.fb.group({
      ProjectId: ['', Validators.required],
      UserIds: [[], Validators.required],
    });
  }

  getAllProject(): void {
    this.projectList.length = 0;
    this.projectService.getProjectList().subscribe(result => {
      result = JSON.parse(JSON.stringify(result));
      if (result['success']) {
        result['data'].forEach(element => {
          this.projectList.push(new Project(element))
        });
      }
    })
  }
  onClickDelete(id, index): void {
    let options = {
      title: 'Sure you want to delete this Project?',
      confirmLabel: 'Yes',
      declineLabel: 'No'
    }
    this.confirmationService.confirm(options).then((res: boolean) => {
      if (res) {
        this.projectService.deleteProject(id).subscribe(result => {
          const responseData = JSON.parse(JSON.stringify(result));
          this.commonService.toastSuccess(responseData.message);
          this.projectList.splice(index, 1);
        })
      } else {
        console.log('Cancel');
      }
    });
  }
  getUsers() {
    this.userService.getUsers().subscribe(result => {
      result = JSON.parse(JSON.stringify(result));
      if (result['success']) {
        result['data'].forEach(element => {
          this.userList.push(element)
        });
      }
    })

  }
  onSubmit() {
    if (!this.saveForm.valid)
      return;

    const title = this.saveForm.value.title;
    let saveObj = {
      title
    }
    this.projectService.saveProject(saveObj).subscribe(result => {
      const responseData = JSON.parse(JSON.stringify(result));
      if (responseData.success) {
        this.commonService.toastSuccess(responseData.message);
        this.saveForm.reset();
        this.getAllProject();
      }
    });
  }

  onAssign() {
    if (!this.projectAssignForm.valid)
      return;

    let assignObj = this.projectAssignForm.value;
    // console.log("assignObj", assignObj);
    // return;
    this.projectService.assignUserToProject(assignObj).subscribe(result => {
      const responseData = JSON.parse(JSON.stringify(result));
      if (responseData.success) {
        this.commonService.toastSuccess(responseData.message);
        this.getUsrsbyId(this.projectAssignForm.get('ProjectId').value);
        this.projectAssignForm.reset();
      }
    });
  }
  public userListByProjectId = [];

  listenToChangeProject() {
    this.projectAssignForm.get('ProjectId').valueChanges.subscribe(ProjectId => {
      
      if(ProjectId){
        this.getUsrsbyId(ProjectId);
      }
      console.log('name has changed:', ProjectId)
    });
  }

  getUsrsbyId(ProjectId){
    this.userService.getUserUnderProject(ProjectId).subscribe(result=>{
      const responseData = JSON.parse(JSON.stringify(result));
      if (responseData.success) {
        this.userListByProjectId = responseData.data[0].userList;
        // this.saveForm.reset();
        console.log(" this.userListByProjectId",  this.userListByProjectId);
      }
    })
  }

  public isShowOption(value){
    const found = this.userListByProjectId.find(user=>user.userId == value);
    if(found){
      return false;
    }
    else{
      return true;
    }
  }

}
