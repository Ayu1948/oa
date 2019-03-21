export class Employee {
    id: number;
    name: string;
    department: string;    // 在职部门
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