import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { Employee, Department } from '../team';

@Component({
    selector: 'app-team-department',
    templateUrl: './team-department.component.html',
    styleUrls: ['./team-department.component.less']
})
export class TeamDepartmentComponent implements OnInit {

    EmpList: Employee[];
    DepList: Department[];
    isVisible = false;
    constructor(private teamService: TeamService) { }

    getEmpList(): void {
        this.EmpList = this.teamService.getEmpList();
        console.log(this.EmpList);
    }
    
    getDepList(): void {
        this.DepList = this.teamService.getDepList();
        console.log(this.DepList);
    }

    showModal(): void {
        this.isVisible = true;
    }

    handleOk(): void {
        console.log('Button ok clicked!');
        this.isVisible = false;
    }

    handleCancel(): void {
        console.log('Button cancel clicked!');
        this.isVisible = false;
    }
    ngOnInit() {
        this.getDepList();
    }

}
