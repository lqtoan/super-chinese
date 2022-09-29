import { CourseStore } from './../course.store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzI18nService, vi_VN, en_US } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseFormComponent implements OnInit {
  constructor(
    private readonly store: CourseStore,
    private readonly formBuilder: FormBuilder,
    private i18n: NzI18nService
  ) {}
  readonly isVisibleForm$ = this.store.isVisibleForm$;
  readonly formValue$ = this.store.formValue$;
  private readonly currentLanguage = localStorage.getItem('language');

  private readonly initName: string = '';
  private readonly initPrice: number = 100000;
  private readonly initDate: Date = new Date();

  readonly courseForm: FormGroup = this.formBuilder.group({
    name: [this.initName, Validators.compose([Validators.required])],
    price: [this.initPrice, Validators.compose([Validators.required])],
    begin: [this.initDate, Validators.compose([Validators.required])],
  });

  ngOnInit(): void {
    this.i18n.setLocale(this.currentLanguage == 'vi' ? vi_VN : en_US);
  }

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
