import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { BasicTypeService } from '../core/services/basic-type.service';
import { RequestManagerService } from '../core/services/request-manager.service';

import * as pageAction from '../core/actions/page.actions';
import * as areaAction from '../core/actions/area.actions';
import * as productAction from '../core/actions/product.actions';
import * as spendingsAction from '../core/actions/spendings.actions';
import * as implicitCostAction from '../core/actions/implicit-costs.actions';
import * as profitAction from '../core/actions/profit.actions';
import * as rateReturnAction from '../core/actions/rate-return.actions';
import * as fromCore from '../core/reducers';
import * as villageSchema from '../core/schema/basic-type/village';
import * as townhomeSchema from '../core/schema/basic-type/townhome';
import * as condoSchema from '../core/schema/basic-type/condo';
import * as hotelSchema from '../core/schema/basic-type/hotel';
import * as communityMallSchema from '../core/schema/basic-type/communityMall';
import * as html2pdf from 'html2pdf.js';

const schemaDefaults = {
  village: villageSchema.village,
  townhome: townhomeSchema.townhome,
  condo: condoSchema.condo,
  hotel: hotelSchema.hotel,
  communityMall: communityMallSchema.communityMall,
};

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {

  constructor(
    private store: Store<any>,
    private requestManagerService: RequestManagerService,
    private basicTypeService: BasicTypeService
  ) {
    this.store.dispatch(new pageAction.PageAction(localStorage.getItem('page') ? localStorage.getItem('page') : 'village'));
    this.store.select(fromCore.getPage).subscribe((page) => {
      this.currentProperty = page.page;
    });
  }
  realtySupports: Array<Object> = [
    {
      link: '',
      header: 'อสังหาริมทรัพย์',
    },
  ];

  cities: any[];

  currentProperty: string;

  selectedCity1: { name: 'โรงแรม' };

  showExpension = false;

  ngOnInit() {
    localStorage.setItem('id', '7');
  }

  selectProperty(propertyType: string) {
    if (this.currentProperty !== propertyType) {
      this.store.dispatch(new pageAction.PageAction(propertyType));
    }
  }

  selectPropertyDropdown() {
    console.log(this.selectedCity1);
  }
  toggleProperty(propertyType: string) {
    localStorage.removeItem('page');
    this.store.dispatch(new pageAction.PageAction(propertyType));

    if (this.showExpension) {
      this.showExpension = false;
    } else {
      this.showExpension = true;
    }
  }

  toggleNgStyle(propertyType: string) {
    const style_list_item = { display: 'list-item' };
    const style_none = { display: 'none' };
    if (this.showExpension) {
      return style_list_item;
    } else {
      if (propertyType === this.currentProperty) {
        this.currentProperty = propertyType;
        return style_list_item;
      } else {
        return style_none;
      }
    }
  }
}
