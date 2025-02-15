import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { BasicTypeService } from './basic-type.service';
import { Observable } from 'rxjs';

import * as pageAction from '../../core/actions/page.actions';
import * as areaAction from '../../core/actions/area.actions';
import * as fromCore from '../../core/reducers';

import { HttpClient } from '@angular/common/http';
import * as ENVIRONMENT from '../../../environments/environment';

const ENV = ENVIRONMENT.environment;

const API_PROPERTY_MAPPER = {
  village: 'village',
  townhome: 'townhouse',
  condo: 'condo',
  hotel: 'hotel',
  communityMall: 'community mall',
  resort: 'hotel',
};

@Injectable({
  providedIn: 'root',
})
export class RequestManagerService {
  propertyType: string;

  constructor(
    private store: Store<any>,
    private basicTypeService: BasicTypeService,
    private http: HttpClient
  ) {
    this.store.select(fromCore.getPage).subscribe((data) => {
      try {
        this.propertyType = data.page;
      } catch (e) {
        this.propertyType = 'hotel';
      }
    });
  }

  // Area Manager
  // The reason of this solution becuase of API is schema is not match with UI schema.
  requestArea(areaData: any): Promise<any> {
    const payload = this.generateAreaPayload(areaData);
    return new Promise((resolve, reject) => {
      this.basicTypeService.getProperyArea(payload).subscribe(
        (response) => {
          console.log('Get area successfully.');
          resolve(this.generateAreaResponse(areaData, response.area));
        },
        (err) => {
          console.log(err);
          reject();
          // TODO : show error dialog
        }
      );
    });
  }

  generateAreaPayload(areaData: any) {
    const percent = areaData.standardArea.percent;
    const area = areaData.standardArea.area;
    return {
      propertyType: API_PROPERTY_MAPPER[this.propertyType],
      area_input: {
        ...areaData,
        percent: percent,
        area: area,
      },
    };
  }

  generateAreaResponse(areaData: any, response: any) {
    const standardArea = this.parseObject(areaData.standardArea);
    standardArea.percent = response.percent;
    standardArea.area = response.ratio_area;
    // Check schema mismatch
    const availableArea = ['village', 'townhome'].includes(this.propertyType)
      ? areaData.usableArea
      : areaData.availableArea;
    return {
      ...response,
      townPlanColor: areaData.townPlanColor,
      landPrice: areaData.landPrice,
      usableArea: areaData.usableArea,
      availableArea: availableArea,
      standardArea: standardArea,
    };
  }

  requestProduct(payload: any): Promise<any> {
    console.log('request product . . .');
    // console.log(JSON.stringify(payload));
    return new Promise((resolve, reject) => {
      this.basicTypeService.getProperyProduct(payload).subscribe(
        (response) => {
          console.log('Get product successfully.');
          resolve(response['product']);
        },
        (err) => {
          console.log(err);
          reject();
          // TODO : show error dialog
        }
      );
    });
  }

