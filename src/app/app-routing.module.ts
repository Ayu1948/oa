import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SealRecordComponent } from './seal/seal-record/seal-record.component';
import { TeamDepartmentComponent } from './team/team-department/team-department.component';
import { TeamEmployeeComponent } from './team/team-employee/team-employee.component';

const routes: Routes = [
    {
        path: 'seal-record',
        component: SealRecordComponent,
        data: {
            breadcrumb: '/ seal-record'
        }
    }, {
        path: 'team-department',
        component: TeamDepartmentComponent,
        data: {
            breadcrumb: '/ team-department'
        }
    }, {
        path: 'team-employee',
        component: TeamEmployeeComponent,
        data: {
            breadcrumb: '/ team-employee'
        }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
