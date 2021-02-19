import { Component, OnInit, OnDestroy, SimpleChanges } from "@angular/core";
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

@Component({
  selector: "app-common-area",
  templateUrl: "./common-area.component.html",
  styleUrls: ["./common-area.component.css"],
})
export class CommonAreaComponent implements OnInit {
  responsiveOptions;
  selected = { gate: [], fence: [], common: [] };
  house = [
    { name: "ที่ดิน" },
    { name: "ประตูทางเข้าและรั้ว" },
    { name: "ถนนและสวน" },
    { name: "พื้นที่ส่วนกลาง" },
    { name: "สาธาราณูปโภค" },
    { name: "ค่าออกแบบ" },
  ];
  greenArea = [
    { name: "Road", price: "100", spending: "100" },
    { name: "Food Path", price: "100", spending: "100" },
    { name: "Drainge", price: "100", spending: "100" },
    { name: "Manhole", price: "100", spending: "100" },
  ];
  common = [
    { name: "Sale Office", price: "10000000" },
    { name: "Club House", price: "200000000" },
    { name: "Swimming Pool", price: "200000000" },
    { name: "Sale Office 2", price: "10000000" },
    { name: "Club House 2", price: "200000000" },
    { name: "Swimming Pool 2", price: "200000000" },
    { name: "Sale Office 3", price: "10000000" },
    { name: "Club House 3", price: "200000000" },
    { name: "Swimming Pool 3", price: "200000000" },
  ];

  electric = [
    { name: "1ชั้น", building: "200", pricePerHouse: "1000" },
    { name: "2ชั้น", building: "100", pricePerHouse: "2000" },
    { name: "3ชั้น", building: "50", pricePerHouse: "3000" },
  ];

  water = [
    { name: "1ชั้น", building: "200", pricePerHouse: "1000" },
    { name: "2ชั้น", building: "100", pricePerHouse: "2000" },
    { name: "3ชั้น", building: "50", pricePerHouse: "3000" },
  ];
  allElectric: number;
  allWater: number;
  currentProperty: string;
  clickBox = "ที่ดิน";
  gates = [];
  fences = [];
  typeDesign = "arch";
  landCost = {
    pricePerRai: "10000",
    pricePerWa: "10000",
  };
  landFill = {
    lengthForFillPerMeter: "100",
    area: "100",
    lengthInSystem: "1000",
    areaForFill: "100",
    priceForFill: "100000",
  };
  roadAndGreen = {
    realSize: "10000",
    roadWidth: "8",
    thirtyPerAllArea: "10000",
    pricePerMeter: "100",
    catagory: [
      { name: "road", area: "100", pricePerUnit: "100", price: "100" },
      { name: "foodPath", area: "100", pricePerUnit: "100", price: "100" },
      { name: "drainge", area: "100", pricePerUnit: "100", price: "100" },
      { name: "manHole", area: "100", pricePerUnit: "100", price: "100" },
    ],
    realSizeGreen: "100",
    realAreaGreen: "80",
    pricePerMeterGreen: "10000",
    standardPriceGreen: "100",
    allPrice: 10000,
  };

  architecture = {
    priceDesign: "20000",
    pricePerDesign: "20000",
    priceAllBuilding: "20000",
    priceStructure: "20000",
    priceSystem: "20000",
    totalPrice: 400000,
  };

  landscape = {
    priceStructure: "20000",
  };

  housePermit = {
    allBuilding: '20000',
    pricePerBuilding: '20000',
    allPrice: 400000
  }

  subdivision = {
    allBuilding: '20000',
    pricePerBuilding: '20000',
    allPrice: 400000
  }

  constructor(private store: Store<any>) {
    this.store.select(fromCore.getPage).subscribe((page) => {
      this.currentProperty = page.page;
    });
  }

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: "1024px",
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: "768px",
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: "560px",
        numVisible: 1,
        numScroll: 1,
      },
    ];

    this.gates = [
      { id: 1, name: "โครงการขนาดใหญ่ (หรู)", price: '1000000' },
      { id: 2, name: "โครงการขนาดใหญ่ (ปานกลาง)", price: '1000000' },
      { id: 3, name: "โครงการขนาดใหญ่ (ธรรมดา)", price: '1000000' },
      { id: 4, name: "โครงการขนาดกลาง (หรู)", price: '1000000' },
      { id: 5, name: "โครงการขนาดกลาง (ปานกลาง)", price: '1000000' },
      { id: 6, name: "โครงการขนาดกลาง (ธรรมดา)", price: '1000000' },
    ];

    this.fences = [{ id: 1, name: "รั้วแบบที่ 1" , price: '1000000'}];
    this.changeTotalElectric();
    this.changeTotalWater();
  }

  setClickBox(name) {
    this.clickBox = name;
  }

  selectedItem(type, id) {
    let set;
    switch (type) {
      case "gate":
        set = this.selected.gate;
        break;
      case "fence":
        set = this.selected.fence;
        break;
      case "common":
        set = this.selected.common;
        break;
    }
    const index = set.indexOf(id);
    if (index >= 0) {
      set.splice(index, 1);
    } else {
      set.push(id);
    }

    switch (type) {
      case "gate":
        this.selected.gate = set;
        break;
      case "fence":
        this.selected.fence = set;
        break;
      case "common":
        this.selected.common = set;
        break;
    }
  }

  changeTotalElectric() {
    const elec = this.electric;
    const total = elec.reduce(
      (am, cu) => +am + +cu.building * +cu.pricePerHouse,
      0
    );
    this.allElectric = total;
  }

  changeTotalWater() {
    const water = this.water;
    const total = water.reduce(
      (am, cu) => +am + +cu.building * +cu.pricePerHouse,
      0
    );
    this.allWater = total;
  }

  changeType(type: string) {
    this.typeDesign = type;
  }
}
