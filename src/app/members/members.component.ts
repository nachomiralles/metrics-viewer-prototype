import {Component, OnInit, ViewChild} from '@angular/core';
import { StorageService } from '../providers/storage.service';
import { MetricsResultComponent } from '../metricsresult/metricsresult.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})

export class MembersComponent implements OnInit {

  @ViewChild(MetricsResultComponent) metricsResultComponent: MetricsResultComponent;
  metricsData;
  loading= false;
  // urlReceived = false;

  constructor(public storageService: StorageService) {
    // this.storageService.subjectURL.subscribe(
    //   (url) => {
    //     this.urlReceived = true;
    //   });
  }

  ngOnInit() {
  }

  viewData() {
    this.loading = true;
    this.storageService.getData().subscribe(
      (d) => {
        this.loading = false;
        this.metricsData = d;
        this.metricsResultComponent.prepareData(this.metricsData);
      }
    );
  }




}
