import {
  Component,
  OnInit,
  HostListener,
  EventEmitter,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { SelectItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultsVariableService } from '../../core/services/defaults-variable.service';
import { SchemaManagerService } from '../../core/services/schema-manager.service';
import { RequestManagerService } from '../../core/services/request-manager.service';
import { CalculatorManagerService } from '../../core/services/calculator-manager.service';

import * as infoAction from '../../core/actions/info.actions';
import * as pageAction from '../../core/actions/page.actions';
import * as areaAction from '../../core/actions/area.actions';
import * as fromCore from '../../core/reducers';
import * as productAction from '../../core/actions/product.actions';
import { ActivatedRoute } from '@angular/router';
import { parse } from 'querystring';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css'],
})
export class AreaComponent implements OnInit {
  @Output() toggleEdit = new EventEmitter<any>();
  currentProperty: any;
  local: any;
  currentInfo: any;
  constructor(
    private store: Store<any>,
    private defaultsVariableService: DefaultsVariableService,
    private requestManagerService: RequestManagerService,
    private calculatorManagerService: CalculatorManagerService,
    private shemaManagerService: SchemaManagerService,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) {
    this.store.select(fromCore.getPage).subscribe((page) => {
      this.currentProperty = page.page;
      this.local = JSON.parse(localStorage.getItem('info'));
    });
    this.store.select(fromCore.getInfo).subscribe((info) => {
      if (info) {
        this.currentInfo = info.info;
        this.setInitialValue();
      }
    });
  }
  is_loading: boolean;
  is_loading_product: boolean;
  error: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  colorsTown: Array<any> = [
    { label: 'Orange', color: '#ff8407' },
    { label: 'Orange', color: '#FFFC10' },
    { label: 'Orange', color: '#A13101' },
    { label: 'Orange', color: '#FF0204' },
    { label: 'Orange', color: '#720EFD' },
    { label: 'Orange', color: '#FEA0FF' },
    { label: 'Orange', color: '#006200' },
    { label: 'Orange', color: '#FFCED1' },
    { label: 'Orange', color: '#2263FF' },
  ];
  townPlanColor: any;
  areaData: any;
  tableSize: any;
  totalPrice: number;

  ngOnInit() {
    this.setInitialValue();
    this.store.select(fromCore.getArea).subscribe((data) => {
      this.is_loading = data.isLoading;
      this.error = data.error;
    });

    this.store.select(fromCore.getProduct).subscribe((data) => {
      this.is_loading_product = data.isLoading;
    });

    this.store.select(fromCore.getSpendings).subscribe((data) => {
      this.is_loading_product = data.isLoading;
    });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  checkInnerWidth() {
    if (window.innerWidth < 500) {
      this.tableSize = { width: '320px' };
    } else {
      this.tableSize = { width: '480px' };
    }
  }

  async setInitialValue() {
    let DB;
    if (this.currentInfo && this.currentInfo.feasibility_area) {
      DB = await this.requestManagerService.getArea(
        this.currentInfo.feasibility_area.id
      );
    } else {
      DB = this.shemaManagerService.getAreaSchema('village');
    }
    const default_old = this.shemaManagerService.getAreaSchema('village');
    this.areaData = DB;
    this.areaData.ratio_area = default_old.ratio_area;
    this.areaData.standardArea = default_old.standardArea;
    this.totalPrice = +this.areaData.landPrice * +this.areaData.totalArea;
  }

  changeTotalPrice() {
    this.totalPrice = +this.areaData.landPrice * +this.areaData.totalArea;
  }

  getScoreColor(type: string) {
    if (type === 'มาก') {
      return { color: 'green', float: 'right' };
    }
    if (type === 'ปานกลาง') {
      return { color: 'orange', float: 'right' };
    }
    if (type === 'น้อย') {
      return { color: 'red', float: 'right' };
    }
  }

  async save() {
    const payload = {
      feasibility: localStorage.getItem('id'),
      city_color: this.areaData.townPlanColor,
      ors: parseFloat(this.areaData.osrValue.toString().replace(/,/g, '')),
      fence_length: parseFloat(
        this.areaData.fenceLength.toString().replace(/,/g, '')
      ),
      total_area: parseFloat(
        this.areaData.totalArea.toString().replace(/,/g, '')
      ),
      far: parseFloat(this.areaData.farValue.toString().replace(/,/g, '')),
      legal_area: parseFloat(
        this.areaData.lawArea.toString().replace(/,/g, '')
      ),
      land_price: parseFloat(
        this.areaData.landPrice.toString().replace(/,/g, '')
      ),
      total_land_cost:
        parseFloat(this.areaData.landPrice.toString().replace(/,/g, '')) * 100,
      cal_start_date : new Date(),
      cal_end_date : new Date(),
    };
    if (this.currentInfo.feasibility_area && this.currentInfo.feasibility_area.id) {
      const value = await this.requestManagerService.updateArea(
        payload,
        this.currentInfo.feasibility_area.id
      );
      const tempCurrent = this.parseObject(this.currentInfo);
      tempCurrent.feasibility_area = value;
      this.store.dispatch(new infoAction.InfoAction(tempCurrent));
    } else {
      const value = await this.requestManagerService.postArea(
        payload
      );
      const tempCurrent = this.parseObject(this.currentInfo);
      tempCurrent.feasibility_area = value;
      this.store.dispatch(new infoAction.InfoAction(tempCurrent));
    }
    this.toggleEdit.emit({ page: 'spending', order: 0 });
  }

  parseObject(data: any) {
    return JSON.parse(JSON.stringify(data));
  }

  checkValue(value: any) {}
}
