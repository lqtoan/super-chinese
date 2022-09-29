import { CourseStore } from './../course.store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseFormComponent implements OnInit {
  constructor(private readonly store: CourseStore, private readonly formBuilder: FormBuilder) {}
  readonly isVisibleForm$ = this.store.isVisibleForm$;
  readonly formValue$ = this.store.formValue$;

  private readonly initValue = 100000;
  private readonly initDate: Date = new Date();

  private readonly initFormValue: any;

  readonly courseForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.compose([Validators.required])],
    price: ['', Validators.compose([Validators.required])],
    begin: ['', Validators.compose([Validators.required])],
  });

  ngOnInit(): void {}

  onClose() {
    this.store.setShowForm(false);
    this.courseForm.get('name')?.reset();
    this.store.setFormValue(undefined);
  }

  onSubmit() {
    console.log(this.courseForm.value);
  }
}
