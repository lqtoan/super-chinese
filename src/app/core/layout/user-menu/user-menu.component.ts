import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
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

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  navigate(link: string) {
    console.log(link);
    this.router.navigate([`/${link}`])
  }
}
