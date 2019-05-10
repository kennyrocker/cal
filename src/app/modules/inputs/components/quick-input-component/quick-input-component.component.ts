import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { InputGroup } from '../../../../constants/enums/input-group';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';
import { Constant } from '../../../../constants/constant';
import * as reducerRoot from '../../../../reducers';
import { Store } from '@ngrx/store';
import { StandarItem } from '../../../../constants/interfaces/standar-item';
import { MapperUtil } from '../../../../utils/mapper-util';
import {BulkAddConstantIncomeItemAction} from '../../../../actions/calData.action';

@Component({
  selector: 'app-quick-input-component',
  templateUrl: './quick-input-component.component.html',
  styleUrls: ['./quick-input-component.component.css']
})
export class QuickInputComponentComponent implements OnInit, OnDestroy {

  constructor(public store: Store<reducerRoot.CalDataState>) { }

  @Input('itemGroupType') itemGroupType: InputGroup;
  public showQuickInput: boolean;
  private inputChangeSub: Subscription;
  private inputChangeSubject = new Subject<any>();
  public quickInput: string;

  ngOnInit() {
    this.initSub();
  }

  ngOnDestroy() {
    this.inputChangeSub.unsubscribe();
  }

  private initSub(): void {
    this.inputChangeSub = this.inputChangeSubject.pipe(
      debounceTime(Constant.QUICK_INPUT_DEBOUNCE_TIME),
      distinctUntilChanged()
    ).subscribe((value) => {
        this.updateInputs(this.parseQuickInputStrings(value), this.itemGroupType);
        this.quickInput = this.parseQuickInputStrings(value).join();
    });
  }

  public bindInputChangeSubject(value): void {
    this.inputChangeSubject.next(value);
  }

  private parseQuickInputStrings(input: string): string[] {
    const output = input.split(',').filter(i => i !== '')
      .map(i => i.replace(/^\s+|\s+$/g, ''));
    return output ? output : [];
  }

  private updateInputs(arr: string[], itemGroupType: InputGroup): void {
    if (!arr || !arr.length) {
      return;
    }
    if (itemGroupType === InputGroup.CONSTANT_INCOME) {
      this.updateConstantIncoms(this.mapStanderItems(arr));
    } else if (itemGroupType === InputGroup.CONSTANT_EXPENSE) {
      this.updateConstantExpense(this.mapStanderItems(arr));
    } else if ( itemGroupType === InputGroup.PERIODICAL_VARIBLE ) {
      // TODO::
    } else {
      // TODO:: handle InputGroup.STATIC_VARIBLE
    }
  }

  private mapStanderItems(arr: string[]): StandarItem[] {
    if (!arr || arr.length <= 0) {
      return [];
    }
    const output = [];
    arr.filter(x => x !== '' && x !== null )
       .map(item => {
          output.push(MapperUtil.mapStanderItem(item));
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
      console.log(expenses);
    }
  }

  private updatePeriodicalVariables(): void {

  }

}
