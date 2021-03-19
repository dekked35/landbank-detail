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
  currentInfo: any;
  selected = {
    gate: '',
    fence: '',
    common: {
      security: '',
      sale_office: '',
      clubhouse: '',
      fitness: '',
      swimming_pool: '',
    },
  };

  // ดึงค่านี้จาก master data
  dumpLandArea = 10000;
  project_cycle_length = 2000;
  //
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
  common = {
    security: [],
    sale_office: [],
    clubhouse: [],
    fitness: [],
    swimming_pool: [],
  };

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
  areaForFill = {
    rai: 1,
    ngan: 2,
    wa: 4,
  };
  allElectric: number;
  allWater: number;
  currentProperty: string;
  clickBox = 'ที่ดิน';
  gates = [];
  fences = [];
  typeDesign = 'arch';
  landCost = {
    lc_price_per_rai: '100000',
    pricePerWa: '250',
  };
  landFill = {
    lengthForFillPerMeter: '1',
    area: '100',
    lengthInSystem: '100000',
    priceForFill: '100000',
  };
  roadAndGreen = {
    primaryRoad: {
      realSize: '10000',
      roadWidth: '12',
      aroundAllArea: '10000',
      pricePerMeter: '100',
    },
    secondaryRoad: {
      realSize: '10000',
      roadWidth: '6',
      aroundAllArea: '10000',
      pricePerMeter: '100',
    },
    catagory: [
      { name: 'foodPath', area: '100', pricePerUnit: '100' },
      { name: 'drainge', area: '100', pricePerUnit: '100' },
      { name: 'manHole', area: '100', pricePerUnit: '100' },
    ],
    realSizeGreen: '100',
    realAreaGreen: '80',
    pricePerMeterGreen: '10000',
    standardPriceGreen: '100',
    allPrice: 10000,
  };

  architecture = {
    priceHouse1: '20000',
    priceHouse2: '20000',
    priceHouse3: '20000',
    priceHouse4: '20000',
    priceHouse5: '20000',
  };

  landscape = {
    priceStructure: '20000',
  };

  housePermit = {
    allBuilding: '20',
    pricePerBuilding: '20000',
    allPrice: 400000,
  };

  subdivision = {
    allBuilding: '20',
    pricePerBuilding: '20000',
    allPrice: 400000,
  };

  constructor(
    private store: Store<any>,
    private requestManagerService: RequestManagerService,
    private shemaManagerService: SchemaManagerService,
  ) {
    this.store.select(fromCore.getPage).subscribe((page) => {
      this.currentProperty = page.page;
    });
    this.store.select(fromCore.getInfo).subscribe((info) => {
      if (info) {
        this.currentInfo = info.info;
        this.changeProject()
      }
    });

  }

  ngOnInit() {
    this.setInitialValue();
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
      {
        id: 1,
        gate_type_name: 'โครงการขนาดใหญ่ (หรู)',
        default_price: '1000000',
      },
      {
        id: 2,
        gate_type_name: 'โครงการขนาดใหญ่ (ปานกลาง)',
        default_price: '1000000',
      },
      {
        id: 3,
        gate_type_name: 'โครงการขนาดใหญ่ (ธรรมดา)',
        default_price: '1000000',
      },
      {
        id: 4,
        gate_type_name: 'โครงการขนาดกลาง (หรู)',
        default_price: '1000000',
      },
      {
        id: 5,
        gate_type_name: 'โครงการขนาดกลาง (ปานกลาง)',
        default_price: '1000000',
      },
      {
        id: 6,
        gate_type_name: 'โครงการขนาดกลาง (ธรรมดา)',
        default_price: '1000000',
      },
    ];

    this.fences = [
      { id: 1, fence_type_name: 'รั้วแบบที่ 1', default_price: '1000000' },
    ];
    this.changeTotalElectric();
    this.changeTotalWater();
  }

  async setInitialValue() {
    const [
      masterGate,
      masterFence,
      masterSecurity,
      masterSaleOffice,
      masterClubHouse,
      masterFitness,
      masterSwimmingPool,
    ] = await Promise.all([
      this.requestManagerService.requestMasterGate(),
      this.requestManagerService.requestMasterFence(),
      this.requestManagerService.requestMasterSecurity(),
      this.requestManagerService.requestMasterSaleOffice(),
      this.requestManagerService.requestMasterClubHouse(),
      this.requestManagerService.requestMasterFitness(),
      this.requestManagerService.requestMasterSwimmingPool(),
    ]);

    // if (masterGate.length > 0) {
      this.gates = masterGate;
    // }
    // if (masterFence.length > 0) {
      this.fences = masterFence;
    // }
    // if (masterSecurity.length > 0) {
      this.common.security = masterSecurity;
    // }
    // if (masterSaleOffice.length > 0) {
      this.common.sale_office = masterSaleOffice;
    // }
    // if (masterClubHouse.length > 0) {
      this.common.clubhouse = masterClubHouse;
    // }
    // if (masterFitness.length > 0) {
      this.common.fitness = masterFitness;
    // }
    // if (masterSwimmingPool.length > 0) {
      this.common.swimming_pool = masterSwimmingPool;
    // }
    this.changeProject()
  }

  async changeProject(){
    if (this.currentInfo.feasibility_common_setting) {
      const common_id = this.currentInfo.feasibility_common_setting.id;
      const fullInfo = await this.requestManagerService.requestFullCommon(
        common_id
      );
      this.updateItem(fullInfo);
    } else {
      const temp = this.shemaManagerService.getCommonArea().spendings.common;
      if(Object.keys(temp).length > 0) {
        Object.keys(temp).forEach(element => {
          this[element] = temp[element];
        });
      }
    }
  }

  setClickBox(name) {
    this.clickBox = name;
  }

  selectedItem(type, id, name?: string) {
    switch (type) {
      case 'gate':
        this.selected.gate = id;
        break;
      case 'fence':
        this.selected.fence = id;
        break;
      case 'common':
        this.selected.common[name] = id;
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
    this.landCost.pricePerWa = +this.landCost.lc_price_per_rai / 400 + '';
  }

  updateItem(value: any) {
    this.landCost.lc_price_per_rai = value.lc_price_per_rai;
    this.landCost.pricePerWa = value.lc_price_per_sq_wa;
    this.landFill.lengthForFillPerMeter = value.lc_fill_distance_per_m;
    this.areaForFill.rai = value.lc_fill_area_size_rai;
    this.areaForFill.ngan = value.lc_fill_area_size_ngan;
    this.areaForFill.wa = value.lc_fill_area_size_wa;
    this.landFill.lengthInSystem = value.lc_price_in_system_per_rai;
    this.landFill.priceForFill = value.lc_fill_cost;
    this.selected.gate = value.gate_type.id;
    if (this.selected.gate) {
      this.gates.find((i) => i.id === this.selected.gate).default_price =
        value.gate_type_price;
    }
    this.project_cycle_length = value.project_cycle_length;
    this.selected.fence = value.fence_type.id;
    if (this.selected.fence) {
      this.fences.find((i) => i.id === this.selected.fence).default_price =
        value.fence_type_price;
    }
    this.roadAndGreen.primaryRoad.realSize = value.rga_actual_size_main_road;
    this.roadAndGreen.primaryRoad.aroundAllArea =
      value.rga_approx_size_5_percent_main_road;
    this.roadAndGreen.primaryRoad.roadWidth = value.rga_wide_road_main_road;
    this.roadAndGreen.primaryRoad.pricePerMeter =
      value.rga_cost_per_sqm_main_road;
    this.roadAndGreen.secondaryRoad.realSize =
      value.rga_actual_size_secondary_road;
    this.roadAndGreen.secondaryRoad.aroundAllArea =
      value.rga_approx_size_25_percent_secondary_road;
    this.roadAndGreen.secondaryRoad.roadWidth =
      value.rga_wide_road_secondary_road;
    this.roadAndGreen.secondaryRoad.pricePerMeter =
      value.rga_cost_per_sqm_secondary_road;
    this.roadAndGreen.catagory.find((i) => i.name === 'foodPath').area =
      value.rga_foot_path;
    this.roadAndGreen.catagory.find((i) => i.name === 'foodPath').pricePerUnit =
      value.rga_price_foot_path;
    this.roadAndGreen.catagory.find((i) => i.name === 'drainge').area =
      value.rga_drainge;
    this.roadAndGreen.catagory.find((i) => i.name === 'drainge').pricePerUnit =
      value.rga_price_drainge;
    this.roadAndGreen.catagory.find((i) => i.name === 'manHole').area =
      value.rga_manhole;
    this.roadAndGreen.catagory.find((i) => i.name === 'manHole').pricePerUnit =
      value.rga_price_manhole;
    this.roadAndGreen.realSizeGreen = value.rga_law_5_percent_total_area;
    this.roadAndGreen.realAreaGreen = value.rga_real_space;
    this.roadAndGreen.pricePerMeterGreen = value.rga_estimate_cost_per_sqm;
    this.roadAndGreen.standardPriceGreen = value.rga_standard_garden_price;
    this.selected.common.security = value.security_sys_protect_level.id;
    if (this.selected.common.security) {
      this.common.security.find(
        (i) => this.selected.common.security === i.id
      ).default_price = value.security_sys_protect_level_price;
    }
    this.selected.common.sale_office = value.sale_office.id;
    if (this.selected.common.sale_office) {
      this.common.sale_office.find(
        (i) => this.selected.common.sale_office === i.id
      ).default_price = value.sale_office_price;
    }
    this.selected.common.clubhouse = value.club_house.id;
    if (this.selected.common.clubhouse) {
      this.common.clubhouse.find(
        (i) => this.selected.common.clubhouse === i.id
      ).default_price = value.club_house_price;
    }
    this.selected.common.fitness = value.fitness_facility.id;
    if (this.selected.common.fitness) {
      this.common.fitness.find(
        (i) => this.selected.common.fitness === i.id
      ).default_price = value.fitness_facility_price;
    }
    this.selected.common.swimming_pool = value.swimming_pool.id;
    if (this.selected.common.swimming_pool) {
      this.common.swimming_pool.find(
        (i) => this.selected.common.swimming_pool === i.id
      ).default_price = value.swimming_pool_price;
    }
    this.electric[0].building = value.pu_main_electric_1_floor_price;
    this.electric[0].pricePerHouse = value.pu_main_electric_1_floor_price_unit;
    this.electric[1].building = value.pu_main_electric_2_floor_price;
    this.electric[1].pricePerHouse = value.pu_main_electric_2_floor_price_unit;
    this.electric[2].building = value.pu_main_electric_3_floor_price;
    this.electric[2].pricePerHouse = value.pu_main_electric_3_floor_price_unit;
    this.allElectric = value.pu_main_electric_total_price;
    this.water[0].building = value.pu_main_water_pipe_1_floor_price;
    this.water[0].pricePerHouse = value.pu_main_water_pipe_1_floor_price_unit;
    this.water[1].building = value.pu_main_water_pipe_2_floor_price;
    this.water[1].pricePerHouse = value.pu_main_water_pipe_2_floor_price_unit;
    this.water[2].building = value.pu_main_water_pipe_3_floor_price;
    this.water[2].pricePerHouse = value.pu_main_water_pipe_3_floor_price_unit;
    this.allWater = value.pu_main_water_pipe_total_price;
    this.architecture.priceHouse1 = value.al_house_design_price_type_1;
    this.architecture.priceHouse2 = value.al_house_design_price_type_2;
    this.architecture.priceHouse3 = value.al_house_design_price_type_3;
    this.architecture.priceHouse4 = value.al_house_design_price_type_4;
    this.architecture.priceHouse5 = value.al_house_design_price_type_5;
    this.landscape.priceStructure = value.al_house_design_price_landscape;
    this.housePermit.allBuilding = value.hs_number_of_house;
    this.housePermit.pricePerBuilding = value.hs_cost_per_house;
    this.housePermit.allPrice = value.hs_price_of_all_house_in_project;
    this.subdivision.allBuilding = value.hs_fee_number_of_house;
    this.subdivision.pricePerBuilding = value.hs_fee_cost_per_house;
    this.subdivision.allPrice = value.hs_fee_price_of_all_house_in_project;
  }

  async save() {
    const value = this.currentInfo.feasibility_common_setting;
    const payload = {
      feasibility: this.currentInfo.id,
      lc_price_per_rai: this.landCost.lc_price_per_rai,
      lc_price_per_sq_wa: this.landCost.pricePerWa,
      lc_fill_distance_per_m: this.landFill.lengthForFillPerMeter,
      lc_fill_area_size_rai: this.areaForFill.rai,
      lc_fill_area_size_ngan: this.areaForFill.ngan,
      lc_fill_area_size_wa: this.areaForFill.wa,
      lc_price_in_system_per_rai: this.landFill.lengthInSystem,
      lc_amount_of_soil_needed: this.calAreaForFill(),
      lc_fill_cost: this.lc_fill_costFun(),
      lc_total_project_price: this.totalForRoadAndGarden(),
      gate_type: this.selected.gate,
      gate_type_price:
        this.selected.gate !== ''
          ? this.gates.find((i) => this.selected.gate === i.id).default_price
          : '',
      project_cycle_length: this.project_cycle_length,
      fence_type: this.selected.fence,
      fence_type_price:
        this.selected.fence !== ''
          ? this.fences.find((i) => this.selected.fence === i.id).default_price
          : '',
      fence_type_total_price:
        this.selected.fence !== ''
          ? this.fences.find((i) => this.selected.fence === i.id)
              .default_price * this.project_cycle_length
          : '',
      rga_actual_size_main_road: this.roadAndGreen.primaryRoad.realSize,
      rga_approx_size_5_percent_main_road: this.roadAndGreen.primaryRoad
        .aroundAllArea,
      rga_wide_road_main_road: this.roadAndGreen.primaryRoad.roadWidth,
      rga_cost_per_sqm_main_road: this.roadAndGreen.primaryRoad.pricePerMeter,
      rga_actual_size_secondary_road: this.roadAndGreen.secondaryRoad.realSize,
      rga_approx_size_25_percent_secondary_road: this.roadAndGreen.secondaryRoad
        .aroundAllArea,
      rga_wide_road_secondary_road: this.roadAndGreen.secondaryRoad.roadWidth,
      rga_cost_per_sqm_secondary_road: this.roadAndGreen.secondaryRoad
        .pricePerMeter,
      rga_road_price_project:
        +this.roadAndGreen.primaryRoad.realSize *
          +this.roadAndGreen.primaryRoad.pricePerMeter +
        +this.roadAndGreen.secondaryRoad.realSize *
          +this.roadAndGreen.secondaryRoad.pricePerMeter,
      rga_foot_path: this.roadAndGreen.catagory.find(
        (i) => i.name === 'foodPath'
      ).area,
      rga_price_foot_path: this.roadAndGreen.catagory.find(
        (i) => i.name === 'foodPath'
      ).pricePerUnit,
      rga_expense_foot_path:
        +this.roadAndGreen.catagory.find((i) => i.name === 'foodPath').area *
        +this.roadAndGreen.catagory.find((i) => i.name === 'foodPath')
          .pricePerUnit,
      rga_drainge: this.roadAndGreen.catagory.find((i) => i.name === 'drainge')
        .area,
      rga_price_drainge: this.roadAndGreen.catagory.find(
        (i) => i.name === 'drainge'
      ).pricePerUnit,
      rga_expense_drainge:
        +this.roadAndGreen.catagory.find((i) => i.name === 'drainge').area *
        +this.roadAndGreen.catagory.find((i) => i.name === 'drainge')
          .pricePerUnit,
      rga_manhole: this.roadAndGreen.catagory.find((i) => i.name === 'manHole')
        .area,
      rga_price_manhole: this.roadAndGreen.catagory.find(
        (i) => i.name === 'manHole'
      ).pricePerUnit,
      rga_expense_manhole:
        +this.roadAndGreen.catagory.find((i) => i.name === 'manHole').area *
        +this.roadAndGreen.catagory.find((i) => i.name === 'manHole')
          .pricePerUnit,
      rga_law_5_percent_total_area: this.roadAndGreen.realSizeGreen,
      rga_real_space: this.roadAndGreen.realAreaGreen,
      rga_estimate_cost_per_sqm: this.roadAndGreen.pricePerMeterGreen,
      rga_standard_garden_price: this.roadAndGreen.standardPriceGreen,
      security_sys_protect_level: this.selected.common.security,
      security_sys_protect_level_price:
        this.selected.common.security !== ''
          ? this.common.security.find(
              (i) => this.selected.common.security === i.id
            ).default_price
          : '',
      sale_office: this.selected.common.sale_office,
      sale_office_price:
        this.selected.common.sale_office !== ''
          ? this.common.sale_office.find(
              (i) => this.selected.common.sale_office === i.id
            ).default_price
          : '',
      club_house: this.selected.common.clubhouse,
      club_house_price:
        this.selected.common.clubhouse !== ''
          ? this.common.clubhouse.find(
              (i) => this.selected.common.clubhouse === i.id
            ).default_price
          : '',
      fitness_facility: this.selected.common.fitness,
      fitness_facility_price:
        this.selected.common.fitness !== ''
          ? this.common.fitness.find(
              (i) => this.selected.common.fitness === i.id
            ).default_price
          : '',
      swimming_pool: this.selected.common.swimming_pool,
      swimming_pool_price:
        this.selected.common.swimming_pool !== ''
          ? this.common.swimming_pool.find(
              (i) => this.selected.common.swimming_pool === i.id
            ).default_price
          : '',
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
      al_house_design_price_type_1: this.architecture.priceHouse1,
      al_house_design_price_type_2: this.architecture.priceHouse2,
      al_house_design_price_type_3: this.architecture.priceHouse3,
      al_house_design_price_type_4: this.architecture.priceHouse4,
      al_house_design_price_type_5: this.architecture.priceHouse5,
      al_house_design_price_total: this.archTotalPrice(),
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

  calAreaForFill() {
    // tslint:disable-next-line: max-line-length
    return (
      (+this.areaForFill.rai * 1600 +
        +this.areaForFill.ngan * 400 +
        +this.areaForFill.wa * 4) *
      +this.landFill.lengthForFillPerMeter
    );
  }

  archTotalPrice() {
    let sum = 0;
    Object.values(this.architecture).forEach((i) => {
      sum += +i;
    });
    return sum;
  }

  totalForLand(area: number) {
    return (
      (area / 1600) * +this.landFill.lengthInSystem +
      +this.landFill.priceForFill
    );
  }

  totalForRoadAndGarden() {
    // tslint:disable-next-line: max-line-length
    const allRoadinProject =
      +this.roadAndGreen.primaryRoad.realSize *
        +this.roadAndGreen.primaryRoad.pricePerMeter +
      +this.roadAndGreen.secondaryRoad.realSize *
        +this.roadAndGreen.secondaryRoad.pricePerMeter;
    const priceCatagory = this.roadAndGreen.catagory.reduce((pv, cv) => {
      return pv + +cv.area * +cv.pricePerUnit;
    }, 0);
    return (
      allRoadinProject +
      priceCatagory +
      +this.roadAndGreen.realAreaGreen * +this.roadAndGreen.pricePerMeterGreen
    );
  }

  //   typeDesign === 'arch'
  // typeDesign === 'houseFee'

  totalProject(clickbox: string) {
    switch (clickbox) {
      case 'ที่ดิน':
        return this.totalForLand(this.calAreaForFill());
      case 'ค่าออกแบบ':
        if (this.typeDesign === 'arch') {
          return this.archTotalPrice() + +this.landscape.priceStructure;
        } else {
          // tslint:disable-next-line: max-line-length
          return (
            +this.housePermit.allBuilding * +this.housePermit.pricePerBuilding +
            +this.subdivision.allBuilding * +this.subdivision.pricePerBuilding
          );
        }
      case 'ถนนและสวน':
        return this.totalForRoadAndGarden();
      case 'สาธาราณูปโภค':
        return +this.allElectric + +this.allWater;
      case 'ประตูทางเข้าและรั้ว':
        const gate =
          this.selected.gate === ''
            ? 0
            : this.gates.find((i) => i.id === this.selected.gate).default_price;
        const fence =
          this.selected.fence === ''
            ? 0
            : this.fences.find((i) => i.id === this.selected.fence)
                .default_price * this.project_cycle_length;
        return +gate + +fence;
      case 'พื้นที่ส่วนกลาง':
        const security =
          this.selected.common.security === ''
            ? 0
            : this.common.security.find(
                (i) => i.id === this.selected.common.security
              ).default_price;
        const sale_office =
          this.selected.common.sale_office === ''
            ? 0
            : this.common.sale_office.find(
                (i) => i.id === this.selected.common.sale_office
              ).default_price;
        const clubhouse =
          this.selected.common.clubhouse === ''
            ? 0
            : this.common.clubhouse.find(
                (i) => i.id === this.selected.common.clubhouse
              ).default_price;
        const fitness =
          this.selected.common.fitness === ''
            ? 0
            : this.common.fitness.find(
                (i) => i.id === this.selected.common.fitness
              ).default_price;
        const swimming_pool =
          this.selected.common.swimming_pool === ''
            ? 0
            : this.common.swimming_pool.find(
                (i) => i.id === this.selected.common.swimming_pool
              ).default_price;
        return security + sale_office + clubhouse + fitness + swimming_pool;
      default:
        return this.calAreaForFill();
    }
  }
  setHeader(item: string) {
    switch (item) {
      case 'clubhouse':
        return 'Club House';
      case 'fitness':
        return 'Fitness Facilities';
      case 'sale_office':
        return 'Sale Office';
      case 'security':
        return 'Securities Sys. Project Level';
      case 'swimming_pool':
        return 'Swimming pool';
    }
  }

  nameObj(obj: any, item: string) {
    switch (item) {
      case 'clubhouse':
        return obj.club_house_type_name;
      case 'fitness':
        return obj.fitness_facility_type_name;
      case 'sale_office':
        return obj.sale_office_type_name;
      case 'security':
        return obj.security_sys_protect_level_type_name;
      case 'swimming_pool':
        return obj.swimming_pool_type_name;
      default:
        return 'Not Found';
    }
  }
  lc_fill_costFun() {
    return (
      +this.areaForFill.rai * +this.landFill.lengthInSystem +
      (+this.areaForFill.ngan * +this.landFill.lengthInSystem) / 4 +
      (+this.areaForFill.wa * +this.landFill.lengthInSystem) / 400
    );
  }
}
