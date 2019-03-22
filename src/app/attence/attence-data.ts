import { Attence } from "./attence";

export const attenceList: Attence[] = [
    {
        id: 201,
        type: '出差',
        ltype: null,
        propser: '员工1',
        pic: '员工3',
        auditor: '员工6',
        notify: ['员工2','员工3'],
        time: '2019-03-22',
        stime: '2019-03-23 9:00',
        etime: '2019-03-24 9:00',
        status: 0,
        description: '出差xxx地点，时长一天'
    }, {
        id: 202,
        type: '外勤',
        ltype: null,
        propser: '员工1',
        pic: '员工3',
        auditor: '员工6',
        notify: ['员工2'],
        time: '2019-03-22',
        stime: '2019-03-23 9:00',
        etime: '2019-03-24 9:00',
        status: 0,
        description: '外勤xxx地点，时长一天'
    }, {
        id: 203,
        type: '加班',
        ltype: null,
        propser: '员工1',
        pic: '员工3',
        auditor: '员工6',
        notify: ['员工2'],
        time: '2019-03-22',
        stime: '2019-03-23 9:00',
        etime: '2019-03-24 9:00',
        status: 0,
        description: '加班xxx地点，时长一天'
    }, {
        id: 204,
        type: '出差',
        ltype: null,
        propser: '员工1',
        pic: '员工3',
        auditor: '员工6',
        notify: ['员工2'],
        time: '2019-03-22',
        stime: '2019-03-23 9:00',
        etime: '2019-03-24 9:00',
        status: 0,
        description: '出差xxx地点，时长一天'
    }, {
        id: 205,
        type: '请假',
        ltype: '事假',
        propser: '员工1',
        pic: '员工3',
        auditor: '员工6',
        notify: ['员工2'],
        time: '2019-03-22',
        stime: '2019-03-23 9:00',
        etime: '2019-03-24 9:00',
        status: 0,
        description: '请事假一天'
    }
]