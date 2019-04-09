import { Component, OnInit } from '@angular/core';
import { Sign } from '../attence';
import { Department, EmpInDep } from 'src/app/team/team';
import { TeamService } from 'src/app/team/team.service';
import { AttenceService } from '../attence.service';
import { DatePipe } from '@angular/common';
import { SignService } from '../sign.service';
import { text } from '@angular/core/src/render3';


@Component({
    selector: 'app-attence-sign',
    templateUrl: './attence-sign.component.html',
    styleUrls: ['./attence-sign.component.less']
})
export class AttenceSignComponent implements OnInit {

    signList: Sign[];
    signListDisplay: Sign[];
    depList: Department[];
    empInDepList: EmpInDep[];
    selectTime: Date | Date[] = null;
    sortName: string | null = null;
    sortValue: string | null = null;
    selectedValue = '1';
    listOfSearchTime: string[] = [];
    listOfSearchDep: string[] = [];
    listOfSearchStatus: string[] = [];
    listOfStatus = [{ text: '正常', value: '正常' }, { text: '迟到', value: '迟到' }];
    listOfDep = [];
    nowSign: Sign;
    nowId = false;
    sort(sort: { key: string; value: string }): void {
        this.sortName = sort.key;
        this.sortValue = sort.value;
        this.search();
    }
    onChange(result: Date | Date[], type: number): void {
        this.listOfSearchTime = [];
        switch (type) {
            case 2:
                this.listOfSearchTime.push(this.datePipe.transform(result[0], 'yyyy-MM-dd'));
                this.listOfSearchTime.push(this.datePipe.transform(result[1], 'yyyy-MM-dd'));
                // this.listOfSearchTime = [...this.listOfSearchTime, this.datePipe.transform(result[0], 'yyyy-MM-dd')];
                break;
            case 3:
                this.listOfSearchTime = [...this.listOfSearchTime, this.datePipe.transform(result, 'yyyy-MM')];
                break;
            default:
                if (result) {
                    this.listOfSearchTime = [...this.listOfSearchTime, this.datePipe.transform(result, 'yyyy-MM-dd')];
                }
                break;
        }
        console.log(this.listOfSearchTime)
        this.search();
    }
    filter(listOfSearchDep: string[], listOfSearchStatus: string[]) {
        this.listOfSearchDep = listOfSearchDep;
        this.listOfSearchStatus = listOfSearchStatus;
        this.search();
    }
    resetFilters(): void {
        this.listOfStatus = [{ text: '正常', value: '正常' }, { text: '迟到', value: '迟到' }];
        this.getDepList();
        this.listOfSearchTime = [];
        this.listOfSearchDep = [];
        this.listOfSearchStatus = [];
        this.selectedValue = '1';
        this.selectTime = null;
        this.search();
    }
    resetSortAndFilters(): void {
        this.sortName = null;
        this.sortValue = null;
        this.resetFilters();
        this.search();
    }
    search(): void {
        /** filter data **/
        const filterFunc = (item: Sign) => {
            let flagTime = true, flagDep = false, flagStatus = true;
            // 时间过滤
            if (this.listOfSearchTime.length) {
                if (this.listOfSearchTime.length === 2) {
                    const date1 = Date.parse(this.listOfSearchTime[0]),
                        date2 = Date.parse(this.listOfSearchTime[1]),
                        time = Date.parse(item.time);
                    if (date1 < time && date2 > time) {
                    } else flagTime = false;
                } else {
                    flagTime = this.listOfSearchTime.some(time => item.time.indexOf(time) !== -1)
                }
            }
            // 员工的部门过滤
            if (this.listOfSearchDep.length) {
                this.empInDepList.forEach(eList => {
                    this.listOfSearchDep.forEach(sDep => {
                        if (eList.name === sDep) {
                            eList.emp.forEach(emp => {
                                if (emp.name === item.emp) {
                                    flagDep = true;
                                }
                            })
                        }
                    });

                })
            } else {
                flagDep = true;
            }
            // let flagDep = (this.listOfSearchDep.length ? this.listOfSearchDep.some(name => item.name.indexOf(name) !== -1) : true);
            // 签到状态过滤
            if (this.listOfSearchStatus.length) {
                flagStatus = this.listOfSearchStatus.some(status => item.status.indexOf(status) !== -1);
            }
            return flagTime && flagDep && flagStatus;
        }
        // const filterFunc = (item: Sign) =>
        //     (this.listOfSearchTime.length ? this.listOfSearchTime.some(time => item.time.indexOf(time) !== -1) : true);
        const data = this.signList.filter(item => filterFunc(item));
        /** sort data **/
        // const data = JSON.parse(JSON.stringify(this.signList));
        if (this.sortName && this.sortValue) {
            this.signListDisplay = data.sort((a, b) =>
                this.sortValue === 'ascend'
                    ? a[this.sortName!] > b[this.sortName!]
                        ? 1
                        : -1
                    : b[this.sortName!] > a[this.sortName!]
                        ? 1
                        : -1
            );
        } else {
            this.signListDisplay = data;
        }
    }
    getSignList(): void {
        this.attenceService.getSignList()
            .subscribe(signList => {
                this.signList = signList;
                this.signListDisplay = [...this.signList];
            });
    }
    getDepList(): void {
        this.teamService.getDepList()
            .subscribe(depList => {
                this.depList = depList;
                let depText = [];
                depList.forEach(dep => {
                    depText.push({
                        text: dep.name,
                        value: dep.name
                    });
                })
                this.listOfDep = [...depText];
            });
    }
    add() {
        this.signService.changeEmitted$.subscribe(
            text => {
                const today = Date.parse(this.datePipe.transform(new Date(), 'yyyy-MM-dd 09:00:59'));
                let status,
                    id = this.signList[this.signList.length - 1].id + 1;
                if (today < text) {
                    status = "迟到";
                } else {
                    status = "正常";
                }
                this.nowSign = {
                    id: id,
                    emp: '员工111',
                    time: this.datePipe.transform(text, 'yyyy-MM-dd HH:mm:ss'),
                    status: status
                }
                this.nowId = true;
            }
        )
    }
    getEmpInDep(): void {
        this.teamService.getEmpInDep()
            .subscribe(empInDepList => this.empInDepList = empInDepList);
    }
    constructor(
        private attenceService: AttenceService,
        private teamService: TeamService,
        private datePipe: DatePipe,
        private signService: SignService
    ) { }

    ngOnInit() {
        this.getSignList();
        this.getDepList();
        this.getEmpInDep();
        this.add();
    }

}
