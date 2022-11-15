import { TestBed } from '@angular/core/testing';

import { ContentManagementSystemService } from './content-management-system.service';

describe('ContentManagementSystemServiceService', () => {
  let service: ContentManagementSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentManagementSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
