import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-observable-child',
  templateUrl: './observable-child.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./observable-child.component.css']
})
export class ObservableChildComponent implements OnInit {
  @Input() todo: string[];
  constructor() { }

  ngOnInit() {
  }
}
