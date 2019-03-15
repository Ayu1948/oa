import { Component, OnInit, Input } from '@angular/core';
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

@Component({
    selector: 'app-seal-application',
    templateUrl: './seal-application.component.html',
    styleUrls: ['./seal-application.component.less']
})
export class SealApplicationComponent implements OnInit {
    @Input() seal: Seal;
    // propserValue;
    radioValue;
    picValue = 0;
    // auditorValue = 0;
    ngDescription = '';
    ngPropser = '';
    // constructor() { }

    validateForm: FormGroup;

    resetForm(e: MouseEvent): void {
        e.preventDefault();
        this.validateForm.reset();
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
        private route: ActivatedRoute,
        private sealService: SealService) {
        this.validateForm = this.fb.group({
            id: ['', [Validators.required]],
            type: ['', [Validators.required]],
            pic: ['', [Validators.required]],
            auditor: ['', [Validators.required]],
            propser: ['', [Validators.required], [this.userNameAsyncValidator]],
            description: ['', [Validators.required]]
        });
    }

    submitForm = ($event, value) => {
        $event.preventDefault();
        // for (const key in this.validateForm.controls) {
        //     this.validateForm.controls[key].markAsDirty();
        //     this.validateForm.controls[key].updateValueAndValidity();
        // }
        this.sealService.updateSeal(value)
            .subscribe(() => this.getSealData(value.id));
        console.log(value);
    }
    closeModel(): void {
        console.log('close');
    }
    getSealData(id: number): void {
        this.sealService.getSeal(id)
            .subscribe(seal => this.seal = seal);
    }
    ngOnInit() {
    }

}
