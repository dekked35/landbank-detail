import { Component, OnInit, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { SelectItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultsVariableService } from '../../core/services/defaults-variable.service';
import { SchemaManagerService } from '../../core/services/schema-manager.service';
import { RequestManagerService } from '../../core/services/request-manager.service';
import { CalculatorManagerService } from '../../core/services/calculator-manager.service';

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
  constructor(
    private store: Store<any>,
    private defaultsVariableService: DefaultsVariableService,
    private requestManagerService: RequestManagerService,
    private calculatorManagerService: CalculatorManagerService,
    private shemaManagerService: SchemaManagerService,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) {
    this.store.select(fromCore.getPage).subscribe((data) => {});
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
    { label: 'Orange', color: '#2263FF' }
  ]
  townPlanColor: any;
  areaData: any;
  tableSize: any;

  ngOnInit() {
    this.setInitialValue()
    this.store.select(fromCore.getArea).subscribe((data) => {
      this.is_loading = data.isLoading;
      this.error = data.error;
    });
    this.route.queryParams.subscribe((params) => {});

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
    this.townPlanColor = { color: '#FFFC10' };
  }

  checkInnerWidth() {
    if (window.innerWidth < 500) {
      this.tableSize = { 'width': '320px' };

    } else {
      this.tableSize = { 'width': '480px' };
    }
  }

  setInitialValue() {
    this.areaData = this.shemaManagerService.getAreaSchema('village')

  }
}
