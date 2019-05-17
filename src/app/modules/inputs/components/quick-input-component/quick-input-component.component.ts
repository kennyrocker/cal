import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { InputGroup } from '../../../../constants/enums/input-group';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';
import { Constant } from '../../../../constants/constant';
import * as reducerRoot from '../../../../reducers';
import { Store } from '@ngrx/store';
import { StandarItem } from '../../../../constants/interfaces/standar-item';
import { MapperUtil } from '../../../../utils/mapper-util';
import { BulkAddConstantIncomeItemAction, BulkAddConstantExpenseItemAction,
         BulkAddPeriodicalVariableItemAction } from '../../../../actions/calData.action';
import { PeriodicItem } from 'src/app/constants/interfaces/periodic-item';

@Component({
  selector: 'app-quick-input-component',
  templateUrl: './quick-input-component.component.html',
  styleUrls: ['./quick-input-component.component.css']
})
export class QuickInputComponentComponent implements OnInit, OnDestroy {

  constructor(public store: Store<reducerRoot.CalDataState>) { }
  // tslint:disable-next-line:no-input-rename
  @Input('itemGroupType') itemGroupType: InputGroup;
  public showQuickInput: boolean;
  private inputChangeSub: Subscription;
  private inputChangeSubject = new Subject<any>();
  public quickInput: string;
  public placeHolder: string;

  ngOnInit() {
    this.setupHintByInputType();
    this.initSub();
  }

  ngOnDestroy() {
    this.inputChangeSub.unsubscribe();
  }

  private setupHintByInputType(): void {
    if (this.itemGroupType === InputGroup.CONSTANT_INCOME
      || this.itemGroupType === InputGroup.CONSTANT_EXPENSE) {
      this.placeHolder = 'Enter item with short cut for example "condo rental1000m" '
          + '\n{ condo rental : name} { 1000 : amount } { m | a | b : monthly | annally | biweekly cycle}'
          + '\nMultiple items can be enter seprated by ; such as "condo rental1000m; car lease250b"';
    }
    if (this.itemGroupType === InputGroup.PERIODICAL_VARIBLE) {
      this.placeHolder = 'Enter item with short cut for example "property tax-500@2,8" '
                      + '\n{ property tax : name} { -500 : amount } { 2, 8 : month of the year }'
                      + '\nMultiple items can be enter seprated by ; such as "auto matainence200@2,6; property tax2250@4,9"';
    }
  }

  private initSub(): void {
    this.inputChangeSub = this.inputChangeSubject.pipe(
      debounceTime(Constant.QUICK_INPUT_DEBOUNCE_TIME),
      distinctUntilChanged()
    ).subscribe((value) => {
        const inputs = MapperUtil.uniqueSingleKeyArry(this.sensitizeInputsAndParseToArray(value));
        if (!inputs || inputs.length === 0) {
          return;
        }
        if (this.itemGroupType === InputGroup.CONSTANT_INCOME || this.itemGroupType === InputGroup.CONSTANT_EXPENSE) {
          this.quickInput = inputs.join(';');
          this.updateStanderItemInputsByType(inputs, this.itemGroupType);
        } else if (this.itemGroupType === InputGroup.PERIODICAL_VARIBLE) {
          this.quickInput = inputs.join(';');
          this.updatePeriodicVariables(this.mapPeriodicItems(inputs));
        }
        // static in the future
    });
  }

  public bindInputChangeSubject(value): void {
    this.inputChangeSubject.next(value);
  }

  private sensitizeInputsAndParseToArray(input: string): string[] {
    input = input.trim();
    if (input.length > 0) {
      const items = input.split(';');
      return items.filter(i => i !== '' && i !== ' ')
        .map(i => i.replace(/^\s+|\s+$/g, ''));
    }
    return [];
  }

  private updateStanderItemInputsByType(arr: string[], itemGroupType: InputGroup): void {
    if (itemGroupType === InputGroup.CONSTANT_INCOME) {
      this.updateConstantIncoms(this.mapStanderItems(arr));
    } else if (itemGroupType === InputGroup.CONSTANT_EXPENSE) {
      this.updateConstantExpense(this.mapStanderItems(arr));
    }
  }

  private mapStanderItems(arr: string[]): StandarItem[] {
    const output = [];
    arr.filter(x => x !== '' && x !== null )
       .map(item => {
          output.push(MapperUtil.mapStanderItem(item));
       });
    return output;
  }

  private mapPeriodicItems(arr: string[]): PeriodicItem[] {
    const output = [];
    arr.filter(x => x !== '' && x !== null)
       .map(item => {
          output.push(MapperUtil.mapPeriodicItem(item));
       });
    return output;
  }

  private updateConstantIncoms(incomes: StandarItem[]): void {
    if (incomes.length > 0) {
      this.store.dispatch(new BulkAddConstantIncomeItemAction(incomes));
    }
  }

  private updateConstantExpense(expenses: StandarItem[]): void {
    if (expenses.length > 0) {
      this.store.dispatch(new BulkAddConstantExpenseItemAction(expenses));
    }
  }

  private updatePeriodicVariables(variables: PeriodicItem[]): void {
    if (variables.length > 0) {
      this.store.dispatch(new BulkAddPeriodicalVariableItemAction(variables));
    }
  }

}
