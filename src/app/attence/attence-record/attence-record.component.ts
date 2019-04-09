import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AttenceService } from '../attence.service';
import { Attence } from '../attence';
import { Department, EmpInDep } from 'src/app/team/team';
import { TeamService } from 'src/app/team/team.service';
import { DatePipe } from '@angular/common';
import {
    FormGroup,
    FormBuilder,
    ValidationErrors,
    Validators
} from '@angular/forms';

@Component({
    selector: 'app-attence-record',
    templateUrl: './attence-record.component.html',
    styleUrls: ['./attence-record.component.less']
})
export class AttenceRecordComponent implements OnInit {
    attenceList: Attence[];
    depList: Department[];
    empInDepList: EmpInDep[];

    mapOfExpandData = {};
    editCache: { [key: string]: any } = {};

    delTipTitle = "确认撤销申请吗？";
    canEditTipTitle = "确认取消编辑吗？";

    inputVisible = false;
    inputValue = '';
    rangeData: Date[];

    validateForm: FormGroup;
    isVisible = false;
    appLtype = false;
    dateNow = new Date();
    selectTime: Date | Date[] = null;
    selectedValue = '1';

    @ViewChild('inputElement') inputElement: ElementRef;

    constructor(
        private attenceService: AttenceService,
        private teamService: TeamService,
        private datePipe: DatePipe,
        private fb: FormBuilder
    ) {
        this.validateForm = this.fb.group({
            id: [''],
            type: ['', [Validators.required]],
            ltype: null,
            pic: [''],
            auditor: [''],
            propser: ['', [Validators.required]],
            notify: [[]],
            description: ['', [Validators.required],],
            time: [''],
            timerange: [[]]
        });
    }
    // 获取数据
    getAttenceList(): void {
        this.attenceService.getAttenceList()
            .subscribe(attenceList => this.attenceList = attenceList);
        console.log(this.attenceList);
    }
    getDepList(): void {
        this.teamService.getDepList()
            .subscribe(depList => this.depList = depList);
        console.log(this.depList);
    }
    getEmpInDep(): void {
        this.teamService.getEmpInDep()
            .subscribe(empInDepList => this.empInDepList = empInDepList);
        console.log(this.empInDepList);
    }

    // 选择请假时显示请假类型
    showLtype(data): void {
        if (data.type == '请假') {
            const index = this.attenceList.findIndex(item => item.id === data.id);
            this.attenceList[index].type = '请假';
            this.attenceList[index].ltype = '事假';
            this.attenceList[index] = { ...this.attenceList[index] };
        }
    }

    // 编辑操作
    startEdit(id): void {
        this.editCache[id].edit = true;
        this.attenceList.forEach(item => {
            if (item.id === id) {
                this.mapOfExpandData[id] = true;
                let sd = this.stringTimeToDate(item.stime);
                let ed = this.stringTimeToDate(item.etime);
                this.rangeData = [sd, ed];
            }
        });
    }

    delAttence(id) {
        // 撤销申请
        this.attenceList.forEach(element => {
            if (element.id === id) {
                this.attenceList = this.attenceList.filter(d => d.id !== id);
            }
        });
    }
    cancelEdit(id): void {
        const index = this.attenceList.findIndex(item => item.id === id);
        this.editCache[id] = {
            data: { ...this.attenceList[index] },
            edit: false
        };
    }
    saveEdit(id): void {
        // 编辑按钮
        const index = this.attenceList.findIndex(item => item.id === id);
        if (this.rangeData) {
            this.attenceList[index].stime = this.datePipe.transform(this.rangeData[0], 'yyyy-MM-dd HH:mm');
            this.attenceList[index].etime = this.datePipe.transform(this.rangeData[1], 'yyyy-MM-dd HH:mm');
        }
        this.attenceList[index] = { ...this.attenceList[index] };
        Object.assign(this.attenceList[index], this.editCache[id].data);
        this.editCache[id].edit = false;
        this.rangeData = undefined;

    }
    updateEditCache(): void {
        this.attenceList.forEach(item => {
            this.editCache[item.id] = {
                edit: false,
                data: { ...item }
            };
        });
    }

    // 起止时间
    onChange(result: Date): void {
        console.log('Selected Time: ', result);
    }

    onOk(result: Date): void {
        console.log('onOk', result);
        this.rangeData = [result[0], result[1]];
    }

    // 字符串转化为日期格式
    stringTimeToDate(timeStr: string): Date {
        let resDate: Date;
        if (timeStr.indexOf("-") != -1) {
            let nyrArr: any = timeStr.split(' ')[0].split('-');
            let sfmArr: any = timeStr.split(' ')[1].split(':');
            resDate = new Date(nyrArr[0], nyrArr[1] - 1, nyrArr[2], sfmArr[0], sfmArr[1], 0, 0);
        }
        if (timeStr.indexOf(".") != -1) {
            let nyrArr: any = timeStr.split(' ')[0].split('.');
            let sfmArr: any = timeStr.split(' ')[1].split(':');
            resDate = new Date(nyrArr[0], nyrArr[1] - 1, nyrArr[2], sfmArr[0], sfmArr[1], 0, 0);
        }
        if (timeStr.indexOf("/") != -1) {
            let nyrArr: any = timeStr.split(' ')[0].split('/');
            let sfmArr: any = timeStr.split(' ')[1].split(':');
            resDate = new Date(nyrArr[0], nyrArr[1] - 1, nyrArr[2], sfmArr[0], sfmArr[1], 0, 0);
        }
        return resDate;
    }

    showModal(): void {
        this.isVisible = true;
    }
    handleOk(): void {
        console.log('click ok');
        this.isVisible = false;
    }

    handleCancel(): void {
        this.isVisible = false;
    }

    // 提交申请对话框

    // 显示请假类型
    appShowLtype(data): void {
        if (data === '请假') {
            this.appLtype = true;
        } else {
            this.appLtype = false;
        }
    }

    // 提交
    submitForm = ($event: any, value: any) => {
        $event.preventDefault();
        for (const key in this.validateForm.controls) {
            if (key === 'time') {
                value.time = this.datePipe.transform(this.dateNow, 'yyyy-MM-dd');
                value.id = 123;
            }
            this.validateForm.controls[key].markAsDirty();
            this.validateForm.controls[key].updateValueAndValidity();
        }
        this.handleOk();
        this.addSeal(value);
        console.log(value);
    };

    // 重置
    resetForm(e: MouseEvent): void {
        e.preventDefault();
        this.validateForm.reset();
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsPristine();
            this.validateForm.controls[key].updateValueAndValidity();
        }
    }
    addSeal(data) {
        this.isVisible = false;
        this.attenceList = [...this.attenceList, data];
        this.updateEditCache();
    }

    ngOnInit() {
        this.getAttenceList();
        // this.updateEditCache();
        this.getDepList();
        this.getEmpInDep();
        setTimeout(() => {
            this.updateEditCache();
            console.log(this.attenceList);
        }, 100);
    }

}
