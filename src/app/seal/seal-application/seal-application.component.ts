import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Seal } from '../seal';
import { SealService } from '../seal.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-seal-application',
    templateUrl: './seal-application.component.html',
    styleUrls: ['./seal-application.component.less']
})
export class SealApplicationComponent implements OnInit {
    @Input() seal: Seal;
    @Output() addSeal: EventEmitter<any> = new EventEmitter();
    // propserValue;
    radioValue;
    radioType = '公司章';
    picValue = 'aaa';
    // auditorValue = 0;
    ngDescription = '';
    ngPropser = '';
    timeValue;
    // constructor() { }
    dateNow = new Date();

    validateForm: FormGroup;

    resetForm(e: MouseEvent): void {
        e.preventDefault();
        this.validateForm.reset();
        // tslint:disable-next-line: forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsPristine();
            this.validateForm.controls[key].updateValueAndValidity();
        }
    }

    // validateConfirmPassword(): void {
    //     setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
    // }

    userNameAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
        setTimeout(() => {
            if (control.value === 'JasonWood') {
                observer.next({ error: true, duplicated: true });
            } else {
                observer.next(null);
            }
            observer.complete();
        }, 1000);
    });

    // confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    //     if (!control.value) {
    //         return { required: true };
    //     } else if (control.value !== this.validateForm.controls.password.value) {
    //         return { confirm: true, error: true };
    //     }
    // };

    constructor(
        private fb: FormBuilder,
        private datePipe: DatePipe,
        private route: ActivatedRoute,
        private sealService: SealService) {
        this.validateForm = this.fb.group({
            id: [''],
            type: ['', [Validators.required]],
            pic: [''],
            auditor: [''],
            propser: ['', [Validators.required], [this.userNameAsyncValidator]],
            description: ['', [Validators.required],],
            time: ['']
        });
    }

    submitForm = ($event, value) => {
        $event.preventDefault();
        // tslint:disable-next-line: forin
        for (const key in this.validateForm.controls) {
            if (key === 'time') {
                value.time = this.datePipe.transform(this.dateNow, 'yyyy-MM-dd');
                // value.id = 123;
            }
            this.validateForm.controls[key].markAsDirty();
            this.validateForm.controls[key].updateValueAndValidity();
        }
        this.addSeal.emit(value);
    }
    ngOnInit() {
    }

}
