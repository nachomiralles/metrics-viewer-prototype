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
    // const parsedData = JSON.parse(allData.result.results[0].value)
    const parsedData = allData;
    this.structuredData = DataFormatterUtil.createMetricData(parsedData);
    this.dataReceived = true;
  }

  getCSV() {
    const encodedUri = encodeURI(DataFormatterUtil.exportToCSV(this.structuredData));
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'datos.csv');
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "my_data.csv".
    // window.open(encodedUri);
  }
}
