import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCore from '../../core/reducers';
import * as infoAction from '../../core/actions/info.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { RequestManagerService } from '../../core/services/request-manager.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent implements OnInit {
  public currentProperty = '';
  public projectName = [];
  public selectProject = { name: '' };
  selectedWindow: string;
  selectIndex: number;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  forthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  public allFeas: any;
  currentInfo: any;

  showExpension = false;

  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  @ViewChild('one', { static: false }) one: MatStep;
  @ViewChild('two', { static: false }) two: MatStep;
  @ViewChild('three', { static: false }) three: MatStep;
  @ViewChild('four', { static: false }) four: MatStep;

  constructor(
    private store: Store<any>,
    private _formBuilder: FormBuilder,
    private requestManagerService: RequestManagerService
  ) {
    this.store.select(fromCore.getPage).subscribe((page) => {
      this.currentProperty = page.page;
    });
    this.store.select(fromCore.getInfo).subscribe((info) => {
      if (info) {
        this.currentInfo = info.info;
      }
    });
  }

  async ngOnInit() {
    this.setInitial();
    this.selectedWindow = 'area';
    this.projectName = [
      { name: 'SOHO Bangkok Ratchada' },
      { name: 'โครงการหมู่บ้านจัดสรรแสรสิริ - ลาดปลาเค้า 48' },
    ];
    this.firstFormGroup = this._formBuilder.group({
      setNext: ['true', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      setNext: ['true', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      setNext: ['true', Validators.required],
    });
    this.forthFormGroup = this._formBuilder.group({
      setNext: ['true', Validators.required],
    });
    this.fifthFormGroup = this._formBuilder.group({
      setNext: ['true', Validators.required],
    });
    this.selectProject.name = 'โครงการหมู่บ้านจัดสรรแสรสิริ - ลาดปลาเค้า 48';
  }

  async setInitial() {
    this.allFeas = await this.requestManagerService.requestAllFeasibilities();
    // tslint:disable-next-line: max-line-length
    const startValue = this.allFeas.find(
      (item) =>
        item.create_by === 'kong' &&
        item.project.project_name ===
          'โครงการหมู่บ้านจัดสรรแสรสิริ - ลาดปลาเค้า 48'
    );
    localStorage.setItem('id', startValue.id);
    const info = await this.requestManagerService.getSpendingInfo(startValue.id);
    localStorage.setItem('houseType', JSON.stringify(info));
    this.store.dispatch(new infoAction.InfoAction(startValue));
  }

  onChange(value) {
    this.selectedWindow = value;
    this.selectIndex = this.changeWordToValue(value);
  }

  clearNextSteps(stepper): void {
    const index = stepper.selectedIndex;
    this.selectIndex = index;
    this.selectedWindow = this.changeValueToWord(index);
  }

  changeValueToWord(index: number): string {
    switch (index) {
      case 0:
        return 'area';
      case 1:
        return 'spending';
      case 2:
        return 'evaluate';
      case 3:
        return 'cashin';
      case 4:
        return 'detail';
      default:
        return 'area';
    }
  }

  changeWordToValue(word: string): number {
    switch (word) {
      case 'area':
        return 0;
      case 'spending':
        return 1;
      case 'evaluate':
        return 2;
      case 'cashin':
        return 3;
      case 'detail':
        return 4;
      default:
        return 0;
    }
  }

  toggleProperty(propertyType: string) {
    this.selectedWindow = propertyType;
    this.selectIndex = this.changeWordToValue(propertyType);
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
      if (propertyType === this.selectedWindow) {
        return style_list_item;
      } else {
        return style_none;
      }
    }
  }

  onToggleEdit(event: any) {
    const page = event.page;
    this.selectedWindow = page;
    this.selectIndex = this.changeWordToValue(page);
  }

  async onChangeDropdown(event: any) {
    // tslint:disable-next-line: max-line-length
    const startValue = this.allFeas.find(
      (item) =>
        item.create_by === 'kong' &&
        item.project.project_name === event.value.name
    );
    localStorage.setItem('id', startValue.id);
    const info = await this.requestManagerService.getSpendingInfo(startValue.id);
    localStorage.setItem('houseType', JSON.stringify(info));
    this.store.dispatch(new infoAction.InfoAction(startValue));
  }
}
