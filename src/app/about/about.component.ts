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
        const http$ = Observable.create( observer => {
            // sen burada observer.next(), observer.error(), observer.complete() çağırabilirsin
            fetch('/api/courses') // 1. Sunucuya HTTP isteği gönderiyoruz (asenkron çalışır, Promise döner)
            // 2. Gelen cevabı JSON formatına çeviriyoruz (bu da Promise döner)
            .then(response => {
                return response.json(); // burası veri hazır olduğunda çalışır
            })
            // 3. JSON verisi geldiğinde gözlemcilere (subscribe edenlere) veriyi iletiyoruz
            .then(body => {
                observer.next(body);  // veri gönderildi
                observer.complete();  // akış tamamlandı bilgisi gönderildi
            } )
                // 4. Hata olursa: hem hata loglanıyor hem de gözlemcilere iletiliyor
                .catch(err => {
                    observer.error(err);
                })

                http$.subscribe({
                    next: data => console.log('Data:', data),  //  next: Observable veri gönderdiğinde bu fonksiyon çalışır
                    // yani observer.next(...) çağrıldığında burası tetiklenir
                    error: err => console.error('Fehler:', err), // error: Eğer Observable içinde bir hata oluşursa bu fonksiyon çalışır
                    // yani observer.error(...) çağrıldığında tetiklenir yani burasi gözlemcinin degil subjectin görebilecegi bir hata mesajidir.
                    complete: () => console.log('complete') // complete: Observable akışı sona erdiğinde (tamamlandığında) bu fonksiyon çalışır
                    // yani observer.complete() çağrıldığında tetiklenir
                  });
        });
}

}