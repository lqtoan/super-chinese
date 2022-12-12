import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'dictionary',
        loadChildren: () => import('../../pages/dictionary/dictionary.module').then((m) => m.DictionaryModule),
      },
      {
        path: 'home',
        loadChildren: () => import('../../pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'user-profile',
        loadChildren: () => import('../../pages/user-profile/user-profile.module').then((m) => m.UserProfileModule),
      },
      {
        path: 'about',
        loadChildren: () => import('../../pages/about/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'vocabulary',
        loadChildren: () => import('../../pages/vocabulary/vocabulary.module').then((m) => m.VocabularyModule),
      },
      {
        path: 'curriculum',
        loadChildren: () => import('../../pages/curriculum/curriculum.module').then((m) => m.CurriculumModule),
      },
      {
        path: 'exercise',
        loadChildren: () => import('../../pages/exercise/exercise.module').then((m) => m.ExerciseModule),
      },
      {
        path: 'course',
        loadChildren: () => import('../../pages/course/course.module').then((m) => m.CourseModule),
      },
      {
        path: '**',
        component: NotFoundComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
