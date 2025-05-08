import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';
import {Store} from '../common/store.service';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;
    advancedCourses$ : Observable<Course[]>;



    ngOnInit() {
       
        
        const http$ = createHttpObservable('/api/courses');
        const courses$ = http$
  .pipe(
    tap(() => console.log("HTTP request executed")),
    map(res => Object.values(res["payload"]) as Course[]),
    shareReplay(1)
  );

courses$.subscribe();
  this.beginnerCourses$ = courses$
  .pipe(
    map((courses: Course[]) =>
      courses.filter(course => course.category === 'BEGINNER')
    )
  );

this.advancedCourses$ = courses$
  .pipe(
    map((courses: Course[]) =>
      courses.filter(course => course.category === 'ADVANCED')
    )
  );

            
        
        // http$.subscribe( //Bu http$ adlı bir Observable’a abone oluyorsun (subscribe).Ve üç tane callback (geri çağırma fonksiyonu) veriyorsun:
        //     courses => console.log(courses), //observer.next() çağrıldığında çalışır
        //     //Yani sunucudan kurs verisi geldiğinde, bu veri konsola yazılır
        //     noop, //nooperation yani hata verirse hicbirsey yapma demek
        //     () => console.log('completed')//Observable tamamlandığında (örneğin observer.complete() çağrıldığında) bu çalışır.
        //     //Bu, "işlem başarıyla bitti" mesajıdır.
        // );

    //     courses$.subscribe( 
    //     courses => {

    //     },
    //     noop,
    //     () => console.log('completed')
    //    );
        // const courses$ = this.store.courses$;

        // this.beginnerCourses$ = this.store.selectBeginnerCourses();

        // this.advancedCourses$ = this.store.selectAdvancedCourses();

    }

}
