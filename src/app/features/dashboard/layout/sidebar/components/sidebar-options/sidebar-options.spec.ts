import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarOptions } from './sidebar-options';

describe('SidebarOptions', () => {
  let component: SidebarOptions;
  let fixture: ComponentFixture<SidebarOptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarOptions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarOptions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
