
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { UserDashboardComponent } from "./components/user-dashboard/user-dashboard.component";
import { UserScreenlistComponent } from "./components/user-screenlist/user-screenlist.component";
import { ProjectlistComponent } from "./components/project-list/project-list.component";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { EmployeeComponent } from "./components/employee/employee.component";
import { AddEmployeeComponent } from "./components/add-employee/add-employee.component";


const routes: Routes = [
    {
        path: '', component: UserComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            { path: 'dashboard',  component: AdminDashboardComponent },
            // { path: 'dashboard',   component: UserDashboardComponent },
            { path: 'screen-list',   component: UserScreenlistComponent },
            { path: 'project', component: ProjectlistComponent },
            { path: 'employee', component: EmployeeComponent },
            { path: 'employee/add', component: AddEmployeeComponent },
          
        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }