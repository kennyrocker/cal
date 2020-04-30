import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { InputGroup } from 'src/app/constants/enums/input-group';
import { PeriodCalCycleUI } from 'src/app/constants/enums/cal-cycle';
import { MapperUtil } from 'src/app/utils/mapper-util';

import { Store } from '@ngrx/store';
import * as reducerRoot from '../../../../reducers/index';
import {DeletePeriodicalVariableItemAction, UpdatePeriodicalVariableItemAction} from 'src/app/actions/calData.action';
import { debounceTime} from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { Subject, Subscription } from 'rxjs';
import { Constant } from '../../../../constants/constant';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-periodic-item-component',
  templateUrl: './periodic-item.component.html',
  styleUrls: ['./periodic-item.component.scss']
})
export class PeriodicItemComponent implements OnInit, OnDestroy {

  @Output() deleted: EventEmitter<boolean> = new EventEmitter();
  // tslint:disable-next-line:no-input-rename
  @Input('projectionId') projectionId: string;
  // tslint:disable-next-line:no-input-rename
  @Input('itemData') itemData: any;
  // tslint:disable-next-line:no-input-rename
  @Input('itemGroupType') itemGroupType: InputGroup;
  private calCycleEnum = PeriodCalCycleUI;
  public cycleArr = [];
  public affectiveMonth: string;
  public periodicForm: FormGroup;

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


  constructor(public store: Store<reducerRoot.CalDataState>) {
    this.cycleArr = MapperUtil.EnumMapToArray(this.calCycleEnum);
  }

  ngOnInit() {
    this.initForm();
    this.initSetup();
    this.initSub();
  }

  ngOnDestroy() {
    this.activeChangeSub.unsubscribe();
    this.nameChangeSub.unsubscribe();
    this.amountChangeSub.unsubscribe();
    this.cycleChangeSub.unsubscribe();
  }

  private initForm(): void {
    this.periodicForm = new FormGroup({
      id: new FormControl(this.itemData.id, [ Validators.required ]),
      name: new FormControl(this.itemData.name, [ Validators.required ]),
      amount: new FormControl(this.itemData.amount, [ Validators.required ]),
      cycle: new FormControl(this.itemData.cycle, [ Validators.required ]),
      active: new FormControl(this.itemData.active, [ Validators.required ]),
      affectiveMonth: new FormControl(this.itemData.affectiveMonth, [Validators.required])
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
    this.periodicForm.patchValue({active: value});
    this.updateAction();
    this.periodicForm.markAsTouched(); // for container to detect change
  }

  public nameChange(value: string): void {
    this.periodicForm.patchValue({name: value});
    this.updateAction();
  }

  public amountChange(value: any): void {
    this.periodicForm.patchValue({amount: Number(value)});
    this.updateAction();
  }

  public cycleChange(value: PeriodCalCycleUI): void {
    this.periodicForm.patchValue({cycle: Number(value)});
    this.updateAction();
  }

  private monthChange(value: string): void {
    const months =  this.parseMonthsToUniqueArray(value);
    this.periodicForm.patchValue({affectiveMonth: months});
    this.updateAction();
  }

  private parseMonthsToUniqueArray(months: string): number[] {
    if (!months) {
      return [];
    }
    const m = months.replace(/\s/g, '').split(',').map((i) => parseInt(i, 10));
    return MapperUtil.uniqueSingleKeyArry(m);
  }

  private updateAction(): void {
    if (this.periodicForm.invalid) {
      return;
    }
    this.store.dispatch(new UpdatePeriodicalVariableItemAction(this.projectionId, this.periodicForm.value));
  }

  private initSetup(): void {
    if (this.itemData.affectiveMonth) {
      this.affectiveMonth = MapperUtil.FormatAffectiveMonth(this.itemData.affectiveMonth);
    }
  }

  public removeItem(): void {
    this.store.dispatch(new DeletePeriodicalVariableItemAction(this.projectionId, this.itemData.id));
    this.deleted.emit(true);
  }

}
