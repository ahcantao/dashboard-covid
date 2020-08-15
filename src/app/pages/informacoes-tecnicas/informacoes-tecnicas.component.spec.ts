import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacoesTecnicasComponent } from './informacoes-tecnicas.component';

describe('InformacoesTecnicasComponent', () => {
  let component: InformacoesTecnicasComponent;
  let fixture: ComponentFixture<InformacoesTecnicasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacoesTecnicasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacoesTecnicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
