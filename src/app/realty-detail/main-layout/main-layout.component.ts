import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCore from '../../core/reducers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStep, MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent implements OnInit {
  public currentProperty = '';
  public colorsTown = [];
  public selectName = { name: '' };
  selectedWindow: string;
  selectIndex: number;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  forthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;

  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  @ViewChild('one', { static: false }) one: MatStep;
  @ViewChild('two', { static: false }) two: MatStep;
  @ViewChild('three', { static: false }) three: MatStep;
  @ViewChild('four', { static: false }) four: MatStep;

  constructor(private store: Store<any>, private _formBuilder: FormBuilder) {
    this.store.select(fromCore.getPage).subscribe((page) => {
      this.currentProperty = page.page;
    });
  }

  ngOnInit() {
    this.selectedWindow = 'spending';
    this.colorsTown = [
      { name: 'SOHO Bangkok Ratchada' },
      { name: 'โครงการหมู่บ้านจัดสรรแสรสิริ - ลาดปลาเค้า 48' },
    ];
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.forthFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.fifthFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
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
}
