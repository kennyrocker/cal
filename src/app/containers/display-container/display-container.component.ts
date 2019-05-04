import { Component, OnInit, Input } from '@angular/core';
import { CalData } from 'src/app/constants/interfaces/cal-data';
import { CalculateService } from 'src/app/services/calculation/calculate-service';
import { DisplayItem } from 'src/app/constants/interfaces/display-item';
import * as reducerRoot from '../../reducers/index';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-display-container',
  templateUrl: './display-container.component.html',
  styleUrls: ['./display-container.component.css']
})
export class DisplayContainerComponent implements OnInit {

  monthlyData: DisplayItem[];


  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Monthly';
  showYAxisLabel = true;
  yAxisLabel = 'Balance';

  colorScheme = {
    domain: ['#132a13', '#31572c', '#4f772d', '#90a955', '#ecf39e']
  };

  constructor(private calService: CalculateService, private store: Store<reducerRoot.CalDataState>) { }

  ngOnInit() {
    this.store.select(reducerRoot.getCalData).pipe(
      map((calData) => {
        // biweekly
        //this.monthlyData = this.calService.getBiWeeklyProjection(0, 1, 26, calData);
        // monthly
        this.monthlyData = this.calService.getMonthlyProjection(0, 1, 12, calData);
        // annally
        //this.monthlyData = this.calService.getAnnallyProjection(0, 1, calData);
      })
    ).subscribe();

  }

  onSelect(event) {
    console.log(event);
  }

}
