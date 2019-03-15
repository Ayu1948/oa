import { Injectable } from '@angular/core';
import { Seal } from './seal/seal';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
    providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
    // constructor() { }
    createDb() {
        const sealList = [
            {
                id: 1,
                type: '公司章',
                propser: '郑郑',
                pic: 'aaa',
                auditor: 'xxx',
                time: '19.03.12',
                status: 0,
                description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
            },
            {
                id: 2,
                type: '合同章',
                propser: '李李',
                pic: 'bbb',
                auditor: 'yyy',
                time: '19.03.12',
                status: 1,
                description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
            },
            {
                id: 3,
                type: '公司章',
                propser: '郑郑',
                pic: 'aaa',
                auditor: 'xxx',
                time: '19.03.12',
                status: 0,
                description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
            }
        ];
        console.log({sealList});
        return {sealList};
    }
    // getId(sealList: Seal[]): number {
    //     return sealList.length > 0 ? Math.max(...sealList.map(seal => seal.id)) + 1 : 11;
    // }
}
