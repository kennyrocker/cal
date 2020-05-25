import { Component, Input, OnInit, ViewChild, ViewChildren, QueryList, ChangeDetectionStrategy } from '@angular/core';
import { CalData } from 'src/app/constants/interfaces/cal-data';
import { InputGroup } from 'src/app/constants/enums/input-group';

import * as reducerRoot from '../../../reducers/index';
import { Store } from '@ngrx/store';
import { AddConstantIncomeItemAction, AddConstantExpenseItemAction, AddPeriodicalVariableItemAction,
   UpdatePorjectionAction, DeleteProjectionAction, PostProjectionAction,
   UIUpdateLockAction,
   RollBackProjectionAction} from 'src/app/actions/calData.action';
import { ActivatedRoute, Router } from '@angular/router';
import { NameComponent } from 'src/app/modules/inputs/components/name-component/name-component';
// tslint:disable-next-line:import-spacing
import { ConstantItemComponent }
from 'src/app/modules/inputs/components/constant-item-component/constant-item.component';
// tslint:disable-next-line:import-spacing
import { PeriodicItemComponent }
from 'src/app/modules/inputs/components/periodic-item-component/periodic-item.component';
import { ModalType } from 'src/app/constants/enums/modal-type';


@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
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

  public modalType = ModalType;
  public groupType = InputGroup;
  private backUrl: string;
  private hasUpdatedItem = false;
  private saved = false;

  private rollBackData: CalData;

  // back modal
  public backModalShow = false;

  constructor(public store: Store<reducerRoot.CalDataState>,
              private route: ActivatedRoute,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.backUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.rollBackData =  this.data;
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

  public backClick(): void {
    if (this.isValidToSave()) {
        this.backModalShow = true;
    } else {
        this.routeBack();
    }
  }

  public backModalConfirmationHandle(): void {
      this.save();
      this.backModalShow = false;
      this.router.navigateByUrl(this.backUrl);
  }

  public backModalCancelHandle(): void {
      this.backModalShow = false;
      this.routeBack();
  }

  private routeBack(): void {
      if (this.isNewProjection && !this.saved) {
          // this.store.dispatch(new UIUpdateLockAction({ full: true, scroll: true }));
          this.store.dispatch(new DeleteProjectionAction(this.data.id));
      } else {
          // this.store.dispatch(new UIUpdateLockAction({ full: true, scroll: true }));
          this.store.dispatch(new RollBackProjectionAction(this.rollBackData));
      }
      this.router.navigateByUrl(this.backUrl);
  }

  public hasUpdated(bool: boolean): void {
    this.hasUpdatedItem = bool;
  }

  private isValidToSave(): boolean {
      let valid = true;
      const nform = this.nameCmp.nameForm;
      nform.markAllAsTouched();
      if (nform.status === 'INVALID') {
          valid = false;
      }

      this.constantCmps.forEach(ele => {
          const cform = ele.constantForm;
          cform.markAllAsTouched();
          if (cform.status === 'INVALID') {
              valid = false;
          }
      });

      this.periodicCmps.forEach(ele => {
          const pform = ele.periodicForm;
          pform.markAllAsTouched();
          if (pform.status === 'INVALID') {
              valid = false;
          }
      });
      
      return valid && this.hasUpdatedItem;
  }

  public handleSave(): void {
      if (!this.isValidToSave()) return;
      // this.store.dispatch(new UIUpdateLockAction({ full: true, scroll: false }));
      this.save();
  }

  private save(): void {
      if (this.isNewProjection) {
          this.store.dispatch(new PostProjectionAction(this.data));
          this.saved = true;
      } else {
          this.store.dispatch(new UpdatePorjectionAction(this.data));
      }
      this.rollBackData = this.data;
      this.resetValidation();    
  }

  private resetValidation(): void {
    this.hasUpdatedItem = false;
  }

}
