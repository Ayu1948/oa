import { Injectable } from '@angular/core';
import { Employee, Department } from './team';
import { EmpList, DepList } from './team-data';

@Injectable({
	providedIn: 'root'
})
export class TeamService {

	constructor() { }
	getDepList(): Department[] {
		return DepList;
	}
	getEmpList(): Employee[] {
		return EmpList;
	}
}
