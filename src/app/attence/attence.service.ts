import { Injectable } from '@angular/core';
import { Attence } from './attence';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttenceService {

  constructor(private http: HttpClient) { }
  getAttenceList(): Observable<Attence[]> {
    //   return of(attenceList);
    return this.http.get<Attence[]>("/api/attence");
}
}
