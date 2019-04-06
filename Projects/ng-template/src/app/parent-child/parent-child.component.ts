import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PersonModel } from './parent-child-child/model/person.model';

const defaultDate = new Date('12/12/12');

@Component({
  selector: 'app-parent-child',
  templateUrl: './parent-child.component.html',
  styleUrls: ['./parent-child.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParentChildComponent implements OnInit {
  person: PersonModel;
  peoplePush: PersonModel[];
  people: PersonModel[];

  constructor() {
    this.person = new PersonModel ({ name: 'name', dateOfBirth: defaultDate, numberOfChildren: 12});
    this.people = [
      new PersonModel ({ name: 'init1', dateOfBirth: defaultDate, numberOfChildren: 12}),
      new PersonModel ({ name: 'init2', dateOfBirth: defaultDate, numberOfChildren: 13}),
    ];
    this.peoplePush = [
      new PersonModel ({ name: 'init1', dateOfBirth: defaultDate, numberOfChildren: 12}),
      new PersonModel ({ name: 'init2', dateOfBirth: defaultDate, numberOfChildren: 13}),
    ];
  }

  updateData() {
    const newDate = new Date();
    this.person.dateOfBirth = newDate;
    this.peoplePush.push(new PersonModel ({ name: 'added', numberOfChildren: 13}));
    this.people = [...this.people, new PersonModel ({ name: 'added', numberOfChildren: 13})];
    this.peoplePush.forEach( person => person.dateOfBirth = newDate);
    this.people.forEach( person => person.dateOfBirth = newDate);
  }
  reset() {
    this.person.dateOfBirth = defaultDate;
    this.peoplePush.pop();
    this.people = [...this.people.slice(0, this.people.length - 1)];
  }

  ngOnInit() {
  }
}
