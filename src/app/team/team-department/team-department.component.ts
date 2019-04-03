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
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-team-department',
    templateUrl: './team-department.component.html',
    styleUrls: ['./team-department.component.less']
})
export class TeamDepartmentComponent implements OnInit {

    empInDepList: EmpInDep[] = [];
    eName: string;
    empList: Employee[] = [];
    emp: Employee[] = [];
    isVisible = false;
    isAddVisble = false;
    isAdd = false;
    addTitle = '';
    depNow: EmpInDep = null;
    empInDepNow = [];
    editCache: { [key: string]: any } = {};
    validateForm: FormGroup;

    getEmpList(): void {
        this.teamService.getEmpList()
            .subscribe((empList: Employee[]) => this.empList = empList);
    }

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
        console.log(this.empInDepList);
        this.empInDepList.forEach(item => {
            if (item.name === name) {
                this.emp = item.emp;
                console.log(this.emp)
            }
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
    resetForm(e: MouseEvent, type: string): void {
        if (e !== undefined) {
            e.preventDefault();
        }
        let flag = false;
        if (type === 'edit') {
            flag = true;
        }
        if (flag) {
            const depNow = JSON.stringify(this.depNow);
            let empText = [],
                depText = JSON.parse(depNow);
            depText.emp.forEach(dep => {
                empText = [...empText, dep.name];
            });
            depText.emp = empText;
            this.empInDepNow = depText.emp;
            this.validateForm.reset(depText);
        } else {
            this.validateForm.reset();
            // tslint:disable-next-line: forin
            for (const key in this.validateForm.controls) {
                this.validateForm.controls[key].markAsPristine();
                this.validateForm.controls[key].updateValueAndValidity();
            }
        }
    };
    depNameAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
        setTimeout(() => {
            var repFlag = false;
            if (this.depNow === null) {
                this.empInDepList.forEach(item => {
                    if (item.name === control.value)
                        repFlag = true;
                });
            }
            if (repFlag) {
                observer.next({ error: true, duplicated: true });
            } else {
                observer.next(null);
            }
            observer.complete();
        }, 500);
    });
    submitForm = ($event, value, type) => {
        $event.preventDefault();
        // tslint:disable-next-line: forin
        let flag = false;
        if (type === 'add') {
            flag = true;
        }
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
            this.validateForm.controls[key].updateValueAndValidity();
        }
        if (flag) {
            let id = 0,
                picId = 0,
                empText = [];
            this.empInDepList.forEach(item => {
                if (id < item.id) {
                    id = item.id;
                }
                item.emp.forEach(emp => {
                    value.emp.forEach(emp2 => {
                        if (emp.name == emp2) {
                            empText = [...empText, emp];
                        }
                    })
                    if (emp.name === value.pic) {
                        picId = emp.id;
                    }
                })
            });
            value.id = id + 1;
            value.emp = empText;
            value.picId = picId;
            value.total = empText.length;
            this.addDep(value);
            this.resetForm($event, 'add');
        } else {
            let changeFlag = false;
            for (const key in this.depNow) {
                if (key !== 'emp') {
                    if (this.depNow[key] !== value[key]) {
                        changeFlag = true;
                    }
                } else {
                    let arr = [];
                    this.depNow.emp.forEach(dep => {
                        arr.push(dep.department);
                    })
                    if (arr.length === value.emp.length) {
                        for (let i = 0; i < arr.length; i++) {
                            // if (arr[i] !== value.emp[i]) {

                            // }
                    }
                    }

                }
            }
        }
        console.log(value);
    }
    addDep(data): void {
        this.handleAddOk();
        this.empInDepList = [...this.empInDepList, data];
    }
    delDep(id) {
        this.empInDepList.forEach(element => {
            if (element.id === id) {
                this.empInDepList = this.empInDepList.filter(d => d.id !== id);
                this.nzMessageService.info('删除成功');
            }
        });
    }
    showAddModal(data): void {
        this.empInDepNow = [];
        let e: MouseEvent;
        if (!data) {
            this.depNow = null;
            this.resetForm(e, 'add');
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
            console.log(this.empInDepNow)
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
        private teamService: TeamService,
        private nzMessageService: NzMessageService
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
        this.getEmpList();
    }

}
