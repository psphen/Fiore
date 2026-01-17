import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsReactive } from './forms-reactive';

describe('FormsReactive', () => {
  let component: FormsReactive;
  let fixture: ComponentFixture<FormsReactive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsReactive]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsReactive);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
