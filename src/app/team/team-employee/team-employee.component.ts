import { Component, OnInit, Input } from '@angular/core';
import { TeamService } from '../team.service';
import { Employee, Department, EmpInDep } from '../team';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-team-employee',
    templateUrl: './team-employee.component.html',
    styleUrls: ['./team-employee.component.less']
})
export class TeamEmployeeComponent implements OnInit {

    empList: Employee[];
    depList: Department[];
    empInDepList: EmpInDep[];
    // empInDepList: { [key: string]: any } = {};
    @Input() emp: Employee = null;
    // constructor(private teamService: TeamService) { }
    public anyList: any;

    getEmpList(): void {
        this.teamService.getEmpList()
            .subscribe(empList => {
                this.empList = empList;
                console.log(this.empList)
            });
        // this.empList = this.teamService.getEmpList();
        console.log(this.empList);
    }

    getDepList(): void {
        this.teamService.getDepList()
            .subscribe(depList => this.depList = depList);
        // this.depList = this.teamService.getDepList();
        console.log(this.depList);
    }

    getEmpInDep(): void {
        this.teamService.getEmpInDep()
            .subscribe(empInDepList => this.empInDepList = empInDepList);
        // this.empInDepList = this.teamService.getEmpInDep();
        console.log(this.empInDepList);
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
        private http: HttpClient,
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
    getEmpId(id: number): void {
        console.log(id);
        this.emp = null;
        // if (id)
        // const id = 
        // this.emp = this.teamService.getEmp(id);
        // if (id !== 0) {
        this.empList.forEach(item => {
            if (item.id === id) {
                this.emp = item;
            }
        });
        // } else {
        //     this.empList.forEach(item => {
        //         if (item.id === 301) {
        //             this.emp = item;
        //         }
        //     });
        // }

        console.log(this.emp);
        // this.teamService.getEmp(id)
        //     .subscribe(emp => {
        //         console.log(this.emp);
        //         console.log(emp);
        //         this.emp = emp;
        //     });
        // console.log(id);
    }
    getEmpUrl(): void {
        this.emp = null;
        const id = +this.route.snapshot.paramMap.get('id');
        if (id !== 0) {
            this.empList.forEach(item => {
                if (item.id === id) {
                    this.emp = item;
                }
            });
        } else {
            this.empList.forEach(item => {
                if (item.id === 301) {
                    this.emp = item;
                }
            });
        }
        console.log(this.emp);
    }
    // 向服务器主动发送消息
    sendMessagegToServer() {
        this.teamService.sendMess("这是客户端发过来的消息");
    }

    ngOnInit() {
        // 订阅服务器发来消息产生的流
        this.teamService.creatObservableSocket("ws://localhost:8085")
            .subscribe(
                data => console.log(data),
                err => console.log(err),
                () => console.log("流已经结束")
            )
        this.getEmpList();
        this.getDepList();
        this.getEmpInDep();
        this.getEmpUrl();
        // this.http.get("/api/emp")
        //     .subscribe(empList => this.empList = empList);
    }
}
