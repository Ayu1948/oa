import { Component, OnInit } from '@angular/core';
import { AttenceService } from '../attence.service';
import { Attence } from '../attence';
import { DatePipe } from '@angular/common';
import { EmpInDep } from 'src/app/team/team';
import { TeamService } from 'src/app/team/team.service';

@Component({
    selector: 'app-attence-calendar',
    templateUrl: './attence-calendar.component.html',
    styleUrls: ['./attence-calendar.component.less']
})
export class AttenceCalendarComponent implements OnInit {
    attenceList: Attence[];
    empInDepList: EmpInDep[];
    dataMap = [];
    monthMap = [];
    badgeC = { 'background-color': '#40a9ff' };
    nowM = this.datePipe.transform(new Date(), 'M');
    listDataMap = {
        eight: [
            { type: 'warning', content: 'This is warning event.' },
            { type: 'success', content: 'This is usual event.' }
        ],
        ten: [
            { type: 'warning', content: 'This is warning event.' },
            { type: 'success', content: 'This is usual event.' },
            { type: 'error', content: 'This is error event.' }
        ],
        eleven: [
            { type: 'warning', content: 'This is warning event' },
            { type: 'success', content: 'This is very long usual event........' },
            { type: 'error', content: 'This is error event 1.' },
            { type: 'error', content: 'This is error event 2.' },
            { type: 'error', content: 'This is error event 3.' },
            { type: 'error', content: 'This is error event 4.' }
        ]
    };

    getMonthMap(e) {
        if (e.mode === "year") {
            let cc = 0, qj = 0, jb = 0, wq = 0,
                a = [];
            for (let i = 1; i <= 12; i++) {
                for (const index in this.dataMap) {
                    if (i === Number(index)) {
                        this.dataMap[i].forEach(day => {
                            day.forEach(d => {
                                if (d.content === '出差') cc++;
                                else if (d.content === '请假') qj++;
                                else if (d.content === '加班') jb++;
                                else wq++;
                            })
                        })
                        a[i] = [cc, qj, jb, wq];
                        cc = 0, qj = 0, jb = 0, wq = 0;
                        console.log(a)
                    }
                }

            }
            this.monthMap = a;
        }
    }
    getMonthData(date: Date): any | null {
        const m = date.getMonth()+1;
        if (this.monthMap[m]) return this.monthMap[m];
        return null;
    }
    // 获取数据
    getAttenceList(): void {
        this.attenceService.getAttenceList()
            .subscribe(attenceList => {
                this.attenceList = attenceList;
                attenceList.forEach(value => {
                    let m = this.datePipe.transform(value.stime, 'M'),
                        d = this.datePipe.transform(value.stime, 'd'),
                        type = (value.type === '外勤') ? 'success' :
                            (value.type === '出差') ? 'error' :
                                (value.type === '加班') ? 'warning' : 'default';
                    const t = { type: type, content: value.type };

                    if (this.dataMap[m] !== undefined) {
                        if (this.dataMap[m][d] !== undefined) {
                            this.dataMap[m][d].push(t);
                        } else {
                            this.dataMap[m][d] = [t];
                        }
                    } else {
                        this.dataMap[m] = [];
                        this.dataMap[m][d] = [t];
                    }
                })
            });
    }
    getEmpInDep(): void {
        this.teamService.getEmpInDep()
            .subscribe((empInDepList: EmpInDep[]) => this.empInDepList = empInDepList);
    }
    getM(select: Date) {
        this.nowM = this.datePipe.transform(select, 'M');
    }
    constructor(
        private attenceService: AttenceService,
        private datePipe: DatePipe,
        private teamService: TeamService
    ) { }

    ngOnInit() {
        this.getAttenceList();
        this.getEmpInDep();
        setTimeout(() => {
            console.log(this.attenceList);
            console.log(this.dataMap);
        }, 1000);
    }


}
