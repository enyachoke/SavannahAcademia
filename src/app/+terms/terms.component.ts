import { Component, OnInit } from '@angular/core';
import { TermService } from './shared/index';
@Component({
  moduleId: module.id,
  selector: 'app-terms',
  templateUrl: 'terms.component.html',
  styleUrls: ['terms.component.css'],
  providers: [
    TermService,
  ]
})
export class TermsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
