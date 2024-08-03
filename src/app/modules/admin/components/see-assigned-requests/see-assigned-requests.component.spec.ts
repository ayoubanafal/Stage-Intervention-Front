import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeAssignedRequestsComponent } from './see-assigned-requests.component';

describe('SeeAssignedRequestsComponent', () => {
  let component: SeeAssignedRequestsComponent;
  let fixture: ComponentFixture<SeeAssignedRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeAssignedRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeAssignedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
