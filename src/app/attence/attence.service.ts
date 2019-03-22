import { Injectable } from '@angular/core';
import { Attence } from './attence';
import { attenceList } from './attence-data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttenceService {

  constructor() { }
  getAttenceList(): Observable<Attence[]> {
      return of(attenceList);
  }
}
