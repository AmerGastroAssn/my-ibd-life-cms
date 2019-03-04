import { TestBed } from '@angular/core/testing';

import { CustomNavLinkService } from './custom-nav-link.service';

describe('CustomNavLinkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomNavLinkService = TestBed.get(CustomNavLinkService);
    expect(service).toBeTruthy();
  });
});
