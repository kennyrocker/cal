import { Component, OnInit, Input } from '@angular/core';
import { InputGroup } from 'src/app/constants/enums/input-group';
import { CalCycle } from 'src/app/constants/enums/cal-cycle';
import { MapperUtil } from 'src/app/utils/mapper-util';
import { format } from 'url';

import { Store } from '@ngrx/store';
import * as reducerRoot from '../../reducers/index';
import { DeletePeriodicalVariableItemAction } from 'src/app/actions/calData.action';

@Component({
  selector: 'app-periodic-item-component',
  templateUrl: './periodic-item-component.component.html',
  styleUrls: ['./periodic-item-component.component.css']
})
export class PeriodicItemComponentComponent implements OnInit {

  public groupType = InputGroup;
  private calCycleEnum = CalCycle;
  public cycle = [];

  public affectiveMonth: string;

  // tslint:disable-next-line:no-input-rename
  @Input('itemData') itemData: any;
  // tslint:disable-next-line:no-input-rename
  @Input('itemGroupType') itemGroupType: InputGroup;

  constructor(public store: Store<reducerRoot.CalDataState>) {
    this.cycle = MapperUtil.EnumMapToArray(this.calCycleEnum);
  }

  ngOnInit() {
    this.initSetup();
  }

  private initSetup(): void {
    if (this.itemData.affectiveMonth) {
      this.affectiveMonth = MapperUtil.FormatAffectiveMonth(this.itemData.affectiveMonth);
    }
  }

  public removeItem(): void {
    this.store.dispatch(new DeletePeriodicalVariableItemAction(this.itemData.id));
  }

}
