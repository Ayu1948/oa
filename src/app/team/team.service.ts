import { Injectable } from '@angular/core';
import { Employee, Department, EmpInDep } from './team';
import { empList, depList } from './team-data';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
	providedIn: 'root'
})
export class TeamService {
    private empUrl = 'api/team-employee';

	constructor(private http: HttpClient) { }
	getDepList(): Observable<Department[]> {
		return of(depList);
	}
	getEmpList(): Observable<Employee[]> {
		return of(empList);
    }
    getEmpInDep(): Observable<EmpInDep[]> {
        let empInDepList: EmpInDep[] = [];
        let empText: Employee[] = [];
        for (const index in depList) {
            empList.forEach(emp => {
                if (emp.department === depList[index].name) {
                    empText.push(emp);
                    console.log(emp)
                }
            });
            empInDepList = [...empInDepList, {
                id: depList[index].id,
                name: depList[index].name,
                pic: depList[index].pic,
                total: depList[index].total,
                tip: depList[index].tip,
                emp: empText
            }]
            empText = [];
        }
        console.log(empInDepList);
        return of(empInDepList);
    }
    // getEmp(id: number): Employee {
    //     const url = `${this.empUrl}/${id}`;
    //     this.getEmpList().forEach(item => {
    //         if (item.id == )
    //     })
    //     return 
    //     // return this.http.get<Employee>(url);
    // }
}
