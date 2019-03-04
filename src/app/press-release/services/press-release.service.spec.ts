import { TestBed } from '@angular/core/testing';

import { PressReleaseService } from './press-release.service';

describe('PressReleaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PressReleaseService = TestBed.get(PressReleaseService);
    expect(service).toBeTruthy();
  });
});
