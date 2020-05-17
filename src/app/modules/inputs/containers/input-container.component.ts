import { Component, Input, OnInit, ViewChild, ViewChildren, QueryList, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { CalData } from 'src/app/constants/interfaces/cal-data';
import { InputGroup } from 'src/app/constants/enums/input-group';

import * as reducerRoot from '../../../reducers/index';
import { Store } from '@ngrx/store';
import { AddConstantIncomeItemAction, AddConstantExpenseItemAction, AddPeriodicalVariableItemAction,
   UpdatePorjectionAction, DeleteProjectionAction, PostProjectionAction } from 'src/app/actions/calData.action';
import { ActivatedRoute, Router } from '@angular/router';
import { NameComponent } from 'src/app/modules/inputs/components/name-component/name-component';
// tslint:disable-next-line:import-spacing
import { ConstantItemComponent }
from 'src/app/modules/inputs/components/constant-item-component/constant-item.component';
// tslint:disable-next-line:import-spacing
import { PeriodicItemComponent }
from 'src/app/modules/inputs/components/periodic-item-component/periodic-item.component';


@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputContainerComponent implements OnInit {

  @ViewChild(NameComponent) nameCmp: NameComponent;
  @ViewChildren(ConstantItemComponent) constantCmps: QueryList<ConstantItemComponent>;
  @ViewChildren(PeriodicItemComponent) periodicCmps: QueryList<PeriodicItemComponent>;

  // tslint:disable-next-line:no-input-rename
  @Input('data')
  public data: CalData;
  // tslint:disable-next-line:no-input-rename
  @Input('isNewProjection')
  public isNewProjection: boolean;
  // tslint:disable-next-line:no-input-rename
  @Input('compareIndex')
  public compareIndex: number;

  public groupType = InputGroup;
  private backUrl: string;
  private hasUpdatedItem = false;
  private saved = false;
  public markAsTouched = false;

  constructor(public store: Store<reducerRoot.CalDataState>,
              private route: ActivatedRoute,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.backUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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

  public routeBack(): void {
    // TODO:: if form state is touched && status is VALID,
    // ask user if they want to save data before redirect
    // if isNewProjection and not saved, before navigate back, need to clear data from collection
    if (this.isNewProjection && !this.saved) {
        this.store.dispatch(new DeleteProjectionAction(this.data.id));
    }
    this.router.navigateByUrl(this.backUrl);
  }

  public hasUpdated(bool: boolean): void {
    this.hasUpdatedItem = bool;
  }

  private isValidToSave(): boolean {
      let valid = true;
      let touched = false;

      this.constantCmps.forEach(ele => {
          const cform = ele.constantForm;
          if (cform.status === 'INVALID') {
              valid = false;
          }
          if (cform.touched === true) {
            touched = true;
          }
      });

      this.periodicCmps.forEach(ele => {
          const pform = ele.periodicForm;
          if (pform.status === 'INVALID') {
              valid = false;
          }
          if (pform.touched === true) {
              touched = true;
          }
      });
      
      const nform = this.nameCmp.nameForm;
      if (nform.status === 'INVALID') {
          valid = false;
      }
      if (nform.touched === true) {
          touched = true;
      }

      return (valid === true && touched === true);
  }

  public save(): void {
      this.showValidationMessages(true);
      if (this.hasUpdatedItem && this.isValidToSave()) {
          // when is update aka this.data.id is not null
          if (this.isNewProjection) {
              this.store.dispatch(new PostProjectionAction(this.data));
              this.saved = true;
          } else {
              this.store.dispatch(new UpdatePorjectionAction(this.data));
          }
          this.resetValidation();
      }
  }

  private showValidationMessages(bool: boolean): void {
    this.markAsTouched = bool;
  }

  private resetValidation(): void {
    this.showValidationMessages(false);
    this.hasUpdatedItem = false;
  }

}
