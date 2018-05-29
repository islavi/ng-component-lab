import { Component } from '@angular/core';


@Component({
  selector: 'cl-layout',
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: row;
      min-width: 100vw;
      min-height: 100vh;
      box-sizing: border-box;
      background-color: rgb(247, 247, 247);
    }
  `]
})
export class LayoutComponent { }
