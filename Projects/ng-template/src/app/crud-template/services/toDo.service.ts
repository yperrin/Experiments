import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { ToDoModel } from '../models/toDo.model';
import { tap, delay, scan } from 'rxjs/operators';

const toDoList = [
    new ToDoModel({id: 1, description: 'have service return a list'}),
    new ToDoModel({id: 2, description: 'Display list in parent component'}),
    new ToDoModel({id: 3, description: 'create a popup form for add'}),
    new ToDoModel({id: 4, description: 'update list when add successful'}),
    new ToDoModel({id: 5, description: 'notify list data has been updated'}),
];

@Injectable({
    providedIn: 'root'
})
export class ToDoService {
    private toDoListCurrent: ToDoModel[];
    private toDoSubject = new BehaviorSubject<ToDoModel[]>(null);
    readonly toDoList$: Observable<ToDoModel[]> = this.toDoSubject.asObservable();

    init$(): Observable<ToDoModel[]> {
        // instead of of(toDoList), would retrieve the data using http client
        return of(toDoList)
            .pipe(
                delay(1000), // add some time to show what happens for slow api
                tap(toDoListValue => {
                    this.toDoListCurrent = [...toDoListValue];
                    this.toDoSubject.next(this.toDoListCurrent);
                })
            );
    }

    save$(toDo: ToDoModel): Observable<ToDoModel> {
        if (toDo.id) {
            return of (toDo).pipe(
                tap(() => {
                    for (let i = 0; i < this.toDoListCurrent.length; i++) {
                        if (this.toDoListCurrent[i].id === toDo.id) {
                            this.toDoListCurrent[i] = toDo;
                            break;
                        }
                    }
                    this.toDoSubject.next(this.toDoListCurrent);
                })
            )
        } else {
            // add a new item
            toDo.id = this.toDoListCurrent.length + 1;
            return of(toDo).pipe(
                tap(() => {
                    this.toDoListCurrent.unshift(toDo);
                    this.toDoSubject.next(this.toDoListCurrent);
                })
            );
        }
    }

    delete$(id: number): Observable<boolean> {
        return of(true).pipe(
            tap( success => {
                this.toDoListCurrent = this.toDoListCurrent.filter(item => item.id !== id);
                this.toDoSubject.next(this.toDoListCurrent);
            })
        );
    }

    reset(): void {
        this.toDoListCurrent = [...toDoList];
        this.toDoSubject.next(this.toDoListCurrent);
    }
}
