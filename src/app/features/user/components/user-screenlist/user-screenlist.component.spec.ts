import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserScreenlistComponent } from './user-screenlist.component';

describe('UserScreenlistComponent', () => {
  let component: UserScreenlistComponent;
  let fixture: ComponentFixture<UserScreenlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserScreenlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserScreenlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
