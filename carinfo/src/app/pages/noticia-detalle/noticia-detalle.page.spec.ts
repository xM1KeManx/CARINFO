import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoticiaDetallePage } from './noticia-detalle.page';

describe('NoticiaDetallePage', () => {
  let component: NoticiaDetallePage;
  let fixture: ComponentFixture<NoticiaDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiaDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
