import { Employee, Department } from './team';

export const empList: Employee[] = [
    {
        id: 301,
        name: '员工1',
        department: '部门1',
    },{
        id: 302,
        name: '员工2',
        department: '部门1',
    },{
        id: 303,
        name: '员工3',
        department: '部门2',
    },{
        id: 304,
        name: '员工4',
        department: '部门2',
    },{
        id: 305,
        name: '员工5',
        department: '部门2',
    },{
        id: 306,
        name: '员工6',
        department: '部门3',
    },{
        id: 307,
        name: '员工7',
        department: '部门3',
    }
]

export const depList: Department[] = [
    {
        id: 101,
        name: '部门1',
        pic: '员工1',
        total: 2,
        tip: '101-1'
    }, {
        id: 102,
        name: '部门2',
        pic: '员工2',
        total: 3,
        tip: '102-1'
    }, {
        id: 103,
        name: '部门3',
        pic: '员工1',
        total: 2,
        tip: '3-1'
    }
]
