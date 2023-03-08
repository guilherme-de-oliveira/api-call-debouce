import { Component } from "@angular/core";
import { Observable, Subject } from "rxjs"
import { AutocompleteService } from "./autocomplete.service";

@Component({
  selector: "autocomplete",
  template: `
    <div class="main">
      <div class="text-input">
        <input type="text" class="input" (keyup)="search($event)" />
      </div>
      <div class="list" *ngFor="let result of results$ | async">
        <a class="list-item">{{ result }}</a>
      </div>
    </div>
  `,
})

export class AutocompleteComponent {
  results$?: Observable<string[]>;
  subject = new Subject()

  constructor(private httpService: AutocompleteService) {}
  
  ngOnInit() {
    this.results$ = this.httpService.countries$;
  }

  search(query: any) {
    this.httpService.search(query.target.value);
  }
}
