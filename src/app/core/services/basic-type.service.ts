import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as ENVIRONMENT from '../../../environments/environment';

const ENV = ENVIRONMENT.environment;

@Injectable({
  providedIn: 'root',
})
export class BasicTypeService {
  constructor(private http: HttpClient) {}

  getProperyArea(payload): Observable<any> {
    const url = ENV.FEASIBILITY_API + '/property/area';
    return this.http.post(url, payload);
  }

  getProperyProduct(payload): Observable<any> {
    const url = ENV.FEASIBILITY_API + '/property/product';
    return this.http.post(url, payload);
  }

  getProperySpendings(payload): Observable<any> {
    const url = ENV.FEASIBILITY_API + '/property/spendings';
    return this.http.post(url, payload);
  }

  getProperyImplicitCosts(payload): Observable<any> {
    const url = ENV.FEASIBILITY_API + '/property/implicit-costs';
    return this.http.post(url, payload);
  }

  getProperyProfit(payload): Observable<any> {
    const url = ENV.FEASIBILITY_API + '/property/profit';
    return this.http.post(url, payload);
  }

  getProperyRateReturn(payload): Observable<any> {
    const url = ENV.FEASIBILITY_API + '/property/ipr';
    return this.http.post(url, payload);
  }

  getArea(id): Observable<any> {
    // const id = localStorage.getItem('id')
    const url = ENV.FEASIBILITY_API + '/feasibility_areas/' + id;
    return this.http.get(url);
  }

  postArea(payload): Observable<any> {
    const url = ENV.FEASIBILITY_API + '/feasibility_areas';
    return this.http.post(url, payload);
  }

  updateArea(payload, id): Observable<any> {
    const url = ENV.FEASIBILITY_API + '/feasibility_areas/' + id;
    return this.http.put(url, payload);
  }

  getUserInfo(payload): Observable<any> {
    const url = ENV.FEASIBILITY_API + '/feasibilities/' + payload;
    return this.http.get(url);
  }

  getSpendingInfo(payload): Observable<any> {
    const url = ENV.FEASIBILITY_API + '/feasibility_house_details/' + payload;
    return this.http.get(url);
  }

  insertOperation(payload): Observable<any> {
    const url = ENV.FEASIBILITY_API + '/feasibility_operation_setting';
    return this.http.post(url, payload);
  }

  updateOperation(payload, id): Observable<any> {
    const url = ENV.FEASIBILITY_API + '/feasibility_operation_setting/' + id;
    return this.http.put(url, payload);
  }

  insertCommon(payload): Observable<any> {
    const url = ENV.FEASIBILITY_API + '/feasibility_common_setting';
    return this.http.post(url, payload);
  }

  updateCommon(payload, id): Observable<any> {
    const url = ENV.FEASIBILITY_API + '/feasibility_common_setting/' + id;
    return this.http.put(url, payload);
  }

  requestMasterGate(): Observable<any> {
    const url = ENV.FEASIBILITY_API + '/master_data/gate_types';
    return this.http.get(url);
  }

  requestMasterFence(): Observable<any> {
    const url = ENV.FEASIBILITY_API + '/master_data/fence_types';
    return this.http.get(url);
  }

  insertHouseDetail(payload): Observable<any> {
    const url = ENV.FEASIBILITY_API + '/feasibility_house_details';
    return this.http.post(url, payload);
  }

  insertHouseDetailSaleInfo(payload): Observable<any> {
    const url = ENV.FEASIBILITY_API + '​/feasibility_house_detail_sale_info';
    return this.http.post(url, payload);
  }

  updateHouseDetailSaleInfo(payload, id): Observable<any> {
    const url = ENV.FEASIBILITY_API + '​/feasibility_house_detail_sale_info/' + id;
    return this.http.put(url, payload);
  }

  requestMasterSecurity(): Observable<any> {
    const url =
      ENV.FEASIBILITY_API + '/master_data/security_sys_protect_level_types';
    return this.http.get(url);
  }

  requestMasterSaleOffice(): Observable<any> {
    const url = ENV.FEASIBILITY_API + '/master_data/sale_office_types';
    return this.http.get(url);
  }

  requestMasterClubHouse(): Observable<any> {
    const url = ENV.FEASIBILITY_API + '/master_data/club_house_types';
    return this.http.get(url);
  }

  requestMasterFitness(): Observable<any> {
    const url = ENV.FEASIBILITY_API + '/master_data/fitness_facility_types';
    return this.http.get(url);
  }

  requestMasterSwimmingPool(): Observable<any> {
    const url = ENV.FEASIBILITY_API + '/master_data/swimming_pool_types';
    return this.http.get(url);
  }

  updateHouseDetail(payload, id): Observable<any> {
    const url = ENV.FEASIBILITY_API + '/feasibility_house_details/' + id;
    return this.http.put(url, payload);
  }

  requestFullCommon(id): Observable<any> {
    const url = ENV.FEASIBILITY_API + '/feasibility_common_setting/' + id;
    return this.http.get(url);
  }

  requestAllFeasibilities(): Observable<any> {
    const url = ENV.FEASIBILITY_API + '/feasibilities';
    return this.http.get(url);
  }
}
