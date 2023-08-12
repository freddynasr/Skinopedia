import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddOfferComponent } from './edit-add-offer.component';

describe('EditAddOfferComponent', () => {
  let component: EditAddOfferComponent;
  let fixture: ComponentFixture<EditAddOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAddOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
