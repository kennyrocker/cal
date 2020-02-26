import { Component, OnInit } from '@angular/core';
import { CalData } from 'src/app/constants/interfaces/cal-data';
import { InputGroup } from 'src/app/constants/enums/input-group';

import * as reducerRoot from '../../../reducers/index';
import { Store } from '@ngrx/store';
import { GetCalDataAction, AddConstantIncomeItemAction,
  AddConstantExpenseItemAction, AddPeriodicalVariableItemAction } from 'src/app/actions/calData.action';
import { OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {filter} from 'rxjs/internal/operators';

@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.scss']
})
export class InputContainerComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  public groupType = InputGroup;
  public data: CalData;

  constructor(public store: Store<reducerRoot.CalDataState>) {
    this.store.dispatch(new GetCalDataAction());
  }

  ngOnInit() {
    this.sub = this.store.select(reducerRoot.getCalData).pipe(
      filter(data => data !== undefined),
      map((data) => {
        this.data = data;
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public addConstantIncomeItem(): void {
    this.store.dispatch(new AddConstantIncomeItemAction());
  }

  public addConstantExpenseItem(): void {
    this.store.dispatch(new AddConstantExpenseItemAction());
  }

  public addPeriodicalVaribleItem(): void {
    this.store.dispatch(new AddPeriodicalVariableItemAction());
  }

  // performance boost
  public trackByItem(index, item): any {
    return item ? item.id : undefined;
  }

}