  generateProductInput(owner: string, productData: any) {
    productData = this.parseObject(productData);
    if (this.propertyType === 'village') {
      const oppositeOwner = owner === 'user' ? 'competitor' : 'user';
      const myProduct = JSON.parse(
        JSON.stringify(productData[owner]['products'])
      );
      productData[owner].products = myProduct;
      productData[owner].products[0].cost = this.parseToMillionFormat(
        myProduct[0].cost
      );
      productData[owner].products[1].cost = this.parseToMillionFormat(
        myProduct[1].cost
      );
      productData[owner].products[2].cost = this.parseToMillionFormat(
        myProduct[2].cost
      );
      productData[oppositeOwner].products[0].cost = this.parseToMillionFormat(
        productData[oppositeOwner].products[0].cost
      );
      productData[oppositeOwner].products[1].cost = this.parseToMillionFormat(
        productData[oppositeOwner].products[1].cost
      );
      productData[oppositeOwner].products[2].cost = this.parseToMillionFormat(
        productData[oppositeOwner].products[2].cost
      );
      const product_input = { ...productData };
      return product_input;
    }

    if (this.propertyType === 'townhome') {
      const oppositeOwner = owner === 'user' ? 'competitor' : 'user';
      productData[owner] = JSON.parse(JSON.stringify(productData[owner])); // user or owner
      const myProductList = this.parseObject(productData[owner]['products']);
      const depth = +productData[owner].depth;
      const width = +productData[owner].width;
      productData[owner].products[0].area = myProductList[0].area;
      productData[owner].products[1].area = myProductList[1].area;
      productData[owner].products[2].area = myProductList[2].area;
      productData[owner].products[0].stairArea = myProductList[0].stairArea;
      productData[owner].products[1].stairArea = myProductList[1].stairArea;
      productData[owner].products[2].stairArea = myProductList[2].stairArea;
      productData[owner].products[0].cost = this.parseToMillionFormat(
        myProductList[0].cost
      );
      productData[owner].products[1].cost = this.parseToMillionFormat(
        myProductList[1].cost
      );
      productData[owner].products[2].cost = this.parseToMillionFormat(
        myProductList[2].cost
      );
      productData[owner].products[0].ratio = myProductList[0].ratio;
      productData[owner].products[1].ratio = myProductList[1].ratio;
      productData[owner].products[2].ratio = myProductList[2].ratio;
      productData[oppositeOwner] = productData[oppositeOwner]; // user or owner
      productData[oppositeOwner].products[0].cost = this.parseToMillionFormat(
        productData[oppositeOwner].products[0].cost
      );
      productData[oppositeOwner].products[1].cost = this.parseToMillionFormat(
        productData[oppositeOwner].products[1].cost
      );
      productData[oppositeOwner].products[2].cost = this.parseToMillionFormat(
        productData[oppositeOwner].products[2].cost
      );
      const product_input = { ...productData };
      return product_input;
    }

    return productData;
  }

  // Product Manager
  parseObject(data: any) {
    return JSON.parse(JSON.stringify(data));
  }

  requestSpeading(payload: any, string?: string): Promise<any> {
    console.log('request speading . . .');
    // console.log(JSON.stringify(payload));
    return new Promise((resolve, reject) => {
      this.basicTypeService.getProperySpendings(payload).subscribe(
        (response) => {
          console.log('Get spendings successfully.');
          // console.log(JSON.stringify(response));
          resolve(response['spendings']);
        },
        (err) => {
          console.log(err);
          resolve(payload.speadings_input);
          // TODO : show error dialog
        }
      );
    });
  }

  generateSpeadingInput(tempInput: any) {
    // speadingData
    tempInput = this.parseObject(tempInput);
    if (['village', 'townhome'].includes(this.propertyType)) {
      tempInput.priceLandBought = +tempInput.priceLandBought;
      tempInput.costConstructionLivingSpace = +tempInput.costConstructionLivingSpace;
      tempInput.costOther = +tempInput.costOther;
      tempInput.costPlan = +tempInput.costPlan;
      tempInput.sellPeriod = +tempInput.sellPeriod;
      tempInput.salaryEmployee = +tempInput.salaryEmployee;
      tempInput.costAdvt = +tempInput.costAdvt;
      tempInput.periodSellStart = this.parseDate(tempInput.periodSellStart);
      tempInput.periodSellEnd = this.parseDate(tempInput.periodSellEnd);
      return tempInput;
    }
    return tempInput;
  }

  requestProfit(payload: any): Promise<any> {
    console.log('request profit . . .');
    // console.log(JSON.stringify(payload));
    return new Promise((resolve, reject) => {
      this.basicTypeService.getProperyProfit(payload).subscribe(
        (response) => {
          console.log('Get profit successfully.');
          resolve(response['profit']);
        },
        (err) => {
          console.log(err);
          reject();
          // TODO : show error dialog
        }
      );
    });
  }

  requestImplicitsCost(payload: any): Promise<any> {
    console.log('request implicitCosts . . .');
    // console.log(JSON.stringify(payload));
    return new Promise((resolve, reject) => {
      this.basicTypeService.getProperyImplicitCosts(payload).subscribe(
        (response) => {
          console.log('Get implicitCosts successfully.');
          resolve(response['implicitCosts']);
        },
        (err) => {
          console.log(err);
          reject();
          // TODO : show error dialog
        }
      );
    });
  }

