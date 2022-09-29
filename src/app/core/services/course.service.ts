import { environment } from './../../../environments/environment';
import { delay, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '@models/course.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
  constructor(private readonly httpClient: HttpClient) {}

  API = `${environment.api}courses`;

  getCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.API).pipe(delay(500));
  }

  createCourse(course: Course) {
    return this.httpClient.post<Course>(this.API, course);
  }
}
