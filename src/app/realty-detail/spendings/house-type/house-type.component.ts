import { Component, OnInit, OnDestroy, SimpleChanges, Output, EventEmitter } from "@angular/core";
import { BasicTypeService } from "../../../core/services/basic-type.service";
import { Store } from "@ngrx/store";

import { SchemaManagerService } from "../../../core/services/schema-manager.service";
import { RequestManagerService } from "../../../core/services/request-manager.service";
import { CalculatorManagerService } from "../../../core/services/calculator-manager.service";

import * as pageAction from "../../../core/actions/page.actions";
import * as areaAction from "../../../core/actions/area.actions";
import * as productAction from "../../../core/actions/product.actions";
import * as spendingsAction from "../../../core/actions/spendings.actions";
import * as profitAction from "../../../core/actions/profit.actions";
import * as implicitsCostAction from "../../../core/actions/implicit-costs.actions";
import * as rateReturnAction from "../../../core/actions/rate-return.actions";

import * as fromCore from "../../../core/reducers";

import * as moment from "moment";

const imageType = {
  village: {
    0: "home1.svg",
    1: "home2.svg",
    2: "home3.svg",
  },
};

@Component({
  selector: "app-house-type",
  templateUrl: "./house-type.component.html",
  styleUrls: ["./house-type.component.css"],
})
export class HouseTypeComponent implements OnInit {
  @Output() toggleEdit = new EventEmitter<any>();
  house = [
    { index: 0, name: "Type A" },
    { index: 1, name: "Type B" },
    { index: 2, name: "Type C" },
  ];

  start_house = 0;

  date_choose = new Date();
  date_next_choose = new Date(
    this.date_choose.getFullYear(),
    this.date_choose.getMonth() + 1,
    this.date_choose.getDate()
  );
  period = 1;
  period_lower = 0;

  date_choose_lower: any;
  date_next_choose_lower: any;

  currentProperty: string;

  constructor(private store: Store<any>) {
    this.store.select(fromCore.getPage).subscribe((page) => {
      this.currentProperty = page.page;
    });
  }

  ngOnInit() {}

  increacedIndex() {
    if (this.start_house < this.house.length - 1) {
      this.start_house++;
    }
  }

  decreasedIndex() {
    if (this.start_house > 0) {
      this.start_house--;
    }
  }

  getWordingType(indexW: number) {
    const wording = this.house.find((element) => element.index === indexW);
    return wording.name;
  }

  caculateMonthPeriod() {
    const a = new Date(this.date_choose);
    const b = new Date(this.date_next_choose);
    if (b > a) {
      const months = moment(b).diff(moment(a), "month", true);
      this.period = +months.toFixed(0);
    } else {
      this.period = 0;
    }
  }

  caculateMonthPeriodLower() {
    if (this.date_choose_lower !== undefined && this.date_next_choose_lower) {
      const a = new Date(this.date_choose_lower);
      const b = new Date(this.date_next_choose_lower);
      if (b > a) {
        const months = moment(b).diff(moment(a), "month", true);
        this.period_lower = +months.toFixed(0);
      } else {
        this.period_lower = 0;
      }
    }
  }

  getImage(index: number) {
    const wording = this.currentProperty;
    return imageType[wording][index];
  }

  save() {
    // const payload = {
    //   'feasibility' : localStorage.getItem('id'),
    //   'city_color' : this.areaData.townPlanColor,
    //   'ors' : parseFloat(this.areaData.osrValue.toString().replace(/,/g, '')),
    //   'fence_length' : parseFloat(this.areaData.fenceLength.toString().replace(/,/g, '')),
    //   'total_area' : parseFloat(this.areaData.totalArea.toString().replace(/,/g, '')),
    //   'far' : parseFloat(this.areaData.farValue.toString().replace(/,/g, '')),
    //   'legal_area' : parseFloat(this.areaData.lawArea.toString().replace(/,/g, '')),
    //   'land_price' : parseFloat(this.areaData.landPrice.toString().replace(/,/g, '')),
    //   'total_land_cost' : parseFloat(this.areaData.landPrice.toString().replace(/,/g, '')) * 100,
    // };
    // this.requestManagerService.updateArea(payload);
    console.log('in')
    this.toggleEdit.emit({next: '2', status: 'true'});
  }
}
