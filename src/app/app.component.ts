import { Component, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import { SignService } from './attence/sign.service';

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
        const now = new Date(),
            date1 = Date.parse(this.datePipe.transform(now, 'yyyy-MM-dd 09:00:59')),
            time = Date.parse(this.datePipe.transform(now, 'yyyy-MM-dd HH:mm:ss'));

        if (this.signId) {
            this.signId = false;
            if (date1 < time) {
                this.createNotification('warning', now);
            } else this.createNotification('success', now);
        }
        this.signService.emitChange(time);
    }
    createNotification(type: string, now: Date): void {
        if (type == 'success') {
            this.notification.create(
                type,
                '签到成功，签到状态：正常',
                '签到时间：' + this.datePipe.transform(now, 'yyyy年MM月dd日 HH:mm:ss')
            );
        } else {
            this.notification.create(
                type,
                '签到成功，签到状态：迟到',
                '签到时间：' + this.datePipe.transform(now, 'yyyy年MM月dd日 HH:mm:ss')
            );
        }

    }
    constructor(
        private notification: NzNotificationService,
        private datePipe: DatePipe,
        private signService: SignService
    ) { }
}
