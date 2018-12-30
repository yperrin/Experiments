import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {
  hasData = false;

  constructor() { }

  ngOnInit() {
  }

  loadData() {
    this.hasData = true;
  }
}
