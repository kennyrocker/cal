import { Input, Component, OnDestroy, OnInit, AfterViewInit, ViewChild, OnChanges, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { CalculateService } from 'src/app/services/calculation/calculate-service';
import { DisplaySingleItem } from 'src/app/constants/interfaces/display-single-item';

import { CalCycle } from '../../../constants/enums/cal-cycle';
import { MapperUtil } from '../../../utils/mapper-util';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { CalData } from '../../../constants/interfaces/cal-data';
import { DisplayMultiItem } from 'src/app/constants/interfaces/display-multi-item';
import { Constant } from '../../../constants/constant';


@Component({
  selector: 'app-display-container',
  templateUrl: './display-container.component.html',
  styleUrls: ['./display-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayContainerComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

  // tslint:disable-next-line:no-input-rename
  @Input('single') public single: CalData;
  // tslint:disable-next-line:no-input-rename
  @Input('multi') public multi: CalData[];

  @ViewChild('amountCycle') monthSelector: any;
  @ViewChild('year') yearInput: any;

  private calCycleEnum = CalCycle;
  public cycleArr = [];
  private cycleChangeSub: Subscription;
  private cycleChangeSubject = new Subject<any>();
  public displayCalCycle = CalCycle.MONTHLY;

  public displayDataSingle: DisplaySingleItem[];
  public displayDataMulti: DisplayMultiItem[];

  public yearEnable = false;
  private year = 1;

  public view: any[];
  // options
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel = CalCycle[this.displayCalCycle];
  public showYAxisLabel = true;
  public yAxisLabel = 'Balance';
  public colorSchemeSingle = Constant.DISPLAY_CHART_SCHEME_SINGLE;
  public colorSchemeMulti = Constant.DISPLAY_CHART_SCHEME_MULTI;

  constructor(private calService: CalculateService) {
    this.cycleArr = MapperUtil.EnumMapToArray(this.calCycleEnum);
    this.initSub();
  }

  @HostListener('window:resize', ['$event'])
    onResize(event) {
      this.sizingChart();
  }

  ngOnInit() {
      this.sizingChart();
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.monthSelector.nativeElement.value = this.displayCalCycle;
  }

  ngOnDestroy() {
    this.cycleChangeSub.unsubscribe();
  }

  public bindCycleChangeSubject(value): void {
    this.cycleChangeSubject.next(value);
  }

  public bindYearChangeSubject(event): void {
      const year = Number(event.target.value);
      if ( year < 1 || year > 50 ) {
          this.yearInput.nativeElement.value = 1;
      } else {
          this.year = year;
          this.render();
      }
  }

  private initSub(): void {
      this.cycleChangeSub = this.cycleChangeSubject.pipe(
          distinctUntilChanged()
      ).subscribe((value) => { // only apply when cycle change
          this.displayCalCycle = Number(value);
          this.yearEnable = this.displayCalCycle === 1;
          this.render();
      });
  }

  private render(): void {
      if (this.single) {
          this.renderChartSingle();
      }
      if (this.multi && this.multi.length > 1) {
          this.renderChartMulti();
      }
  }

  private calByCycle(data: CalData, cycle: number): DisplaySingleItem[] {
    switch (cycle) {
      case CalCycle.BIWEEKLY :
          return this.calService.getBiWeeklyProjection(0, 1, cycle, data);
      case CalCycle.MONTHLY :
          return this.calService.getMonthlyProjection(0, 1, cycle, data);
      case CalCycle.ANNUALLY :
          return this.calService.getAnnuallyProjection(0, this.year, data);
      default:
          return [];
    }
  }

  private renderChartSingle(): void {
    if (this.yearEnable) {
        this.xAxisLabel = `In ${this.year} year`;
    } else {
        this.xAxisLabel = CalCycle[this.displayCalCycle];
    }
    if (this.isPlaceHolderData(this.single)) {
        this.displayDataSingle = [];
        return;
    }
    this.displayDataSingle = this.calByCycle(this.single, this.displayCalCycle);
  }

  private renderChartMulti(): void {
      if (this.yearEnable) {
          this.xAxisLabel = `In ${this.year} years`;
      } else {
          this.xAxisLabel = CalCycle[this.displayCalCycle];

      }
      this.displayDataMulti = this.convertMultiDisplay(this.multi);
  }

  private convertMultiDisplay(data: CalData[]): DisplayMultiItem[] {
      const set = {};
      const out = [];
      data.forEach(calData => {
          set[calData.name] = this.calByCycle(calData, this.displayCalCycle);
      });
      const key = data[0].name;
      const length = set[key].length;
      for (let i = 0; i < length; i++) {
          const oj = {
              name: undefined,
              series: []
          };
          oj.name = (i + 1).toString();
          for (const k in set) {
              oj.series.push({ name: k, value: Number(set[k][i].value) });
          }
          out.push(oj);
      }
      return out;
  }

  private isPlaceHolderData(calData: CalData): boolean {
      return calData.constantIncome.length === 1 && calData.constantExpense.length === 1 &&
             calData.periodicalVariable.length === 1 && calData.constantIncome[0].amount === 0 &&
             calData.constantExpense[0].amount === 0 && calData.periodicalVariable[0].amount === 0;
  }

  private sizingChart(): void {
    if (window && window.innerWidth) { // unit as px
      const chartHeight = 450;
      const chartOffset = 120;
      const innerWidth = window.innerWidth - chartOffset;
      this.view = [innerWidth, chartHeight];
    }
  }

  // place holder
  onSelect(event) {
    console.log(event);
  }

}
