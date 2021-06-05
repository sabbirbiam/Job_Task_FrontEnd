
import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { CommonModule } from '@angular/common';
import { StructureModule } from '../structure/structure.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserScreenlistComponent } from './components/user-screenlist/user-screenlist.component';
import { ProjectlistComponent } from './components/project-list/project-list.component';
import { NgxBootstrapConfirmModule } from 'ngx-bootstrap-confirm';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { EmployeeComponent } from './components/employee/employee.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
@NgModule({
    declarations: [
        UserComponent,
        UserScreenlistComponent,
        ProjectlistComponent,
        AdminDashboardComponent,
        EmployeeComponent,
        AddEmployeeComponent
    ],
    imports: [
        CommonModule,
        StructureModule,
        UserRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgxBootstrapConfirmModule,
        ChartsModule
    ],
    providers: [],
    bootstrap: [UserComponent]
})
export class UserModule { }
