import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { InputGroup } from 'src/app/constants/enums/input-group';
import { PeriodCalCycleUI } from 'src/app/constants/enums/cal-cycle';
import { MapperUtil } from 'src/app/utils/mapper-util';

import { Store } from '@ngrx/store';
import * as reducerRoot from '../../../../reducers/index';
import { DeletePeriodicalVariableItemAction, UpdatePeriodicalVariableItemAction, UIitemDragAction } from 'src/app/actions/calData.action';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { Subject, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { DragItem } from 'src/app/constants/interfaces/drag-item';

@Component({
  selector: 'app-periodic-item-component',
  templateUrl: './periodic-item.component.html',
  styleUrls: ['./periodic-item.component.scss']
})
export class PeriodicItemComponent implements OnInit, OnDestroy {

  @Output() update: EventEmitter<boolean> = new EventEmitter();
  // tslint:disable-next-line:no-input-rename
  @Input('projectionId') projectionId: string;
  // tslint:disable-next-line:no-input-rename
  @Input('itemData') itemData: any;
  // tslint:disable-next-line:no-input-rename
  @Input('itemGroupType') itemGroupType: InputGroup;

  public dragEffect: boolean;
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
    this.monthChangeSub.unsubscribe();
  }

  private initForm(): void {
    this.periodicForm = new FormGroup({
      id: new FormControl(this.itemData.id, [ Validators.required ]),
      name: new FormControl(this.itemData.name),
      amount: new FormControl(this.itemData.amount),
      cycle: new FormControl(this.itemData.cycle, [ Validators.required ]),
      active: new FormControl(this.itemData.active, [ Validators.required ]),
      affectiveMonth: new FormControl(this.itemData.affectiveMonth)
    });
    if (this.itemData.amount !== 0) {
      this.addAmountFieldValidation();
    }
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
        this.addAmountFieldValidation();
        this.addAffectiveMonthFieldValidation();
    });

    this.amountChangeSub = this.amountChangeSubject.pipe(
      distinctUntilChanged(),
      filter(value => value !== 0 && value !== '')
    ).subscribe((value) => {
        this.amountChange(value);
        this.addNameFieldValidation();
        this.addAffectiveMonthFieldValidation();
    });

    this.cycleChangeSub = this.cycleChangeSubject.pipe(
      distinctUntilChanged()
    ).subscribe((value) => {
      this.cycleChange(value);
    });

    this.monthChangeSub = this.monthChangeSubject.pipe(
      distinctUntilChanged()
    ).subscribe((value) => {
        this.monthChange(value);
        this.addNameFieldValidation();
        this.addAmountFieldValidation();
    });

  }

  private addNameFieldValidation(): void {
      this.periodicForm.get('name').setValidators([
        Validators.required
      ]);
      this.periodicForm.get('name').updateValueAndValidity();
  }

  private addAmountFieldValidation(): void {
      this.periodicForm.get('amount').setValidators([
        Validators.required,
        // tslint:disable-next-line:max-line-length
        Validators.pattern('^-([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$|^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$')
      ]);
      this.periodicForm.get('amount').updateValueAndValidity();
  }

  private addAffectiveMonthFieldValidation(): void {
      this.periodicForm.get('affectiveMonth').setValidators([
        Validators.required
      ]);
      this.periodicForm.get('affectiveMonth').updateValueAndValidity();
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
  }

  public nameChange(value: string): void {
    this.periodicForm.patchValue({name: value});
    this.updateAction();
  }

  public amountChange(value: string): void {
    const isMinus = value.indexOf('-') !== -1;
    const num = isMinus ? Number(value.substring(1, value.length)) * -1 : Number(value);
    if (isNaN(num)) return;
    if (isMinus && value.length < 2) return;
    this.periodicForm.patchValue({amount: num});
    this.updateAction();
  }

  public cycleChange(value: PeriodCalCycleUI): void {
    this.periodicForm.patchValue({cycle: Number(value)});
    this.updateAction();
  }

  private monthChange(value: string): void {
    const months =  this.parseMonthsToUniqueArray(value);
    if (months.length === 0) {
      // TODO:: apply correct regex to affectiveMonth form control as pattern, remove manul validation
      this.periodicForm.setErrors({ affectiveMonth: false });
      this.periodicForm.controls['affectiveMonth'].setErrors({ affectiveMonth: false });
      this.periodicForm.controls['affectiveMonth'].markAllAsTouched();
      return;
    }
    this.periodicForm.patchValue({affectiveMonth: months});
    this.updateAction();
  }

  private parseMonthsToUniqueArray(months: string): number[] {
      if (!months) return [];
      let valid = true;
      const list = [];
      months.replace(/\s/g, '').split(',').map((i) =>  {
                const item = parseInt(i, 10);
                if (!isNaN(item) && item > 0 && item < 13) {
                    list.push(item);
                } else {
                    valid = false;
                }
            });
      if (valid) {
          return MapperUtil.uniqueSingleKeyArry(list).sort((a, b) => a - b);
      }
      return [];
  }

  private initSetup(): void {
    if (this.itemData.affectiveMonth) {
      this.affectiveMonth = MapperUtil.FormatAffectiveMonth(this.itemData.affectiveMonth);
    }
  }

  private updateAction(): void {
    if (this.periodicForm.invalid) {
      return;
    }
    this.store.dispatch(new UpdatePeriodicalVariableItemAction(this.projectionId, this.periodicForm.value));
    this.update.emit(true);
  }

  public removeItem(): void {
    this.store.dispatch(new DeletePeriodicalVariableItemAction(this.projectionId, this.itemData.id));
    this.update.emit(true);
  }

  /* Drag and Drop */
  public dragItemStart(): void {
    this.dragEffect = true;
    const payload: DragItem = {
        projectionId: this.projectionId,
        type: InputGroup.PERIODICAL_VARIABLE,
        ...this.itemData
    };
    this.store.dispatch(new UIitemDragAction(payload));
  }

  public dragItemEnd(): void {
    this.dragEffect = false;
  }

}
