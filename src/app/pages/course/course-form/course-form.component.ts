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

  private readonly initName: string = '';
  private readonly initPrice: number = 100000;
  private readonly initDate: Date = new Date();

  readonly courseForm: FormGroup = this.formBuilder.group({
    name: [this.initName, Validators.compose([Validators.required])],
    price: [this.initPrice, Validators.compose([Validators.required])],
    begin: [this.initDate, Validators.compose([Validators.required])],
  });

  ngOnInit(): void {}

  onClose() {
    this.store.setShowForm(false);
    this.courseForm.get('name')?.reset();
    this.store.setFormValue(undefined);
  }

  onSubmit() {
    this.store.createCourse(this.courseForm.value);
    this.courseForm.get('name')?.reset();
    this.courseForm.setValue({
      name: this.initName,
      price: this.initPrice,
      begin: this.initDate,
    });
  }
}
