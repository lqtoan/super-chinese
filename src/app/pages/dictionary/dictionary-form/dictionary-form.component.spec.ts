import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryFormComponent } from './dictionary-form.component';

describe('DictionaryFormComponent', () => {
  let component: DictionaryFormComponent;
  let fixture: ComponentFixture<DictionaryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictionaryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DictionaryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
