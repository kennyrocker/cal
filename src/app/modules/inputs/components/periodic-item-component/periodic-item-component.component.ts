import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { InputGroup } from 'src/app/constants/enums/input-group';
import { PeriodCalCycleUI } from 'src/app/constants/enums/cal-cycle';
import { MapperUtil } from 'src/app/utils/mapper-util';

import { Store } from '@ngrx/store';
import * as reducerRoot from '../../../../reducers/index';
import {DeletePeriodicalVariableItemAction, UpdatePeriodicalVariableItemAction} from 'src/app/actions/calData.action';
import { debounceTime} from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { Subject, Subscription } from 'rxjs';
import { PeriodicItem } from '../../../../constants/interfaces/periodic-item';
import { Constant } from '../../../../constants/constant';

@Component({
  selector: 'app-periodic-item-component',
  templateUrl: './periodic-item-component.component.html',
  styleUrls: ['./periodic-item-component.component.css']
})
export class PeriodicItemComponentComponent implements OnInit, OnDestroy {

  private activeChangeSub: Subscription;
  private activeChangeSubject = new Subject<any>();
  private nameChangeSub: Subscription;
  private nameChangeSubject = new Subject<any>();
  private amountChangeSub: Subscription;
  private amountChangeSubject = new Subject<any>();
  private cycleChangeSub: Subscription;
  private cycleChangeSubject = new Subject<any>();
  private monthChangeSub: Subscription;
  private monthChangeSubject = new Subject<any>();

  private calCycleEnum = PeriodCalCycleUI;
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
    this.initSub();
  }

  ngOnDestroy() {
    this.activeChangeSub.unsubscribe();
    this.nameChangeSub.unsubscribe();
    this.amountChangeSub.unsubscribe();
    this.cycleChangeSub.unsubscribe();
  }

  private initSub(): void {

    this.activeChangeSub = this.activeChangeSubject.pipe(
      debounceTime(Constant.INPUT_DEBOUNCE_TIME),
      distinctUntilChanged()
    ).subscribe((value) => {
      this.activeChange(value);
    });

    this.nameChangeSub = this.nameChangeSubject.pipe(
      debounceTime(Constant.INPUT_DEBOUNCE_TIME),
      distinctUntilChanged()
    ).subscribe((value) => {
      this.nameChange(value);
    });

    this.amountChangeSub = this.amountChangeSubject.pipe(
      debounceTime(Constant.INPUT_DEBOUNCE_TIME)
    ).subscribe((value) => {
      this.amountChange(value);
    });

    this.cycleChangeSub = this.cycleChangeSubject.pipe(
      debounceTime(Constant.INPUT_DEBOUNCE_TIME),
      distinctUntilChanged()
    ).subscribe((value) => {
      this.cycleChange(value);
    });

    this.monthChangeSub = this.monthChangeSubject.pipe(
      debounceTime(Constant.INPUT_DEBOUNCE_TIME),
      distinctUntilChanged()
    ).subscribe((value) => {
      this.monthChange(value);
    });

  }

  public bindActiveChangeSubject(value): void {
    this.activeChangeSubject.next(value);
  }

  public bindNameChangeSubject(value): void {
    this.nameChangeSubject.next(value);
  }

  public bindAmountChangeSubject(value): void {
    this.amountChangeSubject.next(value);
  }

  public bindCycleChangeSubject(value): void {
    this.cycleChangeSubject.next(value);
  }

  public bindMonthChangeSubject(value): void {
    this.monthChangeSubject.next(value);
  }

  public activeChange(value: boolean): void {
    this.updateItem(this.itemData.name, this.itemData.amount, this.itemData.cycle, this.itemData.affectiveMonth, value);
  }

  private nameChange(value: string): void {
    this.updateItem(value, this.itemData.amount, this.itemData.cycle, this.itemData.affectiveMonth, this.itemData.active);
  }

  public amountChange(value: any): void {
    this.updateItem(this.itemData.name, value, this.itemData.cycle, this.itemData.affectiveMonth, this.itemData.active);
  }

  public cycleChange(value: PeriodCalCycleUI): void {
    this.updateItem(this.itemData.name, this.itemData.amount, value, this.itemData.affectiveMonth, this.itemData.active);
  }

  private monthChange(value: string): void {
    const months =  this.parseMonthsToUniqueArray(value);
    this.updateItem(this.itemData.name, this.itemData.amount, this.itemData.cycle, months, this.itemData.active);
  }

  private parseMonthsToUniqueArray(months: string): number[] {
    if (!months) {
      return [];
    }
    const m = months.replace(/\s/g, '').split(',').map((i) => parseInt(i, 10));
    return MapperUtil.uniqueSingleKeyArry(m);
  }

  private updateItem(name: string, amount: number, cycle: PeriodCalCycleUI, affectiveMonth: number[], active: boolean): void {
    const payload: PeriodicItem = {
      id: this.itemData.id,
      active: active,
      name: name,
      amount: Number(amount),
      cycle: Number(cycle),
      affectiveMonth: affectiveMonth
    };
    this.store.dispatch(new UpdatePeriodicalVariableItemAction(payload));
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
