import { Component, OnInit } from '@angular/core';

import { Seal } from '../seal';
import { SealService } from '../seal.service';

@Component({
    selector: 'app-seal-record',
    templateUrl: './seal-record.component.html',
    styleUrls: ['./seal-record.component.less']
})
export class SealRecordComponent implements OnInit {
    mapOfExpandData = {};
    listOfData: Seal[];
    constructor(private sealList: SealService) { }
    getSealList(): void {
        this.listOfData = this.sealList.getSealList();
    }
    // listOfData = [
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
    isVisible = false;
    selectedSeal: Seal;
    selectedSeal2: Seal;
    showApplyModal(data) {
        this.isVisible = true;
        if (data !== undefined) {
            console.log(data);
            this.selectedSeal = data;
        }
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
    }

}
