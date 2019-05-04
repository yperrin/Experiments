import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-observable-child',
  templateUrl: './observable-child.component.html',
  styleUrls: ['./observable-child.component.css']
})
export class ObservableChildComponent implements OnInit {
  @Input() todo: string[];
  constructor() { }

  ngOnInit() {
  }
}
