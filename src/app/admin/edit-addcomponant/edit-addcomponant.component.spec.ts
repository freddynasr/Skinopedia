import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddcomponantComponent } from './edit-addcomponant.component';

describe('EditAddcomponantComponent', () => {
  let component: EditAddcomponantComponent;
  let fixture: ComponentFixture<EditAddcomponantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddcomponantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAddcomponantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
