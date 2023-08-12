import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemScreenComponent } from './item-screen.component';

describe('ItemScreenComponent', () => {
  let component: ItemScreenComponent;
  let fixture: ComponentFixture<ItemScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
