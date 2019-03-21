import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AppRoutingModule } from './app-routing.module';
import { SealApplicationComponent } from './seal/seal-application/seal-application.component';
import { SealRecordComponent } from './seal/seal-record/seal-record.component';
// import { InMemoryDataService } from './in-memory-data.service';
import { MessagesComponent } from './messages/messages.component';
import { TeamDepartmentComponent } from './team/team-department/team-department.component';
import { TeamEmployeeComponent } from './team/team-employee/team-employee.component';
import { AttenceRecordComponent } from './attence/attence-record/attence-record.component';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    SealApplicationComponent,
    SealRecordComponent,
    MessagesComponent,
    TeamDepartmentComponent,
    TeamEmployeeComponent,
    AttenceRecordComponent
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
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
