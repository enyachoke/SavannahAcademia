/**
 * Created by colinjlacy on 4/25/16.
 */
import {Component, Input} from '@angular/core';
import {NgSwitch, NgSwitchCase} from '@angular/common';

@Component({
  selector: 'loading-container',
  templateUrl: 'loading-container.html',
  styleUrls: ['loading-container.css'],
  directives: [NgSwitch, NgSwitchCase]
})
export class LoadingContainer {
  @Input() loading: boolean;
  constructor() { }
}

export class LoadingPage {
  public loading: boolean;
  constructor(val: boolean) {
    this.loading = val;
  }
  standby() {
    this.loading = true;
  }
  ready() {
    this.loading = false;
  }
}
