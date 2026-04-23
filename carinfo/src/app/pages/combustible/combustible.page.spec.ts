import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CombustiblePage } from './combustible.page';

describe('CombustiblePage', () => {
  let component: CombustiblePage;
  let fixture: ComponentFixture<CombustiblePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CombustiblePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
