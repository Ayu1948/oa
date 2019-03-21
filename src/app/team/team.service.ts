import { Injectable } from '@angular/core';
import { Employee, Department } from './team';
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
    // getEmp(id: number): Employee {
    //     const url = `${this.empUrl}/${id}`;
    //     this.getEmpList().forEach(item => {
    //         if (item.id == )
    //     })
    //     return 
    //     // return this.http.get<Employee>(url);
    // }
}
