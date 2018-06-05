import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ng-component-lab',
  encapsulation: ViewEncapsulation.None,
  template: `
    <router-outlet></router-outlet>
  `
})
export class ComponentLabComponent { }
