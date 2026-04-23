import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisTemasPage } from './mis-temas.page';

describe('MisTemasPage', () => {
  let component: MisTemasPage;
  let fixture: ComponentFixture<MisTemasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MisTemasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
