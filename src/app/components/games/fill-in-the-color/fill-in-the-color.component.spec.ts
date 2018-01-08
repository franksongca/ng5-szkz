import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillInTheColorComponent } from './fill-in-the-color.component';

describe('FillInTheColorComponent', () => {
  let component: FillInTheColorComponent;
  let fixture: ComponentFixture<FillInTheColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillInTheColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillInTheColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
