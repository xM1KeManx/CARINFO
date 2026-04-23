import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GomasPage } from './gomas.page';

describe('GomasPage', () => {
  let component: GomasPage;
  let fixture: ComponentFixture<GomasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GomasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
