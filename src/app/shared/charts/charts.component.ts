import {
  Component,
  ViewChild,
  OnInit,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  Input,
} from "@angular/core";
import { Store } from "@ngrx/store";

import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexLegend,
  ApexResponsive,
  ApexDataLabels,
  ApexTooltip,
} from "ng-apexcharts";

import * as allChart from "./data/chart-setting";
import * as villageChart from "./data/village-chart";
import * as townhomeChart from "./data/townhome-chart";
import * as condoChart from "./data/condo-chart";
import * as hotelChart from "./data/hotel-chart";
import * as communityMallChart from "./data/communityMall-chart";
import * as resortChart from "./data/resort-chart";
import * as fromCore from "../../core/reducers";

const allCharts = allChart.chartsType;

const appCharts = {
  village: villageChart.chartsType,
  townhome: townhomeChart.chartsType,
  condo: condoChart.chartsType,
  hotel: hotelChart.chartsType,
  resort: resortChart.chartsType,
  communityMall: communityMallChart.chartsType,
};

export interface ChartOptions {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  colors: string[];
  labels: string[];
  dataLabels: ApexDataLabels;
  responsive: ApexResponsive[];
  tooltip: any;
}

@Component({
  selector: "app-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.css"],
})
export class ChartsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() chartType: string;
  @Input() chartData: any;
  @Input() owner: string;

  series: ApexNonAxisChartSeries;
  @ViewChild("chart", { static: false }) chart: ChartComponent;

  public chartOptions: Partial<ChartOptions>;
  private currentProperty: string;

  constructor(private store: Store<any>) {
    this.store.select(fromCore.getPage).subscribe((page) => {
      this.currentProperty = page.page;
    });
  }

  initializeChart(chartType: string) {
    const chartsModel = appCharts[this.currentProperty][chartType];
  }

  ngOnInit() {
    // this.chartMapping('init');
    // console.log('product chart init',this.chartData, this.chartType)
    this.chartMapper(this.chartType, this.owner);
  }

  ngOnChanges(changes: SimpleChanges) {
    // this.chartMapping('onChange');
    // console.log('product chart onChange',this.chartData, this.chartType)
    this.chartMapper(this.chartType, this.owner);
  }

  getCharts(): any {
    const myChart = allCharts.filter((data) => data.name === this.chartType)[0];
    return myChart.chart;
  }

  chartMapper(chartType: string, owner?: string) {
    const chartDefault = JSON.parse(
      JSON.stringify(appCharts[this.currentProperty][chartType])
    );
    switch (chartType) {
      case "area":
        if (this.chart !== undefined) {
          chartDefault.series = this.areaChartMapping(this.currentProperty);
          this.chart.updateOptions(chartDefault);
        } else {
          chartDefault.series = this.areaChartMapping(this.currentProperty);
          this.chartOptions = chartDefault;
        }
        this.chartOptions.tooltip = {
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            const all = series.reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            );
            const percent = (series[seriesIndex] / all) * 100;
            return (
              // tslint:disable-next-line: max-line-length
              '<div style=" width: 120px; height: 75px; background-color: white;color: black;text-align: center;padding: 15px 0;font-weight: 600;box-shadow: 1px 1px 6px 0px grey;border-radius: 25px;">' +
              "<span>" +
              w.globals.labels[seriesIndex] +
              "</span>" +
              "<br/>" +
              `<span style="color: ${w.globals.colors[seriesIndex]}">` +
              percent.toFixed(2) +
              "%" +
              "</span>" +
              "</div>"
            );
          },
        };
        break;
      case "houseType":
        if (this.chart !== undefined) {
          chartDefault.series = this.houseChartMapping(this.currentProperty);
          this.chart.updateOptions(chartDefault);
        } else {
          chartDefault.series = this.houseChartMapping(this.currentProperty);
          this.chartOptions = chartDefault;
        }
        this.chartOptions.tooltip = {
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            const all = series.reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            );
            const percent = (series[seriesIndex] / all) * 100;
            return (
              // tslint:disable-next-line: max-line-length
              '<div style=" width: 140px; height: 100px; background-color: white;color: black;text-align: center;padding: 10px 0;font-weight: 600;box-shadow: 1px 1px 6px 0px grey;border-radius: 25px; line-height: 25px;">' +
              "<span>" +
              w.globals.labels[seriesIndex] +
              "</span>" +
              "<br/>" +
              `<span style="color: ${w.globals.colors[seriesIndex]}">` +
              series[seriesIndex] +
              " หลัง" +
              "</span>" +
              "<br/>" +
              `<span style="color:orange">` +
              "= " +
              percent.toFixed(2) +
              "%" +
              "</span>" +
              "</div>"
            );
          },
        };
        break;
      default:
        console.log("Chart not found : " + this.chartType);
        break;
    }
  }

  areaChartMapping(currentProperty: string): Array<number> {
    let series = [];
    series = [
      +this.chartData.sellArea,
      +this.chartData.roadSize,
      +this.chartData.greenArea,
      +this.chartData.centerArea,
    ];
    return series;
  }

  houseChartMapping(currentProperty: string): Array<number> {
    let series = [];
    series = [243, 121, 121];
    return series;
  }

  ngOnDestroy() {
    // this.chart.destroy();
  }
}
