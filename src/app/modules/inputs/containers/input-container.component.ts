import { Component, Input, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { CalData } from 'src/app/constants/interfaces/cal-data';
import { InputGroup } from 'src/app/constants/enums/input-group';

import * as reducerRoot from '../../../reducers/index';
import { Store } from '@ngrx/store';
import { AddConstantIncomeItemAction,
  AddConstantExpenseItemAction, AddPeriodicalVariableItemAction } from 'src/app/actions/calData.action';
import { ActivatedRoute, Router } from '@angular/router';
import { NameComponent } from 'src/app/modules/inputs/components/name-component/name-component';
// tslint:disable-next-line:import-spacing
import { ConstantItemComponent }
from 'src/app/modules/inputs/components/constant-item-component/constant-item.component';
// tslint:disable-next-line:import-spacing
import { PeriodicItemComponent }
from 'src/app/modules/inputs/components/periodic-item-component/periodic-item.component';
import { constants } from 'buffer';

@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.scss']
})
export class InputContainerComponent implements OnInit {

  @ViewChild(NameComponent) nameCmp: NameComponent;
  @ViewChildren(ConstantItemComponent) constantCmps: QueryList<ConstantItemComponent>;
  @ViewChildren(PeriodicItemComponent) periodicCmps: QueryList<PeriodicItemComponent>;

  // tslint:disable-next-line:no-input-rename
  @Input('data')
  public data: CalData;
  public groupType = InputGroup;
  private backUrl: string;

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
    this.router.navigateByUrl(this.backUrl);
  }

  private isValidToSave(): boolean {
      const condition = 'VALID';
      let validToSave = true;
      this.constantCmps.forEach(ele => {
          if (ele.constantForm.status !== condition) {
              validToSave = false;
          }
      });
      this.periodicCmps.forEach(ele => {
          if ( ele.periodicForm.status !== condition) {
              validToSave = false;
          }
      });
      if (this.nameCmp.nameForm.status !== condition) {
          validToSave = false;
      }
      return validToSave;
  }

  public save(): void {
      if (this.isValidToSave()) {
          // do save
          console.log('save this data :  ', this.data);
      }
  }



}
