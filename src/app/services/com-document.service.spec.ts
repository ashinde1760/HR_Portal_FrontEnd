import { TestBed } from '@angular/core/testing';

import { ComDocumentService } from './com-document.service';

describe('ComDocumentService', () => {
  let service: ComDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
