import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-javascript',
  templateUrl: './javascript.component.html',
  styleUrls: ['./javascript.component.css']
})
export class JavascriptComponent implements OnInit {
  basicArray = ['First', 'Second', 'Third'];
  mappedArray = [];

  constructor() { }

  ngOnInit() {
    this.basicArray.forEach(item => this.mappedArray.push(item + ' mapped'));
  }
}
