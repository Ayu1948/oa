import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AttenceService } from '../attence.service';
import { Attence } from '../attence';
import { Employee } from 'src/app/team/team';
import { TeamService } from 'src/app/team/team.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-attence-record',
    templateUrl: './attence-record.component.html',
    styleUrls: ['./attence-record.component.less']
})
export class AttenceRecordComponent implements OnInit {

    constructor(
        private attenceService: AttenceService,
        private teamService: TeamService,
        private datePipe: DatePipe
    ) { }

    attenceList: Attence[];
    empList: Employee[];
    mapOfExpandData = {};
    editCache: { [key: string]: any } = {};

    delTipTitle = "确认撤销申请吗？";
    canEditTipTitle = "确认取消编辑吗？";
    inputVisible = false;
    inputValue = '';
    rangeData: Date[];

    //mention 建议选项的取值方法
    valueWith = (data: Employee) => data.name;
    @ViewChild('inputElement') inputElement: ElementRef;

    // 获取数据
    getAttenceList(): void {
        this.attenceService.getAttenceList()
            .subscribe(attenceList => this.attenceList = attenceList);
        console.log(this.attenceList);
    }
    getEmpList(): void {
        this.teamService.getEmpList()
            .subscribe(empList => this.empList = empList);
        console.log(this.empList);
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

    // 知会人标签操作
    onClose(): void {
        console.log('tag was closed.');
    }

    afterClose(): void {
        console.log('after tag closed');
    }

    handleClose(id, removedTag: {}): void {
        let tags;
        this.attenceList.forEach(item => {
            if (item.id == id) {
                tags = item.notify;
                tags = tags.filter(tag => tag !== removedTag);
                item.notify = tags;
            }
        })
    }

    handleInputConfirm(id): void {
        let tags;
        this.attenceList.forEach(item => {
            if (item.id == id) {
                tags = item.notify;
                if (this.inputValue && this.inputValue !== '@' && tags.indexOf(this.inputValue) === -1) {
                    tags = [...tags, this.inputValue];
                    item.notify = tags;
                    console.log(tags);
                }
            }
        });
        this.inputValue = '';
        this.inputVisible = false;
    }

    onSelect(value): void {
        this.inputValue = value.name;
        console.log(value);
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

    ngOnInit() {
        this.getAttenceList();
        this.updateEditCache();
        this.getEmpList();
    }

}
