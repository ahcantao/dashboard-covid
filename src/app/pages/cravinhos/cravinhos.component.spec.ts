import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CravinhosComponent } from './cravinhos.component';

describe('CravinhosComponent', () => {
  let component: CravinhosComponent;
  let fixture: ComponentFixture<CravinhosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CravinhosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CravinhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
