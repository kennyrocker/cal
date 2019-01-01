import { Component, OnInit, Input } from '@angular/core';
import { InputGroup } from 'src/app/constants/enums/input-group';
import { CalCycle } from 'src/app/constants/enums/cal-cycle';
import { MapperUtil } from 'src/app/utils/mapper-util';

@Component({
  selector: 'app-constant-item-component',
  templateUrl: './constant-item-component.component.html',
  styleUrls: ['./constant-item-component.component.css']
})
export class ConstantItemComponentComponent implements OnInit {

  public groupType = InputGroup;
  private calCycleEnum = CalCycle;
  public cycle = [];

  // tslint:disable-next-line:no-input-rename
  @Input('itemData') itemData: any;
  // tslint:disable-next-line:no-input-rename
  @Input('itemGroupType') itemGroupType: InputGroup;

  constructor() {
    this.cycle = MapperUtil.EnumMapToArray(this.calCycleEnum);
  }

  ngOnInit() {
    this.initSetup();
  }

  private initSetup(): void {

  }

}
