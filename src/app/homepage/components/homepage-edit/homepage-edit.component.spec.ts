import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageEditComponent } from './homepage-edit.component';

describe('HomepageEditComponent', () => {
  let component: HomepageEditComponent;
  let fixture: ComponentFixture<HomepageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
