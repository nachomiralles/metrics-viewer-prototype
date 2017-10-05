import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsResultComponent } from './metricsresult.component';

describe('MetricsResultComponent', () => {
  let component: MetricsResultComponent;
  let fixture: ComponentFixture<MetricsResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricsResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
