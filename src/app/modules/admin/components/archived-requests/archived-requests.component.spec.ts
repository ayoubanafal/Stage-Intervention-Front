import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedRequestsComponent } from './archived-requests.component';

describe('ArchivedRequestsComponent', () => {
  let component: ArchivedRequestsComponent;
  let fixture: ComponentFixture<ArchivedRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
