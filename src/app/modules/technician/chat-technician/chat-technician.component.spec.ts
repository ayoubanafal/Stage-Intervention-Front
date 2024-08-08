import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTechnicianComponent } from './chat-technician.component';

describe('ChatTechnicianComponent', () => {
  let component: ChatTechnicianComponent;
  let fixture: ComponentFixture<ChatTechnicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatTechnicianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
