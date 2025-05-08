import { Observable } from "rxjs";
import { Course } from "../model/course";

export function createHttpObservable(url: string): Observable<any> {
  return new Observable<Course[]>(observer => {
    fetch(url)
      .then(response => response.json())
      .then(body => {
        const coursesArray: Course[] = Object.values(body.payload);
        observer.next(coursesArray);  // ✅ burada array'e çeviriyoruz
        observer.complete();
      })
      .catch(err => observer.error(err));
  });
}
