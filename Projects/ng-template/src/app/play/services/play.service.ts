import { Subject, Observable, of, forkJoin } from 'rxjs';
import { PlayViewModel, PlayFormViewModel } from '../models/playViewModel.model';
import { tap, map, delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PlayService {
    private vmSubject = new Subject<PlayViewModel>();
    vm$ = this.vmSubject.asObservable();

    init$(): Observable<PlayViewModel> {
        const playGeneral = new PlayViewModel({option: true});
        const playForm = new PlayFormViewModel({first: 'First', second: 'Second'});

        const general$ = of(playGeneral).pipe(
            delay(1000),
            tap(() => console.log('service getting general'))
        );
        const form$ = of(playForm).pipe(
            delay(1000),
            tap(() => console.log('service getting Form'))
        );
        return forkJoin(general$, form$).pipe(
            map( value => {
                const vm = new PlayViewModel({form: value[1], option: value[0].option});
                console.log('Getting value from fork Join');
                this.vmSubject.next(vm);
                return vm;
            })
        );
    }
}
