import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotHistoricoComponent } from './plot-historico.component';

describe('PlotHistoricoComponent', () => {
  let component: PlotHistoricoComponent;
  let fixture: ComponentFixture<PlotHistoricoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotHistoricoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
