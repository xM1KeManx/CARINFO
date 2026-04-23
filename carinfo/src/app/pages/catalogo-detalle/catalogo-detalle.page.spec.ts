import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogoDetallePage } from './catalogo-detalle.page';

describe('CatalogoDetallePage', () => {
  let component: CatalogoDetallePage;
  let fixture: ComponentFixture<CatalogoDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
