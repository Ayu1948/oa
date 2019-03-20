import { Injectable } from '@angular/core';
import { Employee, Department } from './team';
import { EmpList, DepList } from './team-data';
import { Observable } from 'rxjs';
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
	getDepList(): Department[] {
        console.log(123);
		return DepList;
	}
	getEmpList(): Employee[] {
		return EmpList;
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
