import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  navItem = [
    {
      name: 'VOCABULARY',
      link: 'vocabulary',
    },
    {
      name: 'CURRICULUM',
      link: 'curriculum',
    },
    {
      name: 'EXERCISE',
      link: 'exercise',
    },
  ];
  selectedLanguage = localStorage.getItem('language');
  year: Date = new Date();

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {}

  changeLanguage(event: any) {
    this.translateService.use(event.target.value);
    localStorage.setItem('language', event.target.value);
  }
}
