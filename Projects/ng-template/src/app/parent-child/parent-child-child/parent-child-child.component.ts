import { Component, OnInit, Input } from '@angular/core';
import { PersonModel } from './model/person.model';

@Component({
  selector: 'app-parent-child-child',
  templateUrl: './parent-child-child.component.html',
  styleUrls: ['./parent-child-child.component.css']
})
export class ParentChildChildComponent implements OnInit {
  @Input() person: PersonModel;
  @Input() peoplePush: PersonModel[];
  @Input() people: PersonModel[];

  constructor() { }

  ngOnInit() {
  }

}
