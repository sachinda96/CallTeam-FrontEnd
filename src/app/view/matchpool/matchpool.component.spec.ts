import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchpoolComponent } from './matchpool.component';

describe('MatchpoolComponent', () => {
  let component: MatchpoolComponent;
  let fixture: ComponentFixture<MatchpoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchpoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchpoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
