import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileFooternavComponent } from './mobile-footernav.component';

describe('MobileFooternavComponent', () => {
  let component: MobileFooternavComponent;
  let fixture: ComponentFixture<MobileFooternavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileFooternavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileFooternavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
