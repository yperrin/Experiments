import { Subject, Observable, of, forkJoin } from 'rxjs';
import { PlayViewModel, PlayFormViewModel } from '../models/playViewModel.model';
import { tap, map, delay, shareReplay } from 'rxjs/operators';
import { Injectable } from '@angular/core';

const form$ = of(new PlayFormViewModel({first: 'First', second: 'Second'})).pipe(
    delay(1000),
    tap(() => console.log('service getting Form'))
);

@Injectable({
    providedIn: 'root'
})
export class PlayService {
    private vmSubject = new Subject<PlayViewModel>();
    private currentVM: PlayViewModel;
    vm$ = this.vmSubject.asObservable();

    init$(): Observable<PlayViewModel> {
        const playGeneral = new PlayViewModel({option: true});

        const general$ = of(playGeneral).pipe(
            delay(1000),
            tap(() => console.log('service getting general')),
            shareReplay()
        );
        return forkJoin(general$, form$).pipe(
            map( value => {
                const vm = new PlayViewModel({form: value[1], option: value[0].option});
                console.log('Getting value from fork Join');
                this.currentVM = vm;
                this.vmSubject.next(vm);
                return vm;
            })
        );
    }

    save$() {
        return form$.pipe(
            tap(value => {
                this.currentVM.form = value;
                this.vmSubject.next(this.currentVM);
            })
        )
    }
}
