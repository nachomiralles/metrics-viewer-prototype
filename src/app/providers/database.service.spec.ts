import { TestBed, inject } from '@angular/core/testing';

import { Database.Service.TsService } from './database.service.ts.service';

describe('Database.Service.TsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Database.Service.TsService]
    });
  });

  it('should be created', inject([Database.Service.TsService], (service: Database.Service.TsService) => {
    expect(service).toBeTruthy();
  }));
});
