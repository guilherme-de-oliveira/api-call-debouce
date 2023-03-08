import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import { concatAll, debounceTime, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AutocompleteService {
  subject = new Subject();
  countries$?: Observable<string[]>
  
  constructor(private http: HttpClient) {
    this.countries$ = this.subject.pipe(
      debounceTime(500),
      map(searchText => this.http.get<string[]>(`http://localhost:3000?q=${searchText}`)),
      concatAll()
    )
  }

  search(query: string) {
    this.subject.next(query);
  }
}
