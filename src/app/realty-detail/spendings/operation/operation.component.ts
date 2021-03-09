import { RequestManagerService } from './../../../core/services/request-manager.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

import * as fromCore from '../../../core/reducers';

const imageType = {
  village: {
    0: 'home1.svg',
    1: 'home2.svg',
    2: 'home3.svg',
  },
};

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css'],
})
export class OperationComponent implements OnInit {
  @Output() toggleEdit = new EventEmitter<any>();
  responsiveOptions;
  localStorage: any;
  selected = { gate: [], fence: [], common: [] };
  house = [
    { name: 'Operation' },
    { name: 'Marketing' },
    { name: 'สาธารณูปโภค/เดือน' },
  ];
  expense = [
    { name: 'พนักงานขาย', amount: '20', price: '10000' },
    { name: 'วิศวกรคุมโครงการ', amount: '20', price: '10000' },
    { name: 'Foreman', amount: '10', price: '10000' },
    { name: 'รปภ.', amount: '10', price: '10000' },
    { name: 'แม่บ้าน', amount: '30', price: '10000' },
    { name: 'บัญชี', amount: '5', price: '10000' },
  ];
  software = [{ name: 'Miscellaneous', price: '10000' }];
  marketing = [
    { name: 'marketing_expense', allSale: '1000000', price: '100000' },
    { name: 'cmr_ce', allSale: '1000000', price: '100000' },
  ];

  month = 12;

  electricPrice = '10000';

  waterPrice = '10000';

  allElectric: number;
  allWater: number;
  currentProperty: string;
  clickBox = 'Operation';

  marketingPerMonth = '1000000';

  constructor(
    private store: Store<any>,
    private requestManagerService: RequestManagerService
  ) {
    this.store.select(fromCore.getPage).subscribe((page) => {
      this.currentProperty = page.page;
    });
    this.localStorage = JSON.parse(localStorage.getItem('info'));
    if (this.localStorage.feasibility_operation_setting) {
      this.updateItem();
    }
    // if (this.localStorage.feasibility_common_setting) {
    //   this.updateItem("common");
    // }
    // if (this.localStorage.feasibility_house_detail) {
    //   this.updateItem("house");
    // }
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

    this.changeTotalElectric();
    this.changeTotalWater();
  }

  setClickBox(name) {
    this.clickBox = name;
  }

  changeTotalElectric() {
    this.allElectric = +this.electricPrice;
  }

  changeTotalWater() {
    this.allWater = +this.waterPrice;
  }

  mapName(name: string) {
    if (name === 'marketing_expense') {
      return 'Marketing Expense inc. Commision 3% of Sale Value';
    } else if (name === 'cmr_ce') {
      return 'CRM + CE Reserved 0.7% of Sale Value';
    }
    return 'Not Found';
  }

