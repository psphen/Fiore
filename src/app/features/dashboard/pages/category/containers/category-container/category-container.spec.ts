import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryContainer } from './category-container';

describe('CategoryContainer', () => {
  let component: CategoryContainer;
  let fixture: ComponentFixture<CategoryContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
