import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDoService } from './services/ToDo.Service';
import { Observable, Subscription } from 'rxjs';
import { ToDoModel } from './models/toDo.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { SimpleAddEditComponent } from './simple-add-edit/simple-add-edit.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-crud-template',
  templateUrl: './crud-template.component.html',
  styleUrls: ['./crud-template.component.css']
})
export class CrudTemplateComponent implements OnInit, OnDestroy {
  toDoList$: Observable<ToDoModel[]>;
  private subs: Subscription[] = [];
  private modalReference: BsModalRef;
  loading = true;

  constructor(private toDoService: ToDoService, private modalService: BsModalService) { }

  ngOnInit() {
    this.toDoList$ = this.toDoService.toDoList$;
    this.toDoService.init$().pipe(take(1)).subscribe(() => {
      this.loading = false;
    });
    this.subs.push(
      this.modalService.onHide.subscribe((toDo: ToDoModel) => {
        if (toDo) {
          this.toDoService.save$(toDo).subscribe(toDo => {
            if (this.modalReference) {
              this.modalReference.hide();
            }
          },
          error => {
            window.alert('There is an error: ' + error);
          });
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  add() {
    this.openAddEdit(new ToDoModel());
  }

  edit(toDo: ToDoModel) {
    // cloning the object to pass to the modal
    this.openAddEdit(toDo);
  }

  private openAddEdit(toDo: ToDoModel) {
    const initialState = {
      todo: toDo
    };
    this.modalReference = this.modalService.show(
      SimpleAddEditComponent,
      Object.assign(
        {},
        { initialState },
        { }
      )
    );
  }

  delete(id: number): void {
    this.toDoService.delete$(id)
      .pipe(
        take(1)
      )
      .subscribe(success => {
        console.log('Successfully deleted: ' + id);
      },
      error => {
        console.log('Could not delete item: ' + error);
      });
  }

  reset() {
    this.toDoService.reset();
  }
}
