export class Employee {
    id: number;
    name: string;
    sex: string;
    department: string;     // 在职部门
    position: string;       // 职务
    birth: string;
}

export class Department {
    id: number;
    name: string;
    pic: string;    // 负责人姓名
    total: number;  // 部门总人数
    tip: string;    // 其他详情
}

export class EmpInDep {
    id: number;
    name: string;
    pic: string;    // 负责人姓名
    total: number;  // 部门总人数
    tip: string;    // 其他详情
    emp: Employee[];
}