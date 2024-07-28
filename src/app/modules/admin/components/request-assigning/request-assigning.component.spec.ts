import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAssigningComponent } from './request-assigning.component';

describe('RequestAssigningComponent', () => {
  let component: RequestAssigningComponent;
  let fixture: ComponentFixture<RequestAssigningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestAssigningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestAssigningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
