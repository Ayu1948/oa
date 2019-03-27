import { Injectable } from '@angular/core';
import { Employee, Department, EmpInDep } from './team';
// import { empList, depList } from './team-data';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
    providedIn: 'root'
})
export class TeamService {

    // 客户端服务
    ws: WebSocket;

    constructor(private http: HttpClient) { }
    getDepList(): Observable<Department[]> {
        // return of(depList);
        return this.http.get<Department[]>("/api/dep");
    }
    getEmpList(): Observable<Employee[]> {
        // return of(empList);
        return this.http.get<Employee[]>("/api/emp");
    }
    getEmpId(id: number): Observable<Employee> {
        return this.http.get<Employee>("/api/emp/" + id);
    }
    getEmpInDep(): Observable<EmpInDep[]> {
        return this.http.get<EmpInDep[]>("/api/empInDep");
    }

    // 定义返回一个流，这个流包含了服务器返回的消息
    creatObservableSocket(url: string): Observable<any> {
        this.ws = new WebSocket(url);//连接服务器
        return new Observable(
            observer => {
                // 发送下一个元素
                this.ws.onmessage = (event) => observer.next(event.data);
                // 抛出异常
                this.ws.onerror = (event) => observer.error(event);
                // 流结束
                this.ws.onclose = (event) => observer.complete();
            }
        )
    }

    // 向服务器发送一个消息
    sendMess(message: string) {
        this.ws.send(message);
        console.log(message);
    }

}
