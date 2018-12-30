import { Component, OnInit, Input } from '@angular/core';
import { InputGroup } from 'src/app/constants/enums/input-group';
import { CalCycle } from 'src/app/constants/enums/cal-cycle';
import { MapperUtil } from 'src/app/utils/mapper-util';
import { format } from 'url';

@Component({
  selector: 'app-item-component',
  templateUrl: './item-component.component.html',
  styleUrls: ['./item-component.component.css']
})
export class ItemComponentComponent implements OnInit {

  public groupType = InputGroup;
  private calCycleEnum = CalCycle;
  public cycle = [];

  public affectiveMonth: string;

  // tslint:disable-next-line:no-input-rename
  @Input('itemData') itemData: any;
  // tslint:disable-next-line:no-input-rename
  @Input('itemGroupType') itemGroupType: InputGroup;

  constructor() {
    this.cycle = MapperUtil.EnumMapToArray(this.calCycleEnum);
  }

  ngOnInit() {
    this.initSetup();
  }

  private initSetup(): void {
    if (this.itemData.affectiveMonth) {
      this.affectiveMonth = this.formateAffectiveMonth(this.itemData.affectiveMonth);
    }
  }

  private formateAffectiveMonth(months: number[]): string {
    let nm = '';
    months.forEach((element, index) => {
      nm += (index === 0 ? '' : ', ') + element.toString();
    });
    return nm;
  }

}
