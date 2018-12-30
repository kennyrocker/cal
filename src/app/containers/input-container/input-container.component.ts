import { Component, OnInit, Input } from '@angular/core';
import { CalData } from 'src/app/constants/interfaces/cal-data';
import { InputGroup } from 'src/app/constants/enums/input-group';

@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.css']
})
export class InputContainerComponent implements OnInit {

  public groupType = InputGroup;

  // tslint:disable-next-line:no-input-rename
  @Input('data') data: CalData;

  constructor() { }

  ngOnInit() {
  }

}
