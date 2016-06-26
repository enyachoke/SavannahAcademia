import { Component, OnInit } from '@angular/core';
import { Term, TermService } from '../shared/index';

@Component({
  moduleId: module.id,
  selector: 'app-term-list',
  templateUrl: 'term-list.component.html',
  styleUrls: ['term-list.component.css']
})
export class TermListComponent implements OnInit {
  error: any;
  terms: Term[];
  getTerms() {
    this.termService.getAll().subscribe(terms => this.terms = terms);
  }
  constructor(private termService: TermService) { }

  ngOnInit() {
    this.getTerms();
  }
  delete(term: Term, event: any) {
    event.stopPropagation();
    this.termService
      .delete(term)
      .subscribe(res => {
      console.log(res);
      this.terms = this.terms.filter(h => h !== term);
    }, error => this.error = error);
  }


}
