import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SealApplicationComponent } from './seal/seal-application/seal-application.component';
import { SealRecordComponent } from './seal/seal-record/seal-record.component';

const routes: Routes = [
    {
        path: 'seal-application',
        component: SealApplicationComponent,
        data: {
            breadcrumb: '/ seal-application'
        }
    },
    {
        path: 'seal-record',
        component: SealRecordComponent,
        data: {
            breadcrumb: '/ seal-record'
        }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
