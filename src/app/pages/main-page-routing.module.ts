import { MainPageComponent } from './main-page.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: '', redirectTo: 'setting', pathMatch: 'full' },
      {
        path: 'about',
        loadChildren: () => import('../pages/about/about.module').then(m => m.AboutModule),
      },
      {
        path: 'vocabulary',
        loadChildren: () => import('../pages/vocabulary/vocabulary.module').then(m => m.VocabularyModule),
      },
      {
        path: 'curriculum',
        loadChildren: () => import('../pages/curriculum/curriculum.module').then(m => m.CurriculumModule),
      },
      {
        path: 'exercise',
        loadChildren: () => import('../pages/exercise/exercise.module').then(m => m.ExerciseModule),
      },
      {
        path: 'setting',
        loadChildren: () => import('../pages/setting/setting.module').then(m => m.SettingModule),
      },
      {
        path: 'new',
        loadChildren: () => import('../pages/new/new.module').then(m => m.NewModule),
      },
      {
        path: 'support',
        loadChildren: () => import('../pages/support/support.module').then(m => m.SupportModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
