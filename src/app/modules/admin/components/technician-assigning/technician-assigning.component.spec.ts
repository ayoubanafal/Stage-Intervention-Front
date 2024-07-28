import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianAssigningComponent } from './technician-assigning.component';

describe('TechnicianAssigningComponent', () => {
  let component: TechnicianAssigningComponent;
  let fixture: ComponentFixture<TechnicianAssigningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicianAssigningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianAssigningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
