import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoWatermarkComponent } from './logo-watermark.component';

describe('LogoWatermarkComponent', () => {
  let component: LogoWatermarkComponent;
  let fixture: ComponentFixture<LogoWatermarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoWatermarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoWatermarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
