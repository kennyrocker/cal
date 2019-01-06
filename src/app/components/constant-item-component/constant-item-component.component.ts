import { Component, OnInit, Input } from '@angular/core';
import { InputGroup } from 'src/app/constants/enums/input-group';
import { CalCycle } from 'src/app/constants/enums/cal-cycle';
import { MapperUtil } from 'src/app/utils/mapper-util';

import * as reducerRoot from '../../reducers/index';
import { Store } from '@ngrx/store';
import { UpdateConstantIncomeItemAction, UpdateConstantExpenseItemAction } from 'src/app/actions/calData.action';

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

  constructor(public store: Store<reducerRoot.CalDataState>) {
    this.cycle = MapperUtil.EnumMapToArray(this.calCycleEnum);
  }

  ngOnInit() {
  }

  public nameChange(value: string): void {
    if (this.itemGroupType === this.groupType.CONSTANT_INCOME) {
      this.updateConstantIncomeAction(value, this.itemData.amount, this.itemData.cycle);
    }
    if (this.itemGroupType === this.groupType.CONSTANT_EXPENSE) {
      this.updateConstantExpenseAction(value, this.itemData.amount, this.itemData.cycle);
    }
  }

  public amountChange(value: any): void {
    if (this.itemGroupType === this.groupType.CONSTANT_INCOME) {
      this.updateConstantIncomeAction(this.itemData.name, value, this.itemData.cycle);
    }
    if (this.itemGroupType === this.groupType.CONSTANT_EXPENSE) {
      this.updateConstantExpenseAction(this.itemData.name, value, this.itemData.cycle);
    }
  }

  public cycleChange(value: CalCycle): void {
    if (this.itemGroupType === this.groupType.CONSTANT_INCOME) {
      this.updateConstantIncomeAction(this.itemData.name, this.itemData.amount, value);
    }
    if (this.itemGroupType === this.groupType.CONSTANT_EXPENSE) {
      this.updateConstantExpenseAction(this.itemData.name, this.itemData.amount, value);
    }
  }

  // helper method
  private updateConstantIncomeAction(name: string, amount: number, cycle: CalCycle): void {
    const payload = {
      name: name,
      amount: amount,
      cycle: cycle
    };
    this.store.dispatch(new UpdateConstantIncomeItemAction(payload));
  }

  private updateConstantExpenseAction(name: string, amount: number, cycle: CalCycle): void {
    const payload = {
      name: name,
      amount: amount,
      cycle: cycle
    };
    this.store.dispatch(new UpdateConstantExpenseItemAction(payload));
  }

}
