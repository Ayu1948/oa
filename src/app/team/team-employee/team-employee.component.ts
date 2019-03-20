import { Component, OnInit, Input } from '@angular/core';
import { TeamService } from '../team.service';
import { Employee, Department } from '../team';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-team-employee',
    templateUrl: './team-employee.component.html',
    styleUrls: ['./team-employee.component.less']
})
export class TeamEmployeeComponent implements OnInit {

    EmpList: Employee[];
    DepList: Department[];
    EmpInDepList: { [key: string]: any } = {};
    @Input() emp: Employee;
    test: 123;
    // constructor(private teamService: TeamService) { }

    getEmpList(): void {
        this.EmpList = this.teamService.getEmpList();
        console.log(this.EmpList);
    }

    getDepList(): void {
        this.DepList = this.teamService.getDepList();
        console.log(this.DepList);
    }

    getEmpInDep(): void {
        this.EmpInDepList = this.DepList;
        let empData: Employee[] = [];
        for (const index in this.DepList) {
            this.EmpList.forEach(emp => {
                if (emp.department === this.DepList[index].name) {
                    empData.push(emp);
                    console.log(emp)
                }
            });
            this.EmpInDepList[index] = {
                data: this.DepList[index],
                emp: empData
            }
            empData = [];
        }
        console.log(this.EmpInDepList);
    }



    validateForm: FormGroup;
    submitForm = ($event: any, value: any) => {
        $event.preventDefault();
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
            this.validateForm.controls[key].updateValueAndValidity();
        }
        console.log(value);
    }

    resetForm(e: MouseEvent): void {
        e.preventDefault();
        this.validateForm.reset();
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsPristine();
            this.validateForm.controls[key].updateValueAndValidity();
        }
    }

    userNameAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors | null>) => {
        setTimeout(() => {
            if (control.value === 'JasonWood') {
                observer.next({ error: true, duplicated: true });
            } else {
                observer.next(null);
            }
            observer.complete();
        }, 1000);
    })

    confirmValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.validateForm.controls.password.value) {
            return { confirm: true, error: true };
        }
        return {};
    }

    constructor(
        private route: ActivatedRoute,
        private teamService: TeamService,
        private fb: FormBuilder
    ) {
        this.validateForm = this.fb.group({
            userId: [''],
            userName: ['', [Validators.required], [this.userNameAsyncValidator]],
            email: ['', [Validators.email, Validators.required]],
            // password: ['', [Validators.required]],
            // confirm: ['', [this.confirmValidator]],
            comment: ['', [Validators.required]]
        });
    }
    ngOnInit() {
        this.getEmpList();
        this.getDepList();
        this.getEmpInDep();
        this.getEmp();
    }
    getEmp(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        // this.emp = this.teamService.getEmp(id);
        this.EmpList.forEach(item => {
            if (item.id === id) {
                this.emp = item;
            }
        });
        console.log(this.emp);
        // this.teamService.getEmp(id)
        //     .subscribe(emp => {
        //         console.log(this.emp);
        //         console.log(emp);
        //         this.emp = emp;
        //     });
        // console.log(id);
    }

}
