import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedRegionsComponent } from './saved-regions.component';

describe('SavedRegionsComponent', () => {
  let component: SavedRegionsComponent;
  let fixture: ComponentFixture<SavedRegionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedRegionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