  requestIPRRateReturn(payload: any): Promise<any> {
    console.log('request IPR rate return . . .');
    // console.log(JSON.stringify(payload));
    return new Promise((resolve, reject) => {
      this.basicTypeService.getProperyRateReturn(payload).subscribe(
        (response) => {
          console.log('Get IPRRateReturn successfully.');
          // console.log(JSON.stringify(response.ipr.ipr));
          resolve(response['ipr']['ipr']);
        },
        (err) => {
          console.log('Error.');
          console.log(err);
          // TODO : Townhome is api bug. It's cannot callulate correctly.
          resolve(payload.ipr_input);
          // TODO : show error dialog
        }
      );
    });
  }

  parseToMillionFormat(value: number) {
    return +(value * 1000000);
  }

  parseMillionToUnitFormat(value: number) {
    const stringValue = value + '';
    return +stringValue.replace('000000', '');
  }

  parseDate(date: string): string {
    try {
      if (date.indexOf('/') > 0) {
        return date;
      }
    } catch (e) {
      return '';
    }

    const d = date.substring(8, 10);
    const m = date.substring(5, 7);
    const y = date.substring(0, 4);
    return m + '/' + d + '/' + y;
  }

  mapName(response: any): any {
    return {
      townPlanColor: response.city_color,
      farValue: response.far.toString(),
      osrValue: response.ors.toString(),
      // 'availableArea': response.total_area.toString(),
      landPrice: response.land_price.toString(),
      fenceLength: response.fence_length.toString(),
      totalArea: response.total_area.toString(),
      lawArea: response.legal_area.toString(),
    };
  }

