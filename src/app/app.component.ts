import { Component, OnInit } from '@angular/core';
import { CalDataService } from 'src/app/services/cal-data-service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public calData: any;

  constructor(private calDataService: CalDataService) {
    this.calDataService.get().pipe(
      map( data => this.calData = data )
    ).subscribe();
  }

  ngOnInit() {
  }

}
