import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from './models/user.model';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css']
})
export class ObservableComponent implements OnInit {
  private otherTodoSubject = new Subject<string[]>();
  private userSubject = new Subject<UserModel>();
  form: FormGroup;
  formStatus: string;
  todo$: Observable<string[]>;
  otherTodo$ = this.otherTodoSubject.asObservable();
  user$ = this.userSubject.asObservable().pipe(
    tap(user => this.form.patchValue(user))
  );

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todo$ = null;
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required]],
    });
  }
  clear(): void {
    this.todo$ = null;
    this.otherTodoSubject.next(null);
    this.form.reset();
    this.formStatus = '';
  }
  init(): void {
    this.todo$ = of(['First', 'Second', 'Third']);
    this.otherTodoSubject.next(['First', 'Second', 'Third']);
    const user = new UserModel ();
    user.firstName = 'First';
    user.lastName = 'Last';
    this.userSubject.next(user);
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
    const user = new UserModel ();
    user.firstName = 'First Updated';
    user.lastName = 'Last Updated';
    this.userSubject.next(user);
  }

  setFormStatus(): void {
    this.formStatus = 'Status: ' + this.form.status + '; Touched: ' + this.form.touched +
    '; Pristine: ' + this.form.pristine + '; Valid: ' + this.form.valid + '; Value: ' + JSON.stringify(this.form.value);
  }
}
