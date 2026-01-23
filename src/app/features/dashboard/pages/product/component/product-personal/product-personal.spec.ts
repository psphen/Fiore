import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPersonal } from './product-personal';

describe('ProductPersonal', () => {
  let component: ProductPersonal;
  let fixture: ComponentFixture<ProductPersonal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPersonal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPersonal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
