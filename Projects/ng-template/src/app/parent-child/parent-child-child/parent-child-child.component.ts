import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { PersonModel } from './model/person.model';
import { MatTableDataSource, MatTable } from '@angular/material';
import { ActionModel } from './model/action.model';

@Component({
  selector: 'app-parent-child-child',
  templateUrl: './parent-child-child.component.html',
  styleUrls: ['./parent-child-child.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ParentChildChildComponent implements OnInit {
  @Input() person: PersonModel;
  @Input() peoplePush: PersonModel[];
  @Input() people: PersonModel[];
  @Output() childUpdatedata: EventEmitter<ActionModel> = new EventEmitter<ActionModel>();
  @Output() childReset: EventEmitter<ActionModel> = new EventEmitter<ActionModel>();
  @ViewChild(MatTable) peoplePushTable: MatTable<any>;

  constructor() { }

  ngOnInit() {
  }

  reset(): void {
    this.childReset.emit(new ActionModel());
    this.peoplePushTable.renderRows();
  }

  updateData(): void {
    this.childUpdatedata.emit(new ActionModel());
    this.peoplePushTable.renderRows();
  }
}
