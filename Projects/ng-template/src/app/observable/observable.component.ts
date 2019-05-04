import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css']
})
export class ObservableComponent implements OnInit {
  private otherTodoSubject = new Subject<string[]>();
  todo$: Observable<string[]>;
  otherTodo$ = this.otherTodoSubject.asObservable();

  constructor() { }

  ngOnInit(): void {
    this.todo$ = null;
  }

  reset(): void {
    this.todo$ = of(['First', 'Second', 'Third']);
    this.otherTodoSubject.next(['First', 'Second', 'Third']);
  }

  updateTodo(): void {
    this.todo$ = of(['Fourth', 'Fith', 'Sixth']).pipe(
      map(items => {
        const temp = [];
        items.forEach(item => temp.push(item + ' mapped'));
        return temp;
      })
    );
    this.otherTodoSubject.next(['Fourth', 'Fith', 'Sixth']);
  }
}
