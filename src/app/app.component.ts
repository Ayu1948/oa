import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    title = 'oa';
    isCollapsed = false;
    signId = true;
    badgeC = { 'background-color': '#40a9ff' };
    sign() {
        if (this.signId) {
            this.signId = false;
            this.createNotification('success');
        } else {
            this.createNotification('warning');
        }
    }
    createNotification(type: string): void {
        if (type == 'success') {
            this.notification.create(
                type,
                '签到成功',
                '签到时间：' + this.datePipe.transform(new Date(),'yyyy年MM月dd日 HH:mm:ss')
            );
        } else {
            this.notification.create(
                type,
                '已签到',
                '签到时间：' + this.datePipe.transform(new Date(),'yyyy年MM月dd日 HH:mm:ss')
            );
        }

    }
    constructor(private notification: NzNotificationService, private datePipe: DatePipe) { }
}
