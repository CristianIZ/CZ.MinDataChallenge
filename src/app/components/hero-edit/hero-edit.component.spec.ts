import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroEditComponent } from './hero-edit.component';

describe('HeroEditComponent', () => {
  let component: HeroEditComponent;
  let fixture: ComponentFixture<HeroEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
