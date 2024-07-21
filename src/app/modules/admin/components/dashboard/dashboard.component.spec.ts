import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponentA } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponentA;
  let fixture: ComponentFixture<DashboardComponentA>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponentA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponentA);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
