import {Component, OnDestroy, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { CalculateService } from 'src/app/services/calculation/calculate-service';
import { DisplayItem } from 'src/app/constants/interfaces/display-item';
import * as reducerRoot from '../../../reducers/index';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import {CalCycle} from '../../../constants/enums/cal-cycle';
import {MapperUtil} from '../../../utils/mapper-util';
import {Subject, Subscription} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/internal/operators/distinctUntilChanged';
import {CalData} from '../../../constants/interfaces/cal-data';
import {filter} from 'rxjs/internal/operators';

@Component({
  selector: 'app-display-container',
  templateUrl: './display-container.component.html',
  styleUrls: ['./display-container.component.scss']
})
export class DisplayContainerComponent implements OnInit, OnDestroy {

  @ViewChild('amountCycle') monthSelector: any;

  private calCycleEnum = CalCycle;
  public cycleArr = [];
  private cycleChangeSub: Subscription;
  private cycleChangeSubject = new Subject<any>();
  public displayCalCycle = CalCycle.MONTHLY;
  public calData: CalData = {};
  public displayData: DisplayItem[];

  multi: any[];
  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = CalCycle[this.displayCalCycle];
  showYAxisLabel = true;
  yAxisLabel = 'Balance';

  colorScheme = {
    domain: ['#132a13', '#31572c', '#4f772d', '#90a955', '#ecf39e']
  };

  constructor(private calService: CalculateService, private store: Store<reducerRoot.CalDataState>) {
    this.cycleArr = MapperUtil.EnumMapToArray(this.calCycleEnum);
    this.initSub();
  }

  ngOnInit() {
    this.store.select(reducerRoot.getCalData).pipe(
      filter( data => data !== undefined),
      map((data) => {
          this.calData = data;
          this.renderChart();
      })
    ).subscribe();

  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    this.monthSelector.nativeElement.value = this.displayCalCycle;
  }

  ngOnDestroy() {
    this.cycleChangeSub.unsubscribe();
  }

  public bindCycleChangeSubject(value): void {
    this.cycleChangeSubject.next(value);
  }

  private initSub(): void {
    this.cycleChangeSub = this.cycleChangeSubject.pipe(
      distinctUntilChanged()
    ).subscribe((value) => {
      this.displayCalCycle = Number(value);
      this.renderChart();
    });
  }

  private renderChart(): void {

    this.xAxisLabel = CalCycle[this.displayCalCycle];

    switch (this.displayCalCycle) {

      case CalCycle.BIWEEKLY :
          this.displayData = this.calService.getBiWeeklyProjection(0, 1, 26, this.calData);
          break;

      case CalCycle.MONTHLY :
          this.displayData = this.calService.getMonthlyProjection(0, 1, 12, this.calData);
          break;

      case CalCycle.ANNUALLY :
          this.displayData = this.calService.getAnnuallyProjection(0, 1, this.calData);
          break;
    }

  }

  onSelect(event) {
    console.log(event);
  }

}
