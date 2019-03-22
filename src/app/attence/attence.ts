export class Attence {
    id: number;         // id -- 后面需要转序号
    type: string;       // 申请类型 
    ltype: string | null; // 请假类型
    propser: string;    // 申请人姓名 -- id
    pic: string;        // 负责人
    auditor: string;    // 审核人
    notify: string[];   // 知会人
    time: string;       // 申请时间
    stime: string;      // 起始时间
    etime: string;      // 结束时间
    status: any;        // 申请状态
    description: string;    // 申请原因
}