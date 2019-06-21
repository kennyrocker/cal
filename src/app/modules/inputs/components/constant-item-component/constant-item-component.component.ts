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
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-constant-item-component',
  templateUrl: './constant-item-component.component.html',
  styleUrls: ['./constant-item-component.component.scss']
})
export class ConstantItemComponentComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line:no-input-rename
  @Input('itemData') itemData: any;
  // tslint:disable-next-line:no-input-rename
  @Input('itemGroupType') itemGroupType: InputGroup;

  public groupType = InputGroup;
  private calCycleEnum = CalCycle;
  public cycleArr = [];
  public constantForm: FormGroup;
  private isIncome: boolean;

  private activeChangeSub: Subscription;
  private activeChangeSubject = new Subject<any>();
  private nameChangeSub: Subscription;
  private nameChangeSubject = new Subject<any>();
  private amountChangeSub: Subscription;
  private amountChangeSubject = new Subject<any>();
  private cycleChangeSub: Subscription;
  private cycleChangeSubject = new Subject<any>();


  constructor(public store: Store<reducerRoot.CalDataState>) {
    this.cycleArr = MapperUtil.EnumMapToArray(this.calCycleEnum);
  }

  ngOnInit() {
    this.initForm();
    // TODO:: make itemData input with its own model, then set the modal data only once when init container
    this.isIncome = (this.itemGroupType === this.groupType.CONSTANT_INCOME);
    this.initSub();
  }

  ngOnDestroy() {
    this.activeChangeSub.unsubscribe();
    this.nameChangeSub.unsubscribe();
    this.amountChangeSub.unsubscribe();
    this.cycleChangeSub.unsubscribe();
  }

  private initForm(): void {
    this.constantForm = new FormGroup({
      id: new FormControl(this.itemData.id, [ Validators.required ]),
      name: new FormControl(this.itemData.name, [ Validators.required ]),
      amount: new FormControl(this.itemData.amount, [ Validators.required ]),
      cycle: new FormControl(this.itemData.cycle, [ Validators.required ]),
      active: new FormControl(this.itemData.active, [ Validators.required ])
    });
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

  public removeItem(): void {
    if (this.isIncome) {
      this.store.dispatch(new DeleteConstantIcomeItemAction(this.itemData.id));
    } else {
      this.store.dispatch(new DeleteConstantExpenseItemAction(this.itemData.id));
    }
  }

  public activeChange(value: boolean): void {
    this.constantForm.patchValue({active: value});
    this.updateAction();
  }

  public nameChange(value: string): void {
    this.constantForm.patchValue({name: value});
    this.updateAction();
  }

  public amountChange(value: any): void {
    this.constantForm.patchValue({amount: Number(value)});
    this.updateAction();
  }

  public cycleChange(value: CalCycle): void {
    this.constantForm.patchValue({cycle: Number(value)});
    this.updateAction();
  }

  private updateAction(): void {
    if (this.constantForm.invalid) {
      return;
    }
    if (this.isIncome) {
      this.store.dispatch(new UpdateConstantIncomeItemAction(this.constantForm.value));
    } else {
      this.store.dispatch(new UpdateConstantExpenseItemAction(this.constantForm.value));
    }
  }

}
