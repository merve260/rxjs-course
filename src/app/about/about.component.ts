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

    const interval$ = timer(3000,1000);
    interval$.subscribe(val => console.log("stream1 => " + val));
    
    const click$ = fromEvent(document, 'click'); //önce tanimlanir
        click$.subscribe(
            evt => console.log(evt), //sonra cagrilir
            err => console.log(err), //Hata olursa calisir
            () => console.log("completed") //program biterse calisir ama fromEvent sonsuzdur yani müdahale edilmedigi sürece bitmez
            
        );
}

}