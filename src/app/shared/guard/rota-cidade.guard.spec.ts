import { TestBed } from '@angular/core/testing';

import { RotaCidadeGuard } from './rota-cidade.guard';

describe('RotaCidadeGuard', () => {
  let guard: RotaCidadeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RotaCidadeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
