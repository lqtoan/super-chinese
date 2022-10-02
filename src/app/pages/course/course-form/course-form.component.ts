import { CourseStore } from './../course.store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzI18nService, vi_VN, en_US, zh_CN } from 'ng-zorro-antd/i18n';
import { UserProfileService } from '@services/user-profile.service';

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
    private readonly i18n: NzI18nService
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
    beginDate: [this.initDate, Validators.compose([Validators.required])],
    beginTime: [this.initDate, Validators.compose([Validators.required])],
    createdDate: ['', Validators.compose([])],
    createdBy: ['', Validators.compose([])],
  });

  ngOnInit(): void {
    if (this.currentLanguage == 'vi') {
      this.i18n.setLocale(vi_VN);
    }
    if (this.currentLanguage == 'en') {
      this.i18n.setLocale(en_US);
    }
    if (this.currentLanguage == 'zh') {
      this.i18n.setLocale(zh_CN);
    }
  }

  onClose() {
    this.store.setShowForm(false);
    this.courseForm.get('name')?.reset();
    this.store.setFormValue(undefined);
  }

  onSubmit() {
    let formValue = this.courseForm.getRawValue();
    formValue.createdDate = new Date();
    this.store.createCourse(formValue);
    this.courseForm.get('name')?.reset();
    this.courseForm.setValue({
      name: this.initName,
      price: this.initPrice,
      beginDate: this.initDate,
      beginTime: this.initDate,
      createdDate: '',
      createdBy: '',
    });
  }
}
