import {Component, OnInit} from '@angular/core';
import { UserReport } from '../model/user.report';
import {DataFormatterUtil} from '../utils/data.formatter.util';

@Component({
  selector: 'app-metricsresult',
  templateUrl: './metricsresult.component.html',
  styleUrls: ['./metricsresult.component.css']
})
export class MetricsResultComponent implements OnInit {

  structuredData: UserReport[] = [];
  dataReceived = false;

  constructor() { }

  ngOnInit() {
  }


  prepareData(allData) {
    this.structuredData = DataFormatterUtil.createMetricData(allData);
    this.dataReceived = true;
    console.log(this.structuredData.length);
  }
}
