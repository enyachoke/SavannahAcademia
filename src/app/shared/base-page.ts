export class BasePage {
  public loading: boolean;
  constructor(val: boolean) {
    console.log('Loading');
    this.loading = val;
  }
  standby() {
    console.log('Loading');
    this.loading = true;
  }
  ready() {
    console.log('Loading Done');
    this.loading = false;
  }
}
