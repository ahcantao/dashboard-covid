import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataStudioComponent } from './data-studio.component';

describe('DataStudioComponent', () => {
  let component: DataStudioComponent;
  let fixture: ComponentFixture<DataStudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataStudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
