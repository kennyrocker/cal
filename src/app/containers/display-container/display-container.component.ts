import { Component, OnInit, Input } from '@angular/core';
import { CalData } from 'src/app/constants/interfaces/cal-data';

@Component({
  selector: 'app-display-container',
  templateUrl: './display-container.component.html',
  styleUrls: ['./display-container.component.css']
})
export class DisplayContainerComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('data') data: CalData;

  constructor() { }

  ngOnInit() {
  }

}
