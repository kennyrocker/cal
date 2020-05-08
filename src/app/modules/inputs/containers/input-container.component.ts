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
  encapsulation: ViewEncapsulation.None,
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
  private hasDeletedItem = false;
  private saved = false;

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

  public hasDeleted(bool: boolean): void {
    this.hasDeletedItem = bool;
  }

  private isValidToSave(): boolean {
      const condition = 'VALID';
      let valid = true;
      let touched = false;
      this.constantCmps.forEach(ele => {
          if (ele.constantForm.status !== condition) {
              valid = false;
          }
          if (ele.constantForm.touched === true) {
            touched = true;
          }
      });
      this.periodicCmps.forEach(ele => {
          if (ele.periodicForm.status !== condition) {
              valid = false;
          }
          if (ele.periodicForm.touched === true) {
              touched = true;
          }
      });
      if (this.nameCmp.nameForm.status !== condition) {
          valid = false;
      }
      if (this.nameCmp.nameForm.touched === true) {
          touched = true;
      }
      return (valid === true && touched === true) || this.hasDeletedItem;
  }

  public save(): void {
      if (this.isValidToSave()) {
          // when is update aka this.data.id is not null
          if (this.isNewProjection) {
              this.store.dispatch(new PostProjectionAction(this.data));
              this.saved = true;
          } else {
              this.store.dispatch(new UpdatePorjectionAction(this.data));
          }
      }
  }
}
