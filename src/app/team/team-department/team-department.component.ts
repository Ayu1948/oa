import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { EmpInDep, Employee } from '../team';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';

@Component({
    selector: 'app-team-department',
    templateUrl: './team-department.component.html',
    styleUrls: ['./team-department.component.less']
})
export class TeamDepartmentComponent implements OnInit {

    empInDepList: EmpInDep[] = [];
    eName: string;
    emp: Employee = null;
    isVisible = false;
    isAddVisble = false;
    isAdd = false;
    addTitle = '';
    depNow: EmpInDep = null;
    empInDepNow = [];
    editCache: { [key: string]: any } = {};
    validateForm: FormGroup;

    // getEmpList(): void {
    //     this.teamService.getEmpList()
    //         .subscribe((empList: Employee[]) => this.empList = empList);
    // }

    // getDepList(): void {
    //     this.teamService.getDepList()
    //         .subscribe((depList: Department[]) => {this.depList = depList; console.log(depList)});
    // }
    getEmpInDep(): void {
        this.teamService.getEmpInDep()
            .subscribe((empInDepList: EmpInDep[]) => this.empInDepList = empInDepList);
    }

    showElse(name): void {
        this.showModal();
        this.eName = name;
        this.empInDepList.forEach(item => {
            item.emp.forEach(emp => {
                if (emp.department == name) {
                    this.emp = emp;
                }
            });
        });
    }

    showModal(): void {
        this.isVisible = true;
    }

    handleOk(): void {
        console.log('Button ok clicked!');
        this.isVisible = false;
    }

    handleCancel(): void {
        // console.log('Button cancel clicked!');
        this.eName = '';
        this.isVisible = false;
    }
    resetForm(e: MouseEvent): void {
        e.preventDefault();
        this.validateForm.reset();
        // tslint:disable-next-line: forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsPristine();
            this.validateForm.controls[key].updateValueAndValidity();
        }
    };
    depNameAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
        setTimeout(() => {
            var repFlag = false;
            this.empInDepList.forEach(item => {
                if (item.name === control.value)
                    repFlag = true;
            });
            if (repFlag) {
                observer.next({ error: true, duplicated: true });
            } else {
                observer.next(null);
            }
            observer.complete();
        }, 500);
    });
    submitForm = ($event, value) => {
        $event.preventDefault();
        // tslint:disable-next-line: forin
        for (const key in this.validateForm.controls) {
            let id = 0;
            this.empInDepList.forEach(item => {
                if (id < item.id) {
                    id = item.id;
                }
            });
            value.id = id + 1;
            this.validateForm.controls[key].markAsDirty();
            this.validateForm.controls[key].updateValueAndValidity();
        }
        this.addDep(value);
        this.resetForm($event);
        console.log(value);
    }
    addDep(data): void {
        this.handleAddOk();
        this.empInDepList = [...this.empInDepList, data];
    }
    showAddModal(data): void {
        this.empInDepNow = [];
        if (!data) {
            this.isAdd = true;
            this.addTitle = '添加部门';
        } else {
            this.addTitle = '修改' + data;
            this.empInDepList.forEach(item => {
                if (item.name === data) {
                    this.depNow = item;
                    item.emp.forEach(emp => {
                        this.empInDepNow = [...this.empInDepNow, emp.name];
                    })
                }
            });
        }
        this.isAddVisble = true;
    }
    defaultEmp(data) {
        this.empInDepNow = [];
        console.log(data)
        if (data) {
            console.log(1)
            this.empInDepNow = [...this.empInDepNow, data];
        }
    }
    handleAddOk(): void {
        console.log('Button ok clicked!');
        this.isAddVisble = false;
    }

    handleAddCancel(): void {
        // console.log('Button cancel clicked!');
        this.isAddVisble = false;
    }
    constructor(
        private fb: FormBuilder,
        private teamService: TeamService
    ) {
        this.validateForm = this.fb.group({
            id: [''],
            name: ['', [Validators.required], [this.depNameAsyncValidator]],
            pic: ['', [Validators.required]],
            emp: [[]],
            tip: ['', [Validators.required]]
        });
    }
    ngOnInit() {
        // this.getDepList();
        this.getEmpInDep();

    }

}
