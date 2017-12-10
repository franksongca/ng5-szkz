import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TytsMenuComponent } from './tyts-menu.component';

describe('TytsMenuComponent', () => {
  let component: TytsMenuComponent;
  let fixture: ComponentFixture<TytsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TytsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TytsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
