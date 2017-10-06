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
    const parsedData = JSON.parse(allData.result.results[0].value)
    this.structuredData = DataFormatterUtil.createMetricData(parsedData);
    this.dataReceived = true;
  }
}
