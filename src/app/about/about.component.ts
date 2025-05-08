import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
    concat,
    fromEvent,
    interval,
    noop,
    observable,
    Observable,
    of,
    timer,
    merge,
    Subject,
    BehaviorSubject,
    AsyncSubject,
    ReplaySubject
} from 'rxjs';
import {delayWhen, filter, map, take, timeout} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';
import { MatCardLgImage } from '@angular/material/card';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    standalone: false
})
export class AboutComponent implements OnInit {

    ngOnInit() {

        const source1$ =of(1, 2, 3);

        const source2$ =of(4, 5, 6);

        const source3$ =of(7, 8, 9);

        const result$ = concat(source1$,source2$,source3$);

        result$.subscribe(console.log);


    /* const interval$ = timer(3000,1000);
    const sub = interval$.subscribe(val => console.log("stream1 => " + val));

    setTimeout(() => sub.unsubscribe(),5000);//sayfa acildiktan 5 saniye sonra saymayi durdurur
    
    const click$ = fromEvent(document, 'click'); //önce tanimlanir
        click$.subscribe(
            evt => console.log(evt), //sonra cagrilir
            err => console.log(err), //Hata olursa calisir
            () => console.log("completed") //program biterse calisir ama fromEvent sonsuzdur yani müdahale edilmedigi sürece bitmez
            
        ); */
        // Özel bir Observable yani gözlemci oluşturuyoruz
    //     const http$ = createHttpObservable('/api/courses');
    //     const courses$ = http$.pipe(
    //         map(res => Object.entries(res["payload"]) )
    //     );


    //     // http$.subscribe( //Bu http$ adlı bir Observable’a abone oluyorsun (subscribe).Ve üç tane callback (geri çağırma fonksiyonu) veriyorsun:
    //     //     courses => console.log(courses), //observer.next() çağrıldığında çalışır
    //     //     //Yani sunucudan kurs verisi geldiğinde, bu veri konsola yazılır
    //     //     noop, //nooperation yani hata verirse hicbirsey yapma demek
    //     //     () => console.log('completed')//Observable tamamlandığında (örneğin observer.complete() çağrıldığında) bu çalışır.
    //     //     //Bu, "işlem başarıyla bitti" mesajıdır.
    //     // );

    //     courses$.subscribe( 
    //     courses => console.log(courses),
    //     noop,
    //     () => console.log('completed')
    //    );

}

}

