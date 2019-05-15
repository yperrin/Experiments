import { Component, OnInit, Input } from '@angular/core';
import { ToDoService } from '../services/ToDo.Service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ToDoModel } from '../models/toDo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-simple-add-edit',
  templateUrl: './simple-add-edit.component.html',
  styleUrls: ['./simple-add-edit.component.css']
})
export class SimpleAddEditComponent implements OnInit {
  @Input() todo: ToDoModel;
  form: FormGroup;

  constructor(private modalService: BsModalService,
              private modalRef: BsModalRef,
              private fb: FormBuilder) {

    this.form = this.fb.group({
      id: [null],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.form.reset(this.todo);
  }

  cancel() {
    this.modalRef.hide();
  }

  save() {
    if (!this.form.pristine) {
      this.modalService.onHide.next(new ToDoModel(this.form.value));
    }
    this.modalRef.hide();
  }
}
