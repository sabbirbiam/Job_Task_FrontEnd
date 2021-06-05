import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common.service';
import { Project } from '../../model/project-model';
import { ProjectService } from '../../services/project.services';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { UserServices } from '../../services/user.services';
import { ReportService } from '../../services/report.services';
import { ChartType } from 'chart.js';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { ProfileService } from '../../services/profile.services';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public projectList = [];
  public userList = [];
  public saveForm: FormGroup;
  public searchForm: FormGroup;
  public allReportProjectWise = [];
  public allReportUserWise = [];
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartLabels2: string[] = [];
  public doughnutChartData2: number[] = [];
  public activeTabIndex = 0;
  public doughnutChartOptions: any = {
    responsive: true,
    borderWidth: 0,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    elements: {
      arc: {
        borderWidth: 0, // <-- Set this to zero
        borderColor: '#333'
      }
    },
    pieceLabel: {
      render: function (args) {
        const value = args.value;
        return value;
      },
      fontColor: function (args) {
        return '#fff';
      }
    }
  };
  public doughnutChartType: ChartType = 'bar';
  public donutColors = [
    {
      backgroundColor: [
        "#015384",
        "#920F8D",
        "#00B5E9",
        "#00D3DB",
        "#FECB4C",
        "#FF8A00",
      ]
    }
  ];

  chartHovered(e) {

  }
  chartClicked(e) {

  }
  constructor(
    private projectService: ProjectService,
    private userService: UserServices,
    private fb: FormBuilder,
    private reportService: ReportService,
    public webStorageService: WebStorageService,
    public profileService: ProfileService,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    if(this.webStorageService.isAdmin()){
      this.getAllProject();
      this.getUsers();
    }
    this.createsearchForm();
    this.onSubmit();
  }

  private createsearchForm(): void {
    this.searchForm = this.fb.group({
      ProjectId: [''],
      UserId: [""],
      dateFrom: [null],
      dateTo: [null],
      showBy: [null],
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
    this.setDefaultValue();
    if (!this.searchForm.valid)
      return;

    let searchObj = this.searchForm.value;
    //  if(searchObj.dateFrom)
    if (!searchObj.ProjectId) {
      searchObj.ProjectId = "00000000-0000-0000-0000-000000000000";
    }
    if (!searchObj.UserId) {
      searchObj.UserId = "00000000-0000-0000-0000-000000000000";
    }
    searchObj.dateFrom = this.commonService.getDateDashFormate(searchObj.dateFrom);
    searchObj.dateTo = this.commonService.getDateDashFormate(searchObj.dateTo);
    
    console.log("searchObj", searchObj);
    // return;
    if(this.webStorageService.isUser()){
      // searchObj.showBy = "User";
      searchObj.UserId = this.webStorageService.getUser().userId;
      this.profileService.workSummaryReport(searchObj).subscribe(result=>{
        this.reportProjectWiseCalculation(result);
      });
      return;
    }
    if (this.webStorageService.isAdmin()) {
      this.reportService.workSummaryReport(searchObj).subscribe(result => {
        this.reportProjectWiseCalculation(result)
      });
      searchObj.showBy = "User";
      this.reportService.workSummaryReport(searchObj).subscribe(result => {
        this.reportUserWiseCalculation(result);
      });
    }
    
  }

  reportUserWiseCalculation(result){
    const responseData = JSON.parse(JSON.stringify(result));
      if (responseData.success) {
        this.allReportUserWise = responseData.data.projectUnderUserDTO;
        console.log("this.allReportUserWise", this.allReportUserWise);

        this.allReportUserWise.forEach(element => {
          let totalHour: number = 0;
          element.projectList.forEach(project => {
            totalHour += parseInt(project.projectActivityTotalScore);
          });
          //totalHour = (totalHour + Number(Math.random() * 10 + 5));
          this.doughnutChartLabels2.push(element.username);
          this.doughnutChartData2.push(totalHour);
        })

        // this.doughnutChartLabels2 = this.allReportUserWise[0].projectList.map(element => element.projectTitle);
        // this.doughnutChartData2 = this.allReportUserWise[0].projectList.map(element => {
        //   return parseInt(element.projectActivityTotalScore + Math.random()*10+5);
        // });
        console.log("doughnutChartData", this.doughnutChartData);

      }
  }


  reportProjectWiseCalculation(result){
    const responseData = JSON.parse(JSON.stringify(result));
    if (responseData.success) {
      this.allReportProjectWise = responseData.data.userUnderProjectDTO;
      this.allReportProjectWise.forEach(element => {
        let totalHour: number = 0;
        element.userList.forEach(user => {
          totalHour += parseInt(user.userActivityTotalScore);
        });
       // totalHour = (totalHour + Number(Math.random() * 10 + 5));
        this.doughnutChartLabels.push(element.projectTitle);
        this.doughnutChartData.push(totalHour);
      });
    }
  }

  private setDefaultValue() {
    this.doughnutChartLabels2.length = 0;
    this.doughnutChartData2.length = 0;
    this.doughnutChartLabels.length = 0;
    this.doughnutChartData.length = 0;
  }


  toggleAccordian(event, index) {
    var element = event.target;
    element.classList.toggle("active");
    if (this.allReportProjectWise[index].isActive) {
      this.allReportProjectWise[index].isActive = false;
    } else {
      this.allReportProjectWise[index].isActive = true;
    }
    var panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }

}
