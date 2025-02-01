import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { InvoicesService } from './invoices.service';

describe('InvoicesService', () => {
  let service: InvoicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [InvoicesService]
    });
    service = TestBed.inject(InvoicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
