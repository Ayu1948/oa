import { Component, OnInit, ViewChild } from '@angular/core';

import { Seal } from '../seal';
import { SealService } from '../seal.service';
import { NzMessageService } from 'ng-zorro-antd';
import { SealApplicationComponent } from '../seal-application/seal-application.component';

@Component({
    selector: 'app-seal-record',
    templateUrl: './seal-record.component.html',
    styleUrls: ['./seal-record.component.less']
})
export class SealRecordComponent implements OnInit {
    @ViewChild('applyM') applyM: SealApplicationComponent;
    mapOfExpandData = {};
    editCache: { [key: string]: any } = {};
    sealList: Seal[];
    isVisible = false;
    selectedSeal: Seal;
    resetMB = false;
    delSealTipTitle = '确认撤销这条申请吗?';
    canEditTipTitle = '确认取消编辑吗?';
    constructor(private nzMessageService: NzMessageService, private sealService: SealService) { }
    getSealList(): void {
        this.sealList = this.sealService.getSealList();
        // this.sealService.getSealList()
        //     .subscribe(sealList => {
        //         this.sealList = sealList;
        //         console.log(sealList);
        //     });
        // console.log(this.sealService.getSealList());
    }
    // sealList = [
    //     {
    //         id: 1,
    //         propser: '郑郑',
    //         type: '公司章',
    //         pic: 'aaa',
    //         auditor: 'xxx',
    //         expand: false,
    //         time: '19.03.12',
    //         status: 0,
    //         address: 'New York No. 1 Lake Park',
    //         description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
    //     },
    //     {
    //         id: 2,
    //         propser: '李李',
    //         type: '合同章',
    //         pic: 'bbb',
    //         auditor: 'yyy',
    //         expand: false,
    //         time: '19.03.12',
    //         status: 1,
    //         address: 'London No. 1 Lake Park',
    //         description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
    //     },
    //     {
    //         id: 3,
    //         propser: '郑郑',
    //         type: '公司章',
    //         pic: 'aaa',
    //         auditor: 'xxx',
    //         expand: false,
    //         time: '19.03.12',
    //         status: 0,
    //         address: 'Sidney No. 1 Lake Park',
    //         description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
    //     }
    // ];
    // mapOfSort = {
    //     id: null,
    //     propser: null,
    //     age: null,
    //     pic: null,
    //     auditor: null,
    //     expand: false,
    //     time: null,
    //     status: 0,
    //     address: null,
    //     description: null
    // };
    // sortName = null;
    // sortValue = null;

    // sort(sortName: string, value: string): void {
    //     this.sortName = sortName;
    //     this.sortValue = value;
    //     for (const key in this.mapOfSort) {
    //         this.mapOfSort[ key ] = (key === sortName ? value : null);
    //     }
    //     this.search(this.listOfSearchName, this.listOfSearchAddress)
    // }

    showApplyModal(e, data) {
        this.selectedSeal = undefined;  // 重置窗口
        if (data !== undefined) {
            console.log(data);
            this.selectedSeal = data;
        }
        this.showModal();
    }
    startEdit(id): void {
        this.editCache[id].edit = true;
        this.sealList.forEach(item => {
            if (item.id === id) {
                this.mapOfExpandData[id] = true;
            }
        });
    }
    cancelEdit(id): void {
        const index = this.sealList.findIndex(item => item.id === id);
        this.editCache[id] = {
            data: { ...this.sealList[index] },
            edit: false
        };
    }
    saveEdit(id): void {
        // 编辑按钮
        const index = this.sealList.findIndex(item => item.id === id);
        Object.assign(this.sealList[index], this.editCache[id].data);
        this.editCache[id].edit = false;

    }
    updateEditCache(): void {
        this.sealList.forEach(item => {
            this.editCache[item.id] = {
                edit: false,
                data: { ...item }
            };
        });
    }

    delSeal(id) {
        // 撤销申请
        this.sealList.forEach(element => {
            if (element.id === id) {
                this.sealList = this.sealList.filter(d => d.id !== id);
                this.nzMessageService.info('删除成功');
            }
        });
    }
    cancelDelSeal() {
        this.nzMessageService.info('取消成功');
    }

    addSeal(data) {
        this.sealList = [...this.sealList, data];
        this.handleCancel();
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
    ngOnInit() {
        this.getSealList();
        this.updateEditCache();
    }

}
