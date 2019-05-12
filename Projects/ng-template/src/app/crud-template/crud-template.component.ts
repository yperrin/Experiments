import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDoService } from './services/ToDo.Service';
import { Observable, Subscription } from 'rxjs';
import { ToDoModel } from './models/toDo.model';
import { BsModalService } from 'ngx-bootstrap';
import { SimpleAddEditComponent } from './simple-add-edit/simple-add-edit.component';

@Component({
  selector: 'app-crud-template',
  templateUrl: './crud-template.component.html',
  styleUrls: ['./crud-template.component.css']
})
export class CrudTemplateComponent implements OnInit, OnDestroy {
  toDoList$: Observable<ToDoModel[]>;
  private subscriptions: Subscription[] = [];

  constructor(private toDoService: ToDoService, private modalService: BsModalService) { }

  ngOnInit() {
    this.toDoList$ = this.toDoService.toDoList$;
    this.toDoService.init();
    this.subscriptions.push(
      this.modalService.onHide.subscribe((toDo: ToDoModel) => {
        if (toDo) {
          this.toDoService.save(toDo);
        }
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  add() {
    this.openAddEdit(new ToDoModel({id:0}));
  }

  edit(toDo: ToDoModel) {
    // cloning the object to pass to the modal
    this.openAddEdit({...toDo});
  }

  private openAddEdit(toDo: ToDoModel) {
    const initialState = {
      todo: toDo
    }
    this.modalService.show(
      SimpleAddEditComponent,
      Object.assign(
        {},
        { initialState },
        { }
      )
    );
  }

  delete(id: number): void {
    this.toDoService.delete(id);
  }

  reset() {
    this.toDoService.init();
  }
}
