import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { ToDoModel } from '../models/toDo.model';
import { tap } from 'rxjs/operators';

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
export class ToDoService implements OnDestroy {
    private subs: Subscription[] = [];
    private toDoListCurrent: ToDoModel[];
    private toDoSubject = new BehaviorSubject<ToDoModel[]>(null);
    toDoList$: Observable<ToDoModel[]> = this.toDoSubject.asObservable();

    init(): void {
        // instead of of(toDoList), would retrieve the data using http client
        this.subs.push(
            of(toDoList).subscribe(toDoListValue => {
                this.toDoListCurrent = toDoListValue;
                this.toDoSubject.next(this.toDoListCurrent);
            })
        );
    }
    save(toDo: ToDoModel) {
        if (toDo.id == 0) {
            //add a new item
            toDo.id = this.toDoListCurrent.length + 1;
            // potentiall call service on server to add the item, put following code in subscribe
            this.toDoListCurrent.unshift(toDo);
            this.toDoSubject.next(this.toDoListCurrent);
        }
        else {
            // potentiall call service on server to add the item, put following code in subscribe
            for (let i = 0; i < this.toDoListCurrent.length; i++) {
                if (this.toDoListCurrent[i].id === toDo.id) {
                    this.toDoListCurrent[i] = toDo;
                }
                break;
            }
            this.toDoSubject.next(this.toDoListCurrent);
        }
    }
    delete(id: number) {
        // potentiall call service on server to delete the item, put following code in subscribe
        this.toDoListCurrent = this.toDoListCurrent.filter(item => item.id !== id);
        this.toDoSubject.next(this.toDoListCurrent);
    }

    ngOnDestroy(): void {
        this.subs.forEach(sub => sub.unsubscribe());
    }
}
