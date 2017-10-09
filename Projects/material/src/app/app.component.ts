import { OnInit } from '@angular/core';
import { Component, InjectionToken } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
  ]
})
export class AppComponent implements OnInit {
  public title = 'Tour of Heroes';

  constructor() {
  }

  ngOnInit(): void {  }
}