  getArea(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.basicTypeService.getArea(id).subscribe(
        (response) => {
          console.log('Get area successfully.', response);
          resolve(this.mapName(response));
        },
        (err) => {
          console.log(err);
          reject();
          // TODO : show error dialog
        }
      );
    });
  }

  postArea(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.basicTypeService.postArea(payload).subscribe(
        (response) => {
          console.log('Get area successfully.', response);
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject();
          // TODO : show error dialog
        }
      );
    });
  }

  updateArea(payload: any, id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(id)
      this.basicTypeService.updateArea(payload, id).subscribe(
        (response) => {
          console.log('Get area successfully.', response);
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject();
          // TODO : show error dialog
        }
      );
    });
  }

  getUserInfo(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.basicTypeService.getUserInfo(payload).subscribe(
        (response) => {
          console.log('Get area successfully.', response);
          localStorage.setItem('info', JSON.stringify(response));
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject();
          // TODO : show error dialog
        }
      );
    });
  }

  getSpendingInfo(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.basicTypeService.getSpendingInfo(payload).subscribe(
        (response) => {
          console.log('Get houseType successfully.', response);
          localStorage.setItem('houseType', JSON.stringify(response));
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject();
          // TODO : show error dialog
        }
      );
    });
  }

  insertOperation(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.basicTypeService.insertOperation(payload).subscribe(
        (response) => {
          console.log('Insert Operation successfully.', response);
          const local = JSON.parse(localStorage.getItem('info'));
          local.feasibility_operation_setting = response;
          localStorage.setItem('info', JSON.stringify(local));
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject();
          // TODO : show error dialog
        }
      );
    });
  }

  updateOperation(payload: any, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.basicTypeService.updateOperation(payload, id).subscribe(
        (response) => {
          console.log('Update Operation successfully.', response);
          const local = JSON.parse(localStorage.getItem('info'));
          local.feasibility_operation_setting = response;
          localStorage.setItem('info', JSON.stringify(local));
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject();
          // TODO : show error dialog
        }
      );
    });
  }

  insertCommon(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.basicTypeService.insertCommon(payload).subscribe(
        (response) => {
          console.log('Insert Common successfully.', response);
          const local = JSON.parse(localStorage.getItem('info'));
          local.feasibility_common_setting = response;
          localStorage.setItem('info', JSON.stringify(local));
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject();
          // TODO : show error dialog
        }
      );
    });
  }

  updateCommon(payload: any, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.basicTypeService.updateCommon(payload, id).subscribe(
        (response) => {
          console.log('Update Common successfully.', response);
          const local = JSON.parse(localStorage.getItem('info'));
          local.feasibility_common_setting = response;
          localStorage.setItem('info', JSON.stringify(local));
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject();
          // TODO : show error dialog
        }
      );
    });
  }
  requestMasterGate(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.basicTypeService.requestMasterGate().subscribe(
        (response) => {
          console.log('get Master Gate successfully.', response);
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject();
          // TODO : show error dialog
        }
      );
    });
  }
  requestMasterFence(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.basicTypeService.requestMasterFence().subscribe(
        (response) => {
          console.log('get Master Fence successfully.', response);
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject();
          // TODO : show error dialog
        }
      );
    });
  }
  insertHouseDetail(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.basicTypeService.insertHouseDetail(payload).subscribe(
        (response) => {
          console.log('insert House Detail successfully.', response);
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject();
          // TODO : show error dialog
        }
      );
    });
  }
  insertHouseDetailSaleInfo(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.basicTypeService.insertHouseDetailSaleInfo(payload).subscribe(
        (response) => {
          console.log('insert House Detail Sale successfully.', response);
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject();
          // TODO : show error dialog
        }
      );
    });
  }
  updateHouseDetailSaleInfo(payload: any, id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.basicTypeService.updateHouseDetailSaleInfo(payload, id).subscribe(
        (response) => {
          console.log('update House Detail Sale successfully.', response);
          const houseType = JSON.parse(localStorage.getItem('houseType'));
          const temp = houseType.find(i => i.id === payload.feasibility_house_detail);
          const index = temp.feasibility_house_detail_sale_info.findIndex(x => x.id === id);
          if (index > -1) {
            temp.feasibility_house_detail_sale_info[index] = response;
            houseType.map(i => i.id === temp.id ? temp : i);
            localStorage.setItem('houseType', JSON.stringify(houseType));
          }
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject();
          // TODO : show error dialog
        }
      );
    });
  }
  requestMasterSecurity(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.basicTypeService.requestMasterSecurity().subscribe(
        (response) => {
          console.log('get Master Security successfully.', response);
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject();
          // TODO : show error dialog
        }
      );
    });
  }
  requestMasterSaleOffice(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.basicTypeService.requestMasterSaleOffice().subscribe(
        (response) => {
          console.log('get Master Sale Office successfully.', response);
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject();
          // TODO : show error dialog
        }
      );
    });
  }
  requestMasterClubHouse(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.basicTypeService.requestMasterClubHouse().subscribe(
        (response) => {
          console.log('get Master Clubhouse successfully.', response);
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject();
          // TODO : show error dialog
        }
      );
    });
  }
  requestMasterFitness(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.basicTypeService.requestMasterFitness().subscribe(
        (response) => {
          console.log('get Master Fitness successfully.', response);
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject();
          // TODO : show error dialog
        }
      );
    });
  }
  requestMasterSwimmingPool(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.basicTypeService.requestMasterSwimmingPool().subscribe(
        (response) => {
          console.log('get Master Swimming Pool successfully.', response);
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject();
          // TODO : show error dialog
        }
      );
    });
  }
  updateHouseDetail(payload: any, id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.basicTypeService.updateHouseDetail(payload, id).subscribe(
        (response) => {
          console.log('update House Detail successfully.', response);
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject();
          // TODO : show error dialog
        }
      );
    });
  }
  requestFullCommon(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.basicTypeService.requestFullCommon(id).subscribe(
        (response) => {
          console.log('request Full common info successfully.', response);
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject();
          // TODO : show error dialog
        }
      );
    });
  }

  requestAllFeasibilities(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.basicTypeService.requestAllFeasibilities().subscribe(
        (response) => {
          console.log('request All Feas successfully.', response);
          resolve(response);
        },
        (err) => {
          console.log(err);
          reject();
          // TODO : show error dialog
        }
      );
    });
  }
}
