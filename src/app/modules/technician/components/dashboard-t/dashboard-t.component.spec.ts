import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTComponent } from './dashboard-t.component';

describe('DashboardTComponent', () => {
  let component: DashboardTComponent;
  let fixture: ComponentFixture<DashboardTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardTComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
