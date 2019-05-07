import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { InputGroup } from 'src/app/constants/enums/input-group';
import { CalCycle } from 'src/app/constants/enums/cal-cycle';
import { MapperUtil } from 'src/app/utils/mapper-util';
import { Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';

import * as reducerRoot from '../../../../reducers/index';
import { Store } from '@ngrx/store';
import { UpdateConstantIncomeItemAction, UpdateConstantExpenseItemAction,
   DeleteConstantIcomeItemAction, DeleteConstantExpenseItemAction } from 'src/app/actions/calData.action';
import { Constant } from '../../../../constants/constant';


@Component({
  selector: 'app-constant-item-component',
  templateUrl: './constant-item-component.component.html',
  styleUrls: ['./constant-item-component.component.css']
})
export class ConstantItemComponentComponent implements OnInit, OnDestroy {

  public groupType = InputGroup;
  private calCycleEnum = CalCycle;
  public cycle = [];

  // tslint:disable-next-line:no-input-rename
  @Input('itemData') itemData: any;
  // tslint:disable-next-line:no-input-rename
  @Input('itemGroupType') itemGroupType: InputGroup;
  private isIncome: boolean;

  private nameChangeSub: Subscription;
  private nameChangeSubject = new Subject<any>();
  private amountChangeSub: Subscription;
  private amountChangeSubject = new Subject<any>();
  private cycleChangeSub: Subscription;
  private cycleChangeSubject = new Subject<any>();

  constructor(public store: Store<reducerRoot.CalDataState>) {
    this.cycle = MapperUtil.EnumMapToArray(this.calCycleEnum);
  }

  ngOnInit() {
    // TODO:: make itemData input with its own model, then set the modal data only once when init container
    this.isIncome = (this.itemGroupType === this.groupType.CONSTANT_INCOME);
    this.initSub();
  }

  ngOnDestroy() {
    this.nameChangeSub.unsubscribe();
    this.amountChangeSub.unsubscribe();
    this.cycleChangeSub.unsubscribe();
  }

  private initSub(): void {

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


  public removeItem(): void {
    if (this.isIncome) {
      this.store.dispatch(new DeleteConstantIcomeItemAction(this.itemData.id));
    } else {
      this.store.dispatch(new DeleteConstantExpenseItemAction(this.itemData.id));
    }
  }

  private nameChange(value: string): void {
    if (this.isIncome) {
      this.updateConstantIncomeAction(value, this.itemData.amount, this.itemData.cycle);
    } else {
      this.updateConstantExpenseAction(value, this.itemData.amount, this.itemData.cycle);
    }
  }

  public amountChange(value: any): void {
    if (this.isIncome) {
      this.updateConstantIncomeAction(this.itemData.name, value, this.itemData.cycle);
    } else {
      this.updateConstantExpenseAction(this.itemData.name, value, this.itemData.cycle);
    }
  }

  public cycleChange(value: CalCycle): void {
    if (this.isIncome) {
      this.updateConstantIncomeAction(this.itemData.name, this.itemData.amount, value);
    } else {
      this.updateConstantExpenseAction(this.itemData.name, this.itemData.amount, value);
    }
  }


  // helper method
  private updateConstantIncomeAction( name: string, amount: number, cycle: CalCycle): void {
    const payload = {
      id: this.itemData.id,
      name: name,
      amount: Number(amount),
      cycle: Number(cycle)
    };
    this.store.dispatch(new UpdateConstantIncomeItemAction(payload));
  }

  private updateConstantExpenseAction(name: string, amount: number, cycle: CalCycle): void {
    const payload = {
      id: this.itemData.id,
      name: name,
      amount: Number(amount),
      cycle: Number(cycle)
    };
    this.store.dispatch(new UpdateConstantExpenseItemAction(payload));
  }

}
