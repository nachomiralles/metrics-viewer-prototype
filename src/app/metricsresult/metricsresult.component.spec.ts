import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsresultComponent } from './metricsresult.component';

describe('MetricsresultComponent', () => {
  let component: MetricsresultComponent;
  let fixture: ComponentFixture<MetricsresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricsresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
