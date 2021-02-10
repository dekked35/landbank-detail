import { Component, OnInit, OnDestroy, SimpleChanges } from "@angular/core";
import { BasicTypeService } from "../../core/services/basic-type.service";
import { Store } from "@ngrx/store";

import { SchemaManagerService } from "../../core/services/schema-manager.service";
import { RequestManagerService } from "../../core/services/request-manager.service";
import { CalculatorManagerService } from "../../core/services/calculator-manager.service";

import * as pageAction from "../../core/actions/page.actions";
import * as areaAction from "../../core/actions/area.actions";
import * as productAction from "../../core/actions/product.actions";
import * as spendingsAction from "../../core/actions/spendings.actions";
import * as profitAction from "../../core/actions/profit.actions";
import * as implicitsCostAction from "../../core/actions/implicit-costs.actions";
import * as rateReturnAction from "../../core/actions/rate-return.actions";

import * as fromCore from "../../core/reducers";

import * as moment from "moment";
const imageType = {
  village: {
    0: "home1.svg",
    1: "home2.svg",
    2: "home3.svg",
  },
};

@Component({
  selector: "app-spendings",
  templateUrl: "./spendings.component.html",
  styleUrls: ["./spendings.component.css"],
})
export class SpendingsComponent implements OnInit, OnDestroy {
  currentProperty: string;
  areaData: any;
  productData: any;
  spendingsData: any;
  implicitCostData: any;
  rateReturnData: any;

  is_loading = true;
  house = [
    { index: 0, name: "Type A" },
    { index: 1, name: "Type B" },
    { index: 2, name: "Type C" },
  ];
  start_house = 0;

  constructor(
    private store: Store<any>,
    private requestManagerService: RequestManagerService,
    private calculatorManagerService: CalculatorManagerService,
    private shemaManagerService: SchemaManagerService
  ) {
    this.store.select(fromCore.getPage).subscribe((page) => {
      this.currentProperty = page.page;
    });
  }

  subscriptionArea: any;
  subscriptionProduct: any;
  subscriptionSpending: any;
  subscriptionImplicitsCost: any;
  subscriptionProfit: any;
  subscriptionRateReturn: any;

  typeProductDetail = "houseType";

  ngOnInit() {
    this.store.select(fromCore.getArea).subscribe((area) => {
      this.areaData = area.payload;
    });

    this.subscriptionSpending = this.store
      .select(fromCore.getSpendings)
      .subscribe((spendings) => {
        this.spendingsData = this.parseObject(spendings.payload);
      });

    this.subscriptionImplicitsCost = this.store
      .select(fromCore.getImplicitCosts)
      .subscribe((implicistCost) => {
        this.implicitCostData = this.parseObject(implicistCost.payload);
      });

    this.subscriptionRateReturn = this.store
      .select(fromCore.getRateReturn)
      .subscribe((rateReturn) => {
        this.rateReturnData = this.parseObject(rateReturn.payload);
      });

    this.subscriptionProduct = this.store
      .select(fromCore.getProduct)
      .subscribe((product) => {
        this.productData = product.payload;
      });
  }

  parseObject(data: any) {
    return JSON.parse(JSON.stringify(data));
  }

  changeType(type: string) {
    this.typeProductDetail = type;
    console.log(this.typeProductDetail);
  }

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

  getImage(index: number) {
    const wording = this.currentProperty;
    return imageType[wording][index];
  }

  getWordingType(indexW: number) {
    const wording = this.house.find((element) => element.index === indexW);
    return wording.name;
  }

  ngOnDestroy() {
    // this.subscriptionArea.unsubscribe();
    // this.subscriptionProduct.unsubscribe();
    // this.subscriptionSpending.unsubscribe();
    // this.subscriptionImplicitsCost.unsubscribe();
    // this.subscriptionProfit.unsubscribe();
    // this.subscriptionRateReturn.unsubscribe();
  }
}
