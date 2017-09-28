import { Component, OnInit } from '@angular/core';
import { StorageService } from '../providers/storage.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})

export class MembersComponent implements OnInit {

  data;
  loading= false;

  constructor(public storageService: StorageService) {  }

  ngOnInit() {
  }

  viewData() {
    // let storageService: StorageService;
    this.loading = true;
    this.storageService.getData().subscribe(
      (d) => {
        this.loading = false;
        this.data = d;
        console.log(this.data);
      }
    );
  }

}
