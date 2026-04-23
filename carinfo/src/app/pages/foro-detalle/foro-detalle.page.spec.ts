import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForoDetallePage } from './foro-detalle.page';

describe('ForoDetallePage', () => {
  let component: ForoDetallePage;
  let fixture: ComponentFixture<ForoDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ForoDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
