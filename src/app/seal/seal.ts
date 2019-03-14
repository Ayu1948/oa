export class Seal {
    id: number;         // id -- 后面需要转序号
    type: string;       // 用章类型 -- 需要加id
    propser: string;    // 申请人姓名 -- id
    pic: string;        // 负责人
    auditor: string;    // 审核人
    time: any;          // 申请时间
    status: any;     // 申请状态
    description: string;    // 用章详情
}