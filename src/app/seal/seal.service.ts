import { Injectable } from '@angular/core';
import { Seal } from './seal';
import { SealList } from './seal-data';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../message.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class SealService {
    private sealListUrl = 'api/seal-record';
    constructor(private http: HttpClient, private messageService: MessageService) { }

    getSealList(): Seal[] {
        return SealList;
    }
    updateSeal(seal: Seal): Observable<any> {
        return this.http.put(this.sealListUrl, seal, httpOptions)
            .pipe(
                tap(_ => this.log(`updated seal id=${seal.id}`)),
                catchError(this.handleError<any>('updateSeal'))
            );
    }

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
