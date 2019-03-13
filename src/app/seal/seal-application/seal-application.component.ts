import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-seal-application',
    templateUrl: './seal-application.component.html',
    styleUrls: ['./seal-application.component.less']
})
export class SealApplicationComponent implements OnInit {
    propserValue;
    picValue;
    auditorValue;
    constructor() { }
    radioValue = 'A';
    resetForm(e: MouseEvent): void {
        e.preventDefault();
        // this.valida
    }
    ngOnInit() {
    }

}
