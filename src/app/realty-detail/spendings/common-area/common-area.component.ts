import {
  Component,
  OnInit,
  OnDestroy,
  SimpleChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { BasicTypeService } from '../../../core/services/basic-type.service';
import { Store } from '@ngrx/store';

import { SchemaManagerService } from '../../../core/services/schema-manager.service';
import { RequestManagerService } from '../../../core/services/request-manager.service';
import { CalculatorManagerService } from '../../../core/services/calculator-manager.service';

import * as pageAction from '../../../core/actions/page.actions';
import * as areaAction from '../../../core/actions/area.actions';
import * as productAction from '../../../core/actions/product.actions';
import * as spendingsAction from '../../../core/actions/spendings.actions';
import * as profitAction from '../../../core/actions/profit.actions';
import * as implicitsCostAction from '../../../core/actions/implicit-costs.actions';
import * as rateReturnAction from '../../../core/actions/rate-return.actions';

import * as fromCore from '../../../core/reducers';

import * as moment from 'moment';

@Component({
  selector: 'app-common-area',
  templateUrl: './common-area.component.html',
  styleUrls: ['./common-area.component.css'],
})
export class CommonAreaComponent implements OnInit {
  @Output() toggleEdit = new EventEmitter<any>();
  responsiveOptions;
  localStorage: any;
  selected = { gate: '', fence: '', common: '' };
  house = [
    { name: 'ที่ดิน' },
    { name: 'ประตูทางเข้าและรั้ว' },
    { name: 'ถนนและสวน' },
    { name: 'พื้นที่ส่วนกลาง' },
    { name: 'สาธาราณูปโภค' },
    { name: 'ค่าออกแบบ' },
  ];
  greenArea = [
    { name: 'Road', price: '100', spending: '100' },
    { name: 'Food Path', price: '100', spending: '100' },
    { name: 'Drainge', price: '100', spending: '100' },
    { name: 'Manhole', price: '100', spending: '100' },
  ];
  common = [
    { id: '1', name: 'Sale Office', price: '10000000' },
    { id: '2', name: 'Club House', price: '200000000' },
    { id: '3', name: 'Swimming Pool', price: '200000000' },
    { id: '4', name: 'Sale Office 2', price: '10000000' },
    { id: '5', name: 'Club House 2', price: '200000000' },
    { id: '6', name: 'Swimming Pool 2', price: '200000000' },
    { id: '7', name: 'Sale Office 3', price: '10000000' },
    { id: '8', name: 'Club House 3', price: '200000000' },
    { id: '9', name: 'Swimming Pool 3', price: '200000000' },
  ];

  electric = [
    { name: '1ชั้น', building: '200', pricePerHouse: '1000' },
    { name: '2ชั้น', building: '100', pricePerHouse: '2000' },
    { name: '3ชั้น', building: '50', pricePerHouse: '3000' },
  ];

  water = [
    { name: '1ชั้น', building: '200', pricePerHouse: '1000' },
    { name: '2ชั้น', building: '100', pricePerHouse: '2000' },
    { name: '3ชั้น', building: '50', pricePerHouse: '3000' },
  ];
  allElectric: number;
  allWater: number;
  currentProperty: string;
  clickBox = 'ที่ดิน';
  gates = [];
  fences = [];
  typeDesign = 'arch';
  landCost = {
    pricePerRai: '100000',
    pricePerWa: '250',
  };
  landFill = {
    lengthForFillPerMeter: '1',
    area: '100',
    lengthInSystem: '100000',
    areaForFill: '100',
    priceForFill: '100000',
  };
  roadAndGreen = {
    realSize: '10000',
    roadWidth: '8',
    thirtyPerAllArea: '10000',
    pricePerMeter: '100',
    catagory: [
      { name: 'road', area: '100', pricePerUnit: '100', price: '100' },
      { name: 'foodPath', area: '100', pricePerUnit: '100', price: '100' },
      { name: 'drainge', area: '100', pricePerUnit: '100', price: '100' },
      { name: 'manHole', area: '100', pricePerUnit: '100', price: '100' },
    ],
    realSizeGreen: '100',
    realAreaGreen: '80',
    pricePerMeterGreen: '10000',
    standardPriceGreen: '100',
    allPrice: 10000,
  };

  architecture = {
    priceDesign: '20000',
    pricePerDesign: '20000',
    priceAllBuilding: '20000',
    priceStructure: '20000',
    priceSystem: '20000',
    totalPrice: 400000,
  };

  landscape = {
    priceStructure: '20000',
  };

  housePermit = {
    allBuilding: '20000',
    pricePerBuilding: '20000',
    allPrice: 400000,
  };

  subdivision = {
    allBuilding: '20000',
    pricePerBuilding: '20000',
    allPrice: 400000,
  };

  constructor(
    private store: Store<any>,
    private requestManagerService: RequestManagerService
  ) {
    this.store.select(fromCore.getPage).subscribe((page) => {
      this.currentProperty = page.page;
    });
    this.localStorage = JSON.parse(localStorage.getItem('info'));
    if (this.localStorage.feasibility_common_setting) {
      this.updateItem();
    }
  }

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];

    this.gates = [
      { id: 1, name: 'โครงการขนาดใหญ่ (หรู)', price: '1000000' },
      { id: 2, name: 'โครงการขนาดใหญ่ (ปานกลาง)', price: '1000000' },
      { id: 3, name: 'โครงการขนาดใหญ่ (ธรรมดา)', price: '1000000' },
      { id: 4, name: 'โครงการขนาดกลาง (หรู)', price: '1000000' },
      { id: 5, name: 'โครงการขนาดกลาง (ปานกลาง)', price: '1000000' },
      { id: 6, name: 'โครงการขนาดกลาง (ธรรมดา)', price: '1000000' },
    ];

    this.fences = [{ id: 1, name: 'รั้วแบบที่ 1', price: '1000000' }];
    this.changeTotalElectric();
    this.changeTotalWater();
  }

  setClickBox(name) {
    this.clickBox = name;
  }

  selectedItem(type, id) {
    let set;
    switch (type) {
      case 'gate':
        set = this.selected.gate;
        break;
      case 'fence':
        set = this.selected.fence;
        break;
      case 'common':
        set = this.selected.common;
        break;
    }

    set = id;

    switch (type) {
      case 'gate':
        this.selected.gate = set;
        break;
      case 'fence':
        this.selected.fence = set;
        break;
      case 'common':
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

  convertToWa() {
    this.landCost.pricePerWa = +this.landCost.pricePerRai / 400 + '';
  }

  updateItem() {}

  async save() {
    const value = JSON.parse(localStorage.getItem('info'))
      .feasibility_common_setting;
    const payload = {
      feasibility: localStorage.getItem('id'),
      lc_price_per_rai: this.landCost.pricePerRai,
      lc_price_per_sq_wa: this.landCost.pricePerWa,
      lc_fill_distance_per_m: this.landFill.lengthForFillPerMeter,
      lc_fill_area_size_rai: 0,
      lc_fill_area_size_ngan: 0,
      lc_fill_area_size_wa: 0,
      lc_price_in_system_per_rai: this.landFill.lengthInSystem,
      lc_amount_of_soil_needed: this.landFill.areaForFill,
      lc_fill_cost: this.landFill.priceForFill,
      lc_total_project_price: 0,
      gate_type: this.selected.gate,
      gate_type_price:
        this.selected.gate !== ''
          ? this.gates.find((i) => this.selected.gate === i.id).price
          : '',
      project_cycle_length: 0,
      fence_type: this.selected.fence,
      fence_type_price:
        this.selected.fence !== ''
          ? this.fences.find((i) => this.selected.fence === i.id).price
          : '',
      fence_type_total_price:
        this.selected.fence !== ''
          ? this.fences.find((i) => this.selected.fence === i.id).price
          : '',
      rga_actual_size_main_road: this.roadAndGreen.realSize,
      rga_approx_size_5_percent_main_road: 0,
      rga_wide_road_main_road: this.roadAndGreen.roadWidth,
      rga_cost_per_sqm_main_road: this.roadAndGreen.pricePerMeter,
      // rga_actual_size_secondary_road: 0,
      // rga_approx_size_25_percent_secondary_road: 0,
      // rga_wide_road_secondary_road: 0,
      // rga_cost_per_sqm_secondary_road: 0,
      // rga_road_price_project: 0,
      rga_foot_path: this.roadAndGreen.catagory.find(
        (i) => i.name === 'foodPath'
      ).area,
      rga_price_foot_path: this.roadAndGreen.catagory.find(
        (i) => i.name === 'foodPath'
      ).pricePerUnit,
      rga_expense_foot_path: this.roadAndGreen.catagory.find(
        (i) => i.name === 'foodPath'
      ).price,
      rga_drainge: this.roadAndGreen.catagory.find((i) => i.name === 'drainge')
        .area,
      rga_price_drainge: this.roadAndGreen.catagory.find(
        (i) => i.name === 'drainge'
      ).pricePerUnit,
      rga_expense_drainge: this.roadAndGreen.catagory.find(
        (i) => i.name === 'drainge'
      ).price,
      rga_manhole: this.roadAndGreen.catagory.find((i) => i.name === 'manHole')
        .area,
      rga_price_manhole: this.roadAndGreen.catagory.find(
        (i) => i.name === 'manHole'
      ).pricePerUnit,
      rga_expense_manhole: this.roadAndGreen.catagory.find(
        (i) => i.name === 'manHole'
      ).price,
      rga_law_5_percent_total_area: this.roadAndGreen.realSizeGreen,
      rga_real_space: this.roadAndGreen.realAreaGreen,
      rga_estimate_cost_per_sqm: this.roadAndGreen.pricePerMeterGreen,
      rga_standard_garden_price: this.roadAndGreen.standardPriceGreen,
      security_sys_protect_level: this.selected.common,
      security_sys_protect_level_price:
        this.selected.common !== ''
          ? this.common.find((i) => this.selected.common === i.id).price
          : '',
      sale_office: 0,
      sale_office_price: 0,
      club_house: 0,
      club_house_price: 0,
      fitness_facility: 0,
      fitness_facility_price: 0,
      swimming_pool: 0,
      swimming_pool_price: 0,
      pu_main_electric_1_floor_price: this.electric[0].building,
      pu_main_electric_1_floor_price_unit: this.electric[0].pricePerHouse,
      pu_main_electric_2_floor_price: this.electric[1].building,
      pu_main_electric_2_floor_price_unit: this.electric[1].pricePerHouse,
      pu_main_electric_3_floor_price: this.electric[2].building,
      pu_main_electric_3_floor_price_unit: this.electric[2].pricePerHouse,
      pu_main_electric_total_price: this.allElectric,
      pu_main_water_pipe_1_floor_price: this.water[0].building,
      pu_main_water_pipe_1_floor_price_unit: this.water[0].pricePerHouse,
      pu_main_water_pipe_2_floor_price: this.water[1].building,
      pu_main_water_pipe_2_floor_price_unit: this.water[1].pricePerHouse,
      pu_main_water_pipe_3_floor_price: this.water[2].building,
      pu_main_water_pipe_3_floor_price_unit: this.water[2].pricePerHouse,
      pu_main_water_pipe_total_price: this.allWater,
      al_house_design_price_type_1: this.architecture.priceDesign,
      al_house_design_price_type_2: this.architecture.pricePerDesign,
      al_house_design_price_type_3: this.architecture.priceAllBuilding,
      al_house_design_price_type_4: this.architecture.priceStructure,
      al_house_design_price_type_5: this.architecture.priceSystem,
      al_house_design_price_total: this.architecture.totalPrice,
      al_house_design_price_landscape: this.landscape.priceStructure,
      hs_number_of_house: this.housePermit.allBuilding,
      hs_cost_per_house: this.housePermit.pricePerBuilding,
      hs_price_of_all_house_in_project: this.housePermit.allPrice,
      hs_fee_number_of_house: this.subdivision.allBuilding,
      hs_fee_cost_per_house: this.subdivision.pricePerBuilding,
      hs_fee_price_of_all_house_in_project: this.subdivision.allPrice,
    };
    if (value === null) {
      await this.requestManagerService.insertCommon(payload);
    } else {
      const id = value.id;
      this.requestManagerService.updateCommon(payload, id);
    }
    // this.requestManagerService.updateArea(payload);
    this.toggleEdit.emit({ page: 'spending', order: 2 });
  }

  getUrl(name: string) {
    switch (name) {
      case 'ที่ดิน':
        return 'url(assets/images/land_cost_side_common.jpg)';
      case 'ประตูทางเข้าและรั้ว':
        return 'url(assets/images/gate_and_fence_side_common.jpg)';
      case 'ถนนและสวน':
        return 'url(assets/images/road_and_garden_side_common.jpg)';
      case 'พื้นที่ส่วนกลาง':
        return 'url(assets/images/common_area_side_common.jpg)';
      case 'สาธาราณูปโภค':
        return 'url(assets/images/public_utility_side_common.jpg)';
      case 'ค่าออกแบบ':
        return 'url(assets/images/design_cost_side_common.jpg)';
    }
  }
}
