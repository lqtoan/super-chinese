import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss'],
  providers: [NzMessageService, DatePipe],
})
export class DictionaryComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
