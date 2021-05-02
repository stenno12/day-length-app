import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaylightTimeComponent } from './daylight-time.component';

describe('DaylightTimeComponent', () => {
  let component: DaylightTimeComponent;
  let fixture: ComponentFixture<DaylightTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaylightTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaylightTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
