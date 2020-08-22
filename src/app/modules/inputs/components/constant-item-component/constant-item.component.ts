import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { InputGroup } from 'src/app/constants/enums/input-group';
import { CalCycle } from 'src/app/constants/enums/cal-cycle';
import { MapperUtil } from 'src/app/utils/mapper-util';
import { Subscription, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';

import * as reducerRoot from '../../../../reducers/index';
import { Store } from '@ngrx/store';
import { UpdateConstantIncomeItemAction, UpdateConstantExpenseItemAction,
   DeleteConstantIcomeItemAction, DeleteConstantExpenseItemAction, UIitemDragAction } from 'src/app/actions/calData.action';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { filter } from 'rxjs/operators';
import { DragItem } from 'src/app/constants/interfaces/drag-item';


@Component({
  selector: 'app-constant-item-component',
  templateUrl: './constant-item.component.html',
  styleUrls: ['./constant-item.component.scss']
})
export class ConstantItemComponent implements OnInit, OnDestroy {

  @Output() update: EventEmitter<boolean> = new EventEmitter();
  // tslint:disable-next-line:no-input-rename
  @Input('projectionId') projectionId: string;
  // tslint:disable-next-line:no-input-rename
  @Input('itemData') itemData: any;
  // tslint:disable-next-line:no-input-rename
  @Input('itemGroupType') itemGroupType: InputGroup;

  public dragEffect: boolean;
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
      name: new FormControl(this.itemData.name, []),
      amount: new FormControl(this.itemData.amount, []),
      cycle: new FormControl(this.itemData.cycle, [ Validators.required ]),
      active: new FormControl(this.itemData.active, [ Validators.required ])
    });
  }

  private initSub(): void {

    this.activeChangeSub = this.activeChangeSubject.pipe(
                            distinctUntilChanged()
                          ).subscribe((value) => {
                            this.activeChange(value);
                          });

    this.nameChangeSub = this.nameChangeSubject.pipe(
                              distinctUntilChanged(),
                              filter(value => value !== '')
                          ).subscribe((value) => {
                              this.nameChange(value);
                              this.constantForm.get('amount').setValidators([
                                Validators.required,
                                Validators.min(1),
                                Validators.pattern('^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$')
                              ]);
                              this.constantForm.get('amount').updateValueAndValidity();
                          });

    this.amountChangeSub = this.amountChangeSubject.pipe(
                              distinctUntilChanged(),
                              filter(value => value !== 0 && value !== '')
                          ).subscribe((value) => {
                              this.amountChange(value);
                              this.constantForm.get('name').setValidators(Validators.required);
                              this.constantForm.get('name').updateValueAndValidity();
                          });

    this.cycleChangeSub = this.cycleChangeSubject.pipe(
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
      this.store.dispatch(new DeleteConstantIcomeItemAction(this.projectionId, this.itemData.id));
    } else {
      this.store.dispatch(new DeleteConstantExpenseItemAction(this.projectionId, this.itemData.id));
    }
    this.update.emit(true);
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
      this.store.dispatch(new UpdateConstantIncomeItemAction(this.projectionId, this.constantForm.value));
    } else {
      this.store.dispatch(new UpdateConstantExpenseItemAction(this.projectionId, this.constantForm.value));
    }
    this.update.emit(true);
  }


  /* Drag and Drop */
  public dragItemStart(): void {
      this.dragEffect = true;
      const type = this.isIncome ? InputGroup.CONSTANT_INCOME : InputGroup.CONSTANT_EXPENSE;
      const payload: DragItem = {
          projectionId: this.projectionId,
          type: type,
          ...this.itemData
      };
      this.store.dispatch(new UIitemDragAction(payload));
  }

  public dragItemEnd(): void {
      this.dragEffect = false;
  }

}
