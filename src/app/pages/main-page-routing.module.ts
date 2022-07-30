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
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomeModule),
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
