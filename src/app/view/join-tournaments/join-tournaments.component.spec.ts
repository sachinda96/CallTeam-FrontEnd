import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinTournamentsComponent } from './join-tournaments.component';

describe('JoinTournamentsComponent', () => {
  let component: JoinTournamentsComponent;
  let fixture: ComponentFixture<JoinTournamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinTournamentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinTournamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
