import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Course } from '../models/course.model';
import { deleteCourse } from '../../../server/delete-course.route';

@Injectable({
  providedIn: 'root',
})
export class CoursesServiceWithFetch {
  env = environment;

  async loadAllCourses(): Promise<Course[]> {
    let response = await fetch(`${this.env.apiRoot}/courses`);
    let payload = await response.json();
    return payload.courses;
  }

  async createCourse(course: Partial<Course>): Promise<Course> {
    let response = await fetch(`${this.env.apiRoot}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(course),
    });
    return response.json();
  }

  async updateCourse(courseId: string, changes: Partial<Course>) {
    let response = await fetch(`${this.env.apiRoot}/courses/${courseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(changes),
    });
    return response.json();
  }

  async deleteCourse(courseId: string): Promise<void> {
    let response = await fetch(`${this.env.apiRoot}/courses/${courseId}`, {
      method: 'DELETE',
    });
  }
}
