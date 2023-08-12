import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSubtypeComponent } from './type-subtype.component';

describe('TypeSubtypeComponent', () => {
  let component: TypeSubtypeComponent;
  let fixture: ComponentFixture<TypeSubtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeSubtypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeSubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
