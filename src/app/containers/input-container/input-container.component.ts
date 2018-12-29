import { Component, OnInit, Input } from '@angular/core';
import { CalData } from 'src/app/constants/interfaces/cal-data';

@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.css']
})
export class InputContainerComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('data') data: CalData;

  constructor() { }

  ngOnInit() {
    console.log(' input container data => ', this.data);

  }

}
