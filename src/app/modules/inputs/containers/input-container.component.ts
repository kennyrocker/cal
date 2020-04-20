import { Component, Input } from '@angular/core';
import { CalData } from 'src/app/constants/interfaces/cal-data';
import { InputGroup } from 'src/app/constants/enums/input-group';

import * as reducerRoot from '../../../reducers/index';
import { Store } from '@ngrx/store';
import { AddConstantIncomeItemAction,
  AddConstantExpenseItemAction, AddPeriodicalVariableItemAction } from 'src/app/actions/calData.action';

@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.scss']
})
export class InputContainerComponent  {

  // tslint:disable-next-line:no-input-rename
  @Input('data')
  public data: CalData;
  public groupType = InputGroup;

  constructor(public store: Store<reducerRoot.CalDataState>) {
  }

  public addConstantIncomeItem(): void {
    this.store.dispatch(new AddConstantIncomeItemAction(this.data.id));
  }

  public addConstantExpenseItem(): void {
    this.store.dispatch(new AddConstantExpenseItemAction(this.data.id));
  }

  public addPeriodicalVaribleItem(): void {
    this.store.dispatch(new AddPeriodicalVariableItemAction(this.data.id));
  }

  // performance boost
  public trackByItem(index, item): any {
    return item ? item.id : undefined;
  }

}
