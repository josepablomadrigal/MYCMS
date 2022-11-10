import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCmsDialogComponent } from './create-cms-dialog.component';

describe('CreateCmsDialogComponent', () => {
  let component: CreateCmsDialogComponent;
  let fixture: ComponentFixture<CreateCmsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCmsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCmsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
