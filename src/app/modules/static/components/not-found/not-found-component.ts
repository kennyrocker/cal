import { Component } from '@angular/core';


@Component({
    selector: 'app-not-found-component',
    templateUrl: './not-found-component.html',
    styleUrls: ['./not-found-component.scss']
  })
export class NotFoundComponent {
    constructor() {
      console.log('NotFound Constructor called');
    }
}
