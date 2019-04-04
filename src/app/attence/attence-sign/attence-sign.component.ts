import { Component, OnInit } from '@angular/core';
import { Sign } from '../attence';
import { Department, EmpInDep } from 'src/app/team/team';
import { TeamService } from 'src/app/team/team.service';
import { AttenceService } from '../attence.service';


@Component({
    selector: 'app-attence-sign',
    templateUrl: './attence-sign.component.html',
    styleUrls: ['./attence-sign.component.less']
})
export class AttenceSignComponent implements OnInit {

    signList: Sign[];
    depList: Department[];
    empInDepList: EmpInDep[];
    getSignList(): void {
        this.attenceService.getSignList()
            .subscribe(signList => {this.signList = signList;console.log(this.signList);});
        }
    getDepList(): void {
        this.teamService.getDepList()
            .subscribe(depList => this.depList = depList);
    }
    getEmpInDep(): void {
        this.teamService.getEmpInDep()
            .subscribe(empInDepList => this.empInDepList = empInDepList);
    }
    constructor(
        private attenceService: AttenceService,
        private teamService: TeamService,
    ) { }

    ngOnInit() {
        this.getSignList();
        this.getDepList();
        this.getEmpInDep();
    }

}
