import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  toggle: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  toggleSidebar() {
    this.toggle = !this.toggle;
  }
}
