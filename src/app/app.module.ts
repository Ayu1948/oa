import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { AppRoutingModule } from './app-routing.module';
import { SealApplicationComponent } from './seal/seal-application/seal-application.component';
import { SealRecordComponent } from './seal/seal-record/seal-record.component';
// import { InMemoryDataService } from './in-memory-data.service';
import { MessagesComponent } from './messages/messages.component';
import { TeamDepartmentComponent } from './team/team-department/team-department.component';
import { TeamEmployeeComponent } from './team/team-employee/team-employee.component';
import { AttenceRecordComponent } from './attence/attence-record/attence-record.component';
import { TeamService } from './team/team.service';
import { AttenceCalendarComponent } from './attence/attence-calendar/attence-calendar.component';


registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    SealApplicationComponent,
    SealRecordComponent,
    MessagesComponent,
    TeamDepartmentComponent,
    TeamEmployeeComponent,
    AttenceRecordComponent,
    AttenceCalendarComponent
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //     InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, TeamService],
  bootstrap: [AppComponent]
})
export class AppModule { }
