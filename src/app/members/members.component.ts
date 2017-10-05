import {Component, OnInit, ViewChild} from '@angular/core';
import { StorageService } from '../providers/storage.service';
import { MetricsresultComponent } from '../metricsresult/metricsresult.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})

export class MembersComponent implements OnInit {

  @ViewChild(MetricsresultComponent) metricsResultComponent: MetricsresultComponent;
  metricsData;
  loading= false;

  constructor(public storageService: StorageService) {
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