  async save() {
    const value = JSON.parse(localStorage.getItem('info'))
      .feasibility_operation_setting;
    const payload = {
      feasibility: localStorage.getItem('id'),
      op_salesman_number: +this.expense[0].amount,
      op_salesman_salary: +this.expense[0].price,
      op_salesman_total_cost: +this.expense[0].amount * +this.expense[0].price,
      op_engineer_number: +this.expense[1].amount,
      op_engineer_salary: +this.expense[1].price,
      op_engineer_total_cost: +this.expense[1].amount * +this.expense[1].price,
      op_foreman_number: +this.expense[2].amount,
      op_foreman_salary: +this.expense[2].price,
      op_foreman_total_cost: +this.expense[2].amount * +this.expense[2].price,
      op_security_number: +this.expense[3].amount,
      op_security_salary: +this.expense[3].price,
      op_security_total_cost: +this.expense[3].amount * +this.expense[3].price,
      op_housekeeper_number: +this.expense[4].amount,
      op_housekeeper_salary: +this.expense[4].price,
      op_housekeeper_total_cost:
        +this.expense[4].amount * +this.expense[4].price,
      op_account_number: +this.expense[5].amount,
      op_account_salary: +this.expense[5].price,
      op_account_total_cost: +this.expense[5].amount * +this.expense[5].price,
      op_miscellaneous: +this.software[0].price,
      op_miscellaneous_total: +this.software[0].price,
      op_month_number: +this.month,
      op_expense_per_month: this.costTotal(),
      op_expense_total: this.costTotalPerMonth(),
      mk_expense_project_total_price: +this.marketing[0].allSale,
      mk_expense_cost: +this.marketing[0].price,
      mk_crm_ce_project_total_price: +this.marketing[1].allSale,
      mk_crm_ce_cost: +this.marketing[1].price,
      mk_marketing_per_month: +this.marketingPerMonth,
      mk_marketing_month_number: +this.month,
      mk_marketing_cost_per_month: this.costTotal(),
      mk_marketing_total_cost: this.costTotalPerMonth(),
      ut_month_number: +this.month,
      ut_electrical_price: +this.electricPrice,
      ut_electrical_total_price: +this.electricPrice * this.month,
      ut_water_price: +this.waterPrice,
      ut_water_total_price: +this.waterPrice * this.month,
      ut_expense_per_month: this.costTotal(),
      ut_expense_total_cost: this.costTotalPerMonth(),
    };
    if (value === null) {
      await this.requestManagerService.insertOperation(payload);
    } else {
      const id = value.id;
      this.requestManagerService.updateOperation(payload, id);
    }
    this.toggleEdit.emit({ page: "evaluate", order: 0 });
  }

  costTotal() {
    let sum = 0;
    this.expense.forEach((i) => {
      sum += +i.amount * +i.price;
    });
    this.marketing.forEach((i) => {
      sum += +i.price;
    });
    sum += +this.software[0].price;
    sum += +this.marketingPerMonth;
    sum += +this.electricPrice + +this.waterPrice;
    return sum;
  }

  costTotalPerMonth() {
    let sum = this.costTotal();
    sum = sum * 12;
    this.marketing.forEach((i) => {
      sum += +i.allSale;
    });
    return sum;
  }

  updateItem() {
    const data = this.localStorage.feasibility_operation_setting;
    if (data) {
      this.expense = [
        {
          name: 'พนักงานขาย',
          amount: data.op_salesman_number,
          price: data.op_salesman_salary,
        },
        {
          name: 'วิศวกรคุมโครงการ',
          amount: data.op_engineer_number,
          price: data.op_engineer_salary,
        },
        {
          name: 'Foreman',
          amount: data.op_foreman_number,
          price: data.op_foreman_salary,
        },
        {
          name: 'รปภ.',
          amount: data.op_security_number,
          price: data.op_security_salary,
        },
        {
          name: 'แม่บ้าน',
          amount: data.op_housekeeper_number,
          price: data.op_housekeeper_salary,
        },
        {
          name: 'บัญชี',
          amount: data.op_account_number,
          price: data.op_account_salary,
        },
      ];
      this.software = [{ name: 'Miscellaneous', price: data.op_miscellaneous }];
      this.marketing = [
        {
          name: 'marketing_expense',
          allSale: data.mk_expense_project_total_price,
          price: data.mk_expense_cost,
        },
        {
          name: 'cmr_ce',
          allSale: data.mk_crm_ce_project_total_price,
          price: data.mk_crm_ce_cost,
        },
      ];
      this.marketingPerMonth = data.mk_marketing_per_month;
      this.electricPrice = data.ut_electrical_price;
      this.waterPrice = data.ut_water_price;
      this.month = data.ut_month_number;
    }
  }

  getUrl(name: string) {
    switch (name) {
      case 'Operation':
        return 'url(assets/images/operation_side_operation.jpg)';
      case 'Marketing':
        return 'url(assets/images/marketing_side_operation.jpg)';
      case 'สาธารณูปโภค/เดือน':
        return 'url(assets/images/etc_side_operation.jpg)';
    }
  }
}
