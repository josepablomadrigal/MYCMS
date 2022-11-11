import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCmsDialogComponent } from './edit-cms-dialog.component';

describe('EditCmsDialogComponent', () => {
  let component: EditCmsDialogComponent;
  let fixture: ComponentFixture<EditCmsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCmsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCmsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
