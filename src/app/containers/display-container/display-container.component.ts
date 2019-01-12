import { Component, OnInit, Input } from '@angular/core';
import { CalData } from 'src/app/constants/interfaces/cal-data';
import { CalculateService } from 'src/app/services/calucate-service';
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
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private calService: CalculateService, private store: Store<reducerRoot.CalDataState>) { }

  ngOnInit() {
    this.store.select(reducerRoot.getCalData).pipe(
      map((calData) => {
        this.monthlyData = this.calService.calculateMonthly(calData);
      })
    ).subscribe();

  }

  onSelect(event) {
    console.log(event);
  }

}
