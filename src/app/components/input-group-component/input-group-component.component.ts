import { Component, OnInit, Input } from '@angular/core';
import { InputGroup } from 'src/app/constants/enums/input-group';

@Component({
  selector: 'app-input-group-component',
  templateUrl: './input-group-component.component.html',
  styleUrls: ['./input-group-component.component.css']
})
export class InputGroupComponentComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('groupData') groupData?: any;
  // tslint:disable-next-line:no-input-rename
  @Input('groupType') groupType: InputGroup;

  constructor() { }

  ngOnInit() {
  }

}
