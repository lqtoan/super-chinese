import { MainPageComponent } from './main-page.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'user-profile',
        loadChildren: () => import('../pages/user-profile/user-profile.module').then((m) => m.UserProfileModule),
      },
      {
        path: 'about',
        loadChildren: () => import('../pages/about/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'vocabulary',
        loadChildren: () => import('../pages/vocabulary/vocabulary.module').then((m) => m.VocabularyModule),
      },
      {
        path: 'curriculum',
        loadChildren: () => import('../pages/curriculum/curriculum.module').then((m) => m.CurriculumModule),
      },
      {
        path: 'exercise',
        loadChildren: () => import('../pages/exercise/exercise.module').then((m) => m.ExerciseModule),
      },
      {
        path: 'new',
        loadChildren: () => import('../pages/new/new.module').then((m) => m.NewModule),
      },
      {
        path: 'support',
        loadChildren: () => import('../pages/support/support.module').then((m) => m.SupportModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
