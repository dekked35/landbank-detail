import {
  Component,
  OnInit,
  OnDestroy,
  SimpleChanges,
  Output,
  EventEmitter,
} from "@angular/core";
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

@Component({
  selector: "app-spendings",
  templateUrl: "./spendings.component.html",
  styleUrls: ["./spendings.component.css"],
})
export class SpendingsComponent implements OnInit, OnDestroy {
  @Output() toggleEdit = new EventEmitter<any>();
  currentProperty: string;
  areaData: any;
  productData: any;
  spendingsData: any;
  implicitCostData: any;
  rateReturnData: any;

  is_loading = true;

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

  onSummit(event) {
    const order = event.order;
    const page = event.page;
    if (page === "spending") {
      this.typeProductDetail = this.getIndex(order);
    } else {
      this.toggleEdit.emit(event);
    }
  }

  getIndex(index: number) {
    switch (index) {
      case 1:
        return "commonArea";
      case 2:
        return "operation";
      default:
        return "houseType";
    }
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
