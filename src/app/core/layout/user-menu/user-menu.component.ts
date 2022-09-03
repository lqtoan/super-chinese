import { AuthenticationService } from './../../authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {
  navItem = [
    {
      name: 'HOME',
      link: 'home',
    },
    {
      name: 'NEW',
      link: 'new',
    },
    {
      name: 'ABOUT',
      link: 'about',
    },
    {
      name: 'SUPPORT',
      link: 'support',
    },
  ];

  constructor(public authService: AuthenticationService, private router: Router) {
    this.authService.getAccessToken();
  }

  ngOnInit(): void {}

  navigate(link: string) {
    this.router.navigate([`/${link}`]);
  }
}
