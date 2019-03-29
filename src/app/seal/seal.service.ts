import { Injectable } from '@angular/core';
import { Seal } from './seal';
import { SealList } from './seal-data';
import { Observable, of, observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../messages/message.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class SealService {
    seallog;
    private sealListUrl = 'http://localhost:8000/api/test.json';
    constructor(private messageService: MessageService, private http: HttpClient) { }
    // constructor(private http: HttpClient, private messageService: MessageService) { }

    // getSeal(id: number): Observable<Seal> {
    //     const url = `${this.sealListUrl}`;
    //     return this.http.get<Seal>(url).pipe(
    //         tap(_ => this.log(`fetched seal id=${id}`)),
    //         catchError(this.handleError<Seal>(`getSeal id=${id}`))
    //     );
    // }
    getSealList(): Observable<Seal[]> {
        return this.http.get<Seal[]>("/api/seal");
        // return SealList;
    }
    // getSealList(): Observable<Seal[]> {
    //     const t = this.http.jsonp<Seal[]>(this.sealListUrl, '');
    //     console.log(t);
    //     return t;
    // .pipe(
    //     // 使用 tap 来记录各种操作
    //     // 查看 Observable 中的值，使用那些值做一些事情，并且把它们传出来
    //     // 这种 tap 回调不会改变这些值本身
    //     tap(_ => this.log('fetched sealList')),
    //     catchError(this.handleError<Seal[]>('getSealList', []))
    // );
    // }
    // getSealNo404<Data>(id: number): Observable<Seal> {
    //     const url = `${this.sealListUrl}`;
    //     return this.http.get<Seal[]>(url)
    //         .pipe(
    //             map(sealList => sealList[0]), // returns a {0|1} element array
    //             tap(h => {
    //                 const outcome = h ? `fetched` : `did not find`;
    //                 this.log(`${outcome} seal id=${id}`);
    //             }),
    //             catchError(this.handleError<Seal>(`getSeal id=${id}`))
    //         );
    // }
    // updateSeal(seal: Seal): Observable<any> {
    //     return this.http.put(this.sealListUrl, seal, httpOptions)
    //         .pipe(
    //             tap(_ => this.log(`updated seal id=${seal.id}`)),
    //             catchError(this.handleError<any>('updateSeal'))
    //         );
    // }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a SealService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`SealService: ${message}`);
    }

}
