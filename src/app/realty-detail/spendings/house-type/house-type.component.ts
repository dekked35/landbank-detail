import {
  Component,
  OnInit,
  OnDestroy,
  SimpleChanges,
  Output,
  EventEmitter,
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

const imageType = {
  0: 'home1.svg',
  1: 'home2.svg',
  2: 'home3.svg',
};

const imageTypeIcon = {
  0: 'house_type_a.jpg',
  1: 'house_type_b.jpg',
  2: 'house_type_c.jpg',
};

const houseName = {
  0: 'บ้านเดี่ยว 1 ชั้น',
  1: 'บ้านเดี่ยว 2 ชั้น',
  2: 'บ้านเดี่ยว 3 ชั้น',
};

const defaultSale = [
  {
    name: 'แปลงมุม',
    house_number: 1,
    area_size: 10,
    price_sqm: 10,
    house_price: 400,
    book_payment: 10,
    down_payment: 10,
    contract_fee: 10,
    ownership_transfer_fee: 10,
    bank_down_payment: 10,
    bank_interest: 10,
    bank_monthly_payment: 10,
    bank_number_periods: 10,
  },
  {
    name: 'แปลงกลาง',
    house_number: 1,
    area_size: 10,
    price_sqm: 10,
    house_price: 400,
    book_payment: 10,
    down_payment: 10,
    contract_fee: 10,
    ownership_transfer_fee: 10,
    bank_down_payment: 10,
    bank_interest: 10,
    bank_monthly_payment: 10,
    bank_number_periods: 10,
  },
]
@Component({
  selector: 'app-house-type',
  templateUrl: './house-type.component.html',
  styleUrls: ['./house-type.component.css'],
})
export class HouseTypeComponent implements OnInit {
  @Output() toggleEdit = new EventEmitter<any>();
  house = [
    { index: 0, name: 'Type A' },
    { index: 1, name: 'Type B' },
    { index: 2, name: 'Type C' },
  ];
  localStorage: any;
  date_choose = new Date();
  date_next_choose = new Date(
    this.date_choose.getFullYear(),
    this.date_choose.getMonth() + 1,
    this.date_choose.getDate()
  );

  house_type: any;

  start_house = 0;
  currentInfo: any;
  currentProperty: string;

  constructor(
    private store: Store<any>,
    private requestManagerService: RequestManagerService
  ) {
    this.store.select(fromCore.getPage).subscribe((page) => {
      this.currentProperty = page.page;
    });
    this.store.select(fromCore.getInfo).subscribe((info) => {
      if (info) {
        this.currentInfo = info.info;
        this.localStorage = JSON.parse(localStorage.getItem('houseType'));
        this.setInitial();
      }
    });
  }

  ngOnInit() {
    this.setInitial()
  }

  setInitial() {
    if (this.localStorage.length > 0) {
      this.updateItem(this.localStorage);
    } else {
      this.house_type = [
        {
          // feasibility_house_details
          id: 7,
          name: 'Type A',
          project_type: 4,
          cal_sale_start_date: new Date(),
          cal_sale_end_date: new Date(
            this.date_choose.getFullYear(),
            this.date_choose.getMonth() + 1,
            this.date_choose.getDate()
          ),
          custom_length_month: 1,
          quantity_sell: 5,
          construction_start_date: new Date(),
          construction_end_date: new Date(
            this.date_choose.getFullYear(),
            this.date_choose.getMonth() + 1,
            this.date_choose.getDate()
          ),
          construction_periods: 1,
          construction_per_month: 485,
          construction_per_house: 1000,
          construction_water_supply: 1000,
          construction_electrical_supply: 1000,
          construction_other: 1000,
          // house_details_sale_info
          sale_info: [
            {
              name: 'แปลงมุม',
              house_number: 1,
              area_size: 10,
              price_sqm: 10,
              house_price: 400,
              book_payment: 10,
              down_payment: 10,
              contract_fee: 10,
              ownership_transfer_fee: 10,
              bank_down_payment: 10,
              bank_interest: 10,
              bank_monthly_payment: 10,
              bank_number_periods: 10,
            },
            {
              name: 'แปลงกลาง',
              house_number: 1,
              area_size: 10,
              price_sqm: 10,
              house_price: 400,
              book_payment: 10,
              down_payment: 10,
              contract_fee: 10,
              ownership_transfer_fee: 10,
              bank_down_payment: 10,
              bank_interest: 10,
              bank_monthly_payment: 10,
              bank_number_periods: 10,
            },
          ],
        },
        {
          id: 8,
          name: 'Type B',
          project_type: 5,
          cal_sale_start_date: new Date(),
          cal_sale_end_date: new Date(
            this.date_choose.getFullYear(),
            this.date_choose.getMonth() + 1,
            this.date_choose.getDate()
          ),
          custom_length_month: 1,
          quantity_sell: 3,
          construction_start_date: new Date(),
          construction_end_date: new Date(
            this.date_choose.getFullYear(),
            this.date_choose.getMonth() + 1,
            this.date_choose.getDate()
          ),
          construction_periods: 1,
          construction_per_month: 485,
          construction_per_house: 1000,
          construction_water_supply: 1000,
          construction_electrical_supply: 1000,
          construction_other: 1000,
          sale_info: [
            {
              name: 'แปลงมุม',
              house_number: 2,
              area_size: 10,
              price_sqm: 10,
              house_price: 400,
              book_payment: 10,
              down_payment: 10,
              contract_fee: 10,
              ownership_transfer_fee: 10,
              bank_down_payment: 10,
              bank_interest: 10,
              bank_monthly_payment: 10,
              bank_number_periods: 10,
            },
            {
              name: 'แปลงกลาง',
              house_number: 2,
              area_size: 10,
              price_sqm: 10,
              house_price: 400,
              book_payment: 10,
              down_payment: 10,
              contract_fee: 10,
              ownership_transfer_fee: 10,
              bank_down_payment: 10,
              bank_interest: 10,
              bank_monthly_payment: 10,
              bank_number_periods: 10,
            },
          ],
        },
        {
          id: 9,
          name: 'Type C',
          project_type: 6,
          cal_sale_start_date: new Date(),
          cal_sale_end_date: new Date(
            this.date_choose.getFullYear(),
            this.date_choose.getMonth() + 1,
            this.date_choose.getDate()
          ),
          custom_length_month: 1,
          quantity_sell: 3,
          construction_start_date: new Date(),
          construction_end_date: new Date(
            this.date_choose.getFullYear(),
            this.date_choose.getMonth() + 1,
            this.date_choose.getDate()
          ),
          construction_periods: 1,
          construction_per_month: 485,
          construction_per_house: 1000,
          construction_water_supply: 1000,
          construction_electrical_supply: 1000,
          construction_other: 1000,
          sale_info: [
            {
              name: 'แปลงมุม',
              house_number: 3,
              area_size: 10,
              price_sqm: 10,
              house_price: 400,
              book_payment: 10,
              down_payment: 10,
              contract_fee: 10,
              ownership_transfer_fee: 10,
              bank_down_payment: 10,
              bank_interest: 10,
              bank_monthly_payment: 10,
              bank_number_periods: 10,
            },
            {
              name: 'แปลงกลาง',
              house_number: 3,
              area_size: 10,
              price_sqm: 10,
              house_price: 400,
              book_payment: 10,
              down_payment: 10,
              contract_fee: 10,
              ownership_transfer_fee: 10,
              bank_down_payment: 10,
              bank_interest: 10,
              bank_monthly_payment: 10,
              bank_number_periods: 10,
            },
          ],
        },
      ];
    }
  }

  increacedIndex() {
    if (this.start_house < this.house.length) {
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

  caculateMonthPeriod(index: number) {
    const a = new Date(this.house_type[index].cal_sale_start_date);
    const b = new Date(this.house_type[index].cal_sale_end_date);
    if (b > a) {
      const months = moment(b).diff(moment(a), 'month', true);
      this.house_type[index].custom_length_month = +months.toFixed(0);
    } else {
      this.house_type[index].custom_length_month = 0;
    }
  }

  caculateMonthPeriodLower(index: number) {
    if (
      this.house_type[index].construction_start_date !== undefined &&
      this.house_type[index].construction_end_date
    ) {
      const a = new Date(this.house_type[index].construction_start_date);
      const b = new Date(this.house_type[index].construction_end_date);
      if (b > a) {
        const months = moment(b).diff(moment(a), 'month', true);
        this.house_type[index].construction_periods = +months.toFixed(0);
        this.house_type[index].construction_per_month =
          485 / +months.toFixed(0);
      } else {
        this.house_type[index].construction_periods = 0;
      }
    }
  }

  getImage(index: number) {
    return imageType[index];
  }

  getImageIcon(index: number) {
    return imageTypeIcon[index];
  }

  getNameHouse(index: number) {
    return houseName[index];
  }

  changeHousePrice(house: number, index: number) {
    const temp_saleInfo = this.house_type[house].sale_info[index];
    this.house_type[house].sale_info[index].house_price =
      +temp_saleInfo.area_size * +temp_saleInfo.price_sqm * 4;
  }

  async save() {
    const promise = [];
    const feasibility_house_detail = JSON.parse(
      localStorage.getItem('houseType')
    );
    let id_feas_house_detail;
    this.house_type.forEach(async (element) => {
      const payload = {
        feasibility: localStorage.getItem('id'),
        project_type: +element.project_type,
        cal_sale_start_date: element.cal_sale_start_date,
        cal_sale_end_date: element.cal_sale_end_date,
        custom_length_month: +element.custom_length_month,
        quantity_sell: +element.quantity_sell,
        construction_start_date: element.construction_start_date,
        construction_end_date: element.construction_end_date,
        construction_periods: +element.construction_periods,
        construction_per_month: +element.construction_per_month,
        construction_per_house: +element.construction_per_house,
        construction_water_supply: +element.construction_water_supply,
        construction_electrical_supply: +element.construction_electrical_supply,
        construction_other: +element.construction_other,
      };
      if (feasibility_house_detail.length > 0) {
        await this.requestManagerService.updateHouseDetail(payload, element.id);
      } else {
        const test = await this.requestManagerService.insertHouseDetail(
          payload
        );
        id_feas_house_detail = test.id;
      }
      element.sale_info.forEach(async (item) => {
        const payload2 = {
          feasibility_house_detail: element.id
            ? element.id
            : id_feas_house_detail,
          name: item.name,
          house_number: item.house_number,
          area_size: item.area_size,
          price_sqm: item.price_sqm,
          house_price: item.house_price,
          book_payment: item.book_payment,
          down_payment: item.down_payment,
          contract_fee: item.contract_fee,
          ownership_transfer_fee: item.ownership_transfer_fee,
          bank_down_payment: item.down_payment,
          bank_interest: item.bank_interest,
          bank_monthly_payment: item.bank_monthly_payment,
          bank_number_periods: item.bank_number_periods,
        };
        if (item.id) {
          promise.push(await this.requestManagerService.updateHouseDetailSaleInfo(payload2, item.id));
        } else {
          promise.push(await this.requestManagerService.insertHouseDetailSaleInfo(payload2));
        }
      });
    });
    await Promise.all(promise).then(async () => {
       await this.requestManagerService.getUserInfo(localStorage.getItem('id'));
       await this.requestManagerService.getSpendingInfo(localStorage.getItem('id'));
    });
    this.toggleEdit.emit({ page: "spending", order: 1 });
  }

  updateItem(value: any) {
    let project_type = 4;
    const temp = value;
    temp.map((i) => {
      i.cal_sale_end_date = new Date(i.cal_sale_end_date);
      i.cal_sale_start_date = new Date(i.cal_sale_start_date);
      i.construction_end_date = new Date(i.construction_end_date);
      i.construction_start_date = new Date(i.construction_start_date);
      return i;
    });
    this.house_type = temp;
    this.house_type.map(element => {
      element.sale_info = element.feasibility_house_detail_sale_info.length > 0 ? element.feasibility_house_detail_sale_info : defaultSale;
      element.project_type = project_type;
      project_type++;
      return element;
    });
  }
}
