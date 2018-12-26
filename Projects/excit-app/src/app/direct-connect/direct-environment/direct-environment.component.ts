import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'direct-environment',
  templateUrl: './direct-environment.component.html',
  styleUrls: ['./direct-environment.component.css']
})
export class DirectEnvironmentComponent implements OnInit {
  @Input() environment: string;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  onChange(newValue: string) {
    this.notify.emit(newValue);
  }
}
